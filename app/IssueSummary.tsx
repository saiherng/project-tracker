import { Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'
import { Status } from './generated/prisma';
import Link from 'next/link';


interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSummary = ({open, inProgress, closed} : Props) => {
  
  const containers:{
    label: string;
    value: number;
    status: Status;
  }[] = [
    {label: 'Open Issues', value: open, status: 'OPEN' },
    {label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    {label: 'Closed Issues', value: closed, status: 'CLOSED' }
  ]
 
    return (
    <Flex gap='5'>
        {containers.map(container =>
            <Card key={container.label}  className="group p-4 transition-colors hover:bg-gray-50 cursor-pointer">
                <Flex direction='column' gap='1'>
                    <Link href={`/issues/list?status=${container.status}`} className="text-sm font-medium group-hover:text-indigo-600 transition-colors">{container.label}</Link>
                    <Text size='5' className="font-bold group-hover:text-indigo-600 transition-colors">{container.value}</Text>
                </Flex>
            </Card>
        )}
    </Flex>
  )
}

export default IssueSummary