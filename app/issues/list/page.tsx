
import { prisma } from "@/prisma/client";

import { Status } from "@/app/generated/prisma/client";
import IssueActions from "./IssueActions";

import Pagination from "@/app/components/Pagination";
import { Flex } from "@radix-ui/themes";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  
  const resolvedParams = await searchParams;
  const rawStatus = resolvedParams.status;
  const status =
    rawStatus &&
    rawStatus !== "ALL" &&
    Object.values(Status).includes(rawStatus as Status)
      ? (rawStatus as Status)
      : undefined;

  const where = {status};

  const orderBy = columnNames
    .includes(resolvedParams.orderBy)
    ? { [resolvedParams.orderBy]: "asc" }
    : undefined;


  const page = parseInt(resolvedParams.page) || 1;
  const pageSize = 8;


  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where})

  return (
    <div>
      <Flex direction='column' gap='4'>
        <IssueActions />
        <IssueTable searchParams={searchParams} issues={issues}/>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount}/>
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Project Tracker - Issue List',
  description : 'Display a list of all project issues'
};