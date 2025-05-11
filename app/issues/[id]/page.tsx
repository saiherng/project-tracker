import { prisma } from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import EditIssueButton from '../_components/EditIssueButton';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import {cache} from 'react';

interface Props {
    params: Promise<{id: string}>
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: {id: issueId}}));


const IssueDetailPage = async (props: Props) => {
  
  const session = await getServerSession(authOptions);

  const params = await props.params;

  const issueId = parseInt(params.id);

  if (isNaN(issueId)) notFound();

  const issue = await fetchUser(issueId);

  if (!issue) notFound();

  return (
    <div>
    <Grid columns={{ initial: "1", sm:"70% 20%", md: "70% 20%" }} className="gap-5 mt-5">
      <Box>
        <IssueDetails issue={issue} />
       
      </Box>

      {session && <Box >
        <Flex gap="3" direction='column' align='start'>
          <AssigneeSelect issue={issue}/>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}

    </Grid>

    </div>
    
  )
}

export async function generateMetadata({params} : Props){
  
  const paramsID = await params;
  const issue = await fetchUser(parseInt(paramsID.id));

  return {
    title: issue?.title,
    description: issue?.description
  }
}


export default IssueDetailPage

