'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';

import { useState } from "react";


import dynamic from 'next/dynamic';

import "easymde/dist/easymde.min.css";

import { Controller, useForm } from "react-hook-form";

import axios from 'axios';
import { useRouter } from 'next/navigation';


import { ErrorMessage, Spinner } from '@/app/components';

import { issueSchema } from '@/app/schemaValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Issue } from '@/app/generated/prisma';


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
type IssueFormData = z.infer<typeof issueSchema>;



const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormData>(
      {resolver: zodResolver(issueSchema)}
    );
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
      try {
        setSubmitting(true);
        
        if (issue)
          await axios.patch('/api/issues/' + issue.id, data );
        else
          await axios.post('/api/issues', data);

        router.push('/issues/list');
        router.refresh();
        
      } catch (error) {
        setSubmitting(false);
        setError('Unexpected Error Occured!');
        console.error(error);
      }

      });
    
    return (
        <div className='max-w-xl'>
          {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}

          <form className='space-y-3' onSubmit={onSubmit}>

            <TextField.Root defaultValue={issue?.title} size="3" placeholder="Title" {...register('title')}/>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
           
            <Controller name="description" 
            control={control} 
            defaultValue={issue?.description}
            render={({field}) => <SimpleMDE placeholder="Description" {...field} /> }/>  
           
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            
            <Button disabled={isSubmitting}> 
              { issue ? 'Update Issue' : 'Submit New Issue'}
              {isSubmitting && <Spinner/>}
              </Button>

          </form>
        </div>
  )
}

export default IssueForm