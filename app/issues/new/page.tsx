'use client';


import { Button, Callout, TextField } from '@radix-ui/themes';

import { useState } from "react";


import dynamic from 'next/dynamic';

import "easymde/dist/easymde.min.css";

import { Controller, useForm } from "react-hook-form";

import axios from 'axios';
import { useRouter } from 'next/navigation';

import ErrorMessagse from '@/app/components/ErrorMessagse';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/schemaValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    
    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>(
      {resolver: zodResolver(createIssueSchema)}
    );
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
      try {
        setSubmitting(true);
        await axios.post('/api/issues', data);
        router.push('/issues')
        
      } catch (error) {
        setSubmitting(false);
        setError('Unexpected Error Occured!');
      }

      });
    
    return (
        <div className='max-w-xl'>
          {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}

          <form className='space-y-3' onSubmit={onSubmit}>

            <TextField.Root size="3" placeholder="Title" {...register('title')}/>
            <ErrorMessagse>{errors.title?.message}</ErrorMessagse>
           
            <Controller name="description" 
            control={control} 
            render={({field}) => <SimpleMDE placeholder="Description" {...field} /> }/>  
           
            <ErrorMessagse>{errors.description?.message}</ErrorMessagse>
    
            <Button disabled={isSubmitting}> Submit New Issue {isSubmitting && <Spinner/>}</Button>

          </form>

        </div>
        
  )
}

export default NewIssuePage