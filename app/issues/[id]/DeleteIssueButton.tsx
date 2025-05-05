'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes'


const DeleteIssueButton = ({issueId} : {issueId: number}) => {
  return (
    <div>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'> Delete Issue</Button>

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
            <Button variant='soft' color='red' className='rounded'>Confirm Delete</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
      </AlertDialog.Root>  

    </div>
   
  )
}

export default DeleteIssueButton