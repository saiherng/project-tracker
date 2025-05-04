import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@/app/generated/prisma'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
    issue: Issue
}


const IssueDetails = ({issue}: Props) => {
  return (
    <div>
    <Heading>{issue.title}</Heading>
    <Flex className="gap-5" my='2'>
      <IssueStatusBadge status={issue.status}/>
      <Text> {issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className="prose" mt='5'>
      <ReactMarkdown >
        {issue.description}

      </ReactMarkdown>
    </Card>
    </div>
  )
}

export default IssueDetails