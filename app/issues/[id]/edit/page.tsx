import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
  params : {id:string}
}

const EditIssuePage = async ({params}: Props) => {

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