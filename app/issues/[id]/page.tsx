import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';


import IssueDetails from './IssueDetails';

import EditIssueButton from '../_components/EditIssueButton';
import DeleteIssueButton from '../_components/DeleteIssueButton';


interface Props {
    params: Promise<{id: string}>
}

const IssueDetailPage = async (props: Props) => {
  const params = await props.params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!issue) notFound();

  return (
    <div>
      
    <Grid columns={{ initial: "1", sm:"70% 20%", md: "70% 20%" }} className="gap-5 mt-5">
      <Box>
        <IssueDetails issue={issue} />
       
      </Box>
      <Box >
        <Flex gap="3" direction='column' align='start'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
        
      </Box>
    </Grid>

    </div>
    
  )
}

export default IssueDetailPage