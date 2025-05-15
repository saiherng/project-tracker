import { prisma } from '@/prisma/client'
import { Table, Flex, Avatar, Card, Heading } from '@radix-ui/themes'
import React from 'react'
import { IssueStatusBadge} from './components'
import Link from 'next/link';

const LatestIssues = async () => {

const issues = await prisma.issue.findMany({
    orderBy: {createdAt: 'desc'},
    take: 5,
    include : {
        asignedToUser : true
    }

})
  return (
    <Card>
        <Heading size='5' mb='4' mt='2' ml='3'>Latest Issues</Heading>
        <Table.Root>
        <Table.Body>
            {issues.map( issue => 
            <Table.Row key={issue.id}>
                <Table.Cell>
                        <Link className="group-hover:underline" href={`/issues/${issue.id}`}>
                    <Flex justify='between' align="center"  className="p-2 rounded-md hover:bg-gray-100 group cursor-pointer">
                        <Flex direction='column' align='start' gap='2' >
                            {issue.title}
                            <IssueStatusBadge status={issue.status}/>
                        </Flex>
                        {issue.asignedToUser && (
                            <Avatar size='2' radius='full' src={issue.asignedToUser.image!} fallback='?'/>
                        )}
                        </Flex>
                        </Link>
                        

                </Table.Cell>

            </Table.Row>)}
        </Table.Body>
    </Table.Root>
    </Card>
    
  )
}

export default LatestIssues