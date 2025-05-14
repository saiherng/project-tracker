import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
  params : Promise<{id:string}>
}

const EditIssuePage = async (props: Props) => {
  const params = await props.params;

  const issueId = parseInt(params.id, 10);

  if (isNaN(issueId)) {
    return notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {id: issueId}
  });

  if (!issue) return notFound();

  return (
    <IssueForm issue= { issue }/>
  )
};

export default EditIssuePage