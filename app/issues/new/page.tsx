'use client';


import { TextField, TextArea, Button } from '@radix-ui/themes'

import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { FiShieldOff } from 'react-icons/fi';

import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm  {
    title: string;
    description : string;
  }


const NewIssuePage = () => {


    const router = useRouter();
    const {register, control, handleSubmit} = useForm<IssueForm>();

    

    return (
        <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {

          await axios.post('/api/issues', data);
          router.push('/issues')

        })}>

            <TextField.Root size="3" placeholder="Title" {...register('title')}/>

            <Controller name="description" control={control} render={({field}) =><SimpleMDE placeholder="Description" {...field} /> }/>  
            

            <Button>Submit New Issue</Button>

        </form>
  )
}

export default NewIssuePage