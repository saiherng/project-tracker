'use client';

import { Spinner } from '@/app/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';



const DeleteIssueButton = ({issueId} : {issueId: number}) => {

  const router = useRouter();
  const [error, setError] = useState(false);

  const[isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      
      setDeleting(true);
      axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh()
      
    } catch (error) {
      setDeleting(false);
      setError(true);
    }

  }

  return (
    <div>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}> Delete Issue
          {isDeleting && <Spinner/>}
        </Button>

      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Delete</AlertDialog.Title>

        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be reversed!
        </AlertDialog.Description>

        <Flex gap='3' mt='3'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray' >Cancel</Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button variant='soft' color='red' className='rounded' onClick={ deleteIssue }>Confirm Delete</Button>
          </AlertDialog.Action>

        </Flex>

      </AlertDialog.Content>
      </AlertDialog.Root>  

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>This issue could not be delete.</AlertDialog.Description>
          <Button mt='3'color='gray' variant='soft' onClick={()=> setError(false)}>Okay</Button>
        </AlertDialog.Content>
      </AlertDialog.Root>

    </div>
   
  )
}

export default DeleteIssueButton