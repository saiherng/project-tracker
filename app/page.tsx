import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from 'next';



export default async function Home() {

    const open = await prisma.issue.count({where: {status: 'OPEN'}})
    const in_progress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
    const closed = await prisma.issue.count({where: {status: 'CLOSED'}})

  return (<>

    <Grid columns={{initial: '1', md: '2'}} gap='5' mt='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={in_progress} closed={closed} />
        <IssueChart open={open} inProgress={in_progress} closed={closed}/>
      </Flex>
    <LatestIssues/>
    </Grid>

  </>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Project Tracker - Dashboard',
  description : 'Display details and charts about the status of project issues.'
};


