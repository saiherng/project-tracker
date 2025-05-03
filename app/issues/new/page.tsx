'use client';


import { TextField, TextArea, Button, Callout, Text } from '@radix-ui/themes';

import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useForm, Controller } from "react-hook-form"
import { FiShieldOff } from 'react-icons/fi';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/schemaValidations';
import { z } from 'zod';

// interface IssueForm {
//   title: string,
//   description: string
// }

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter();
    const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>(
      {resolver: zodResolver(createIssueSchema)}
    );
    const [error, setError] = useState('')
    
    return (
        <div className='max-w-xl'>
          {error && <Callout.Root color='red' className='mb-5'>
            <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}

          <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
            try {

              await axios.post('/api/issues', data);
              router.push('/issues')
              
            } catch (error) {
              setError('Unexpected Error Occured!');
            }

            })}>

            <TextField.Root size="3" placeholder="Title" {...register('title')}/>
            
            {errors.title && <Text color='red' as='p' className='py-2'>{errors.title.message}</Text>}
            <Controller name="description" 
            control={control} 
            render={({field}) => <SimpleMDE placeholder="Description" {...field} /> }/>  
            {errors.description && <Text color='red' as='p' className='py-2'>{errors.description.message}</Text>}
    
            <Button>Submit New Issue</Button>

          </form>

        </div>
        
  )
}

export default NewIssuePage