import { IssueStatusBadge } from '@/app/components'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import {  Link } from "@/app/components";
import React from 'react'
import NextLink from "next/link";

import { Issue } from "@/app/generated/prisma/client";

export interface IssueQuery {
 status?: string;
    orderBy: keyof Issue;
    page: string;
}


interface Props {
    searchParams: IssueQuery;
  issues: Issue[];
}


const IssueTable = async ({searchParams, issues}: Props) => {

    const resolvedParams = await searchParams;

  return (
    <Table.Root variant="surface" >
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{ query: { ...resolvedParams, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === resolvedParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} children={issue.title} />
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

const columns: {
        label: string;
        value: keyof Issue;
        className?: string;
      }[] = [
        { label: "Issues", value: "title" },
        { label: "Status", value: "status", className: "hidden md:table-cell" },
        {
          label: "Created At",
          value: "createdAt",
          className: "hidden md:table-cell",
        },
      ];

export const columnNames = columns.map(column => column.value)

export default IssueTable