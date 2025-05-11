import React from "react";

import { Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";

import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";

import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: { status?: string; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
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

  const resolvedParams = await searchParams;
  const rawStatus = resolvedParams.status;
  const status =
    rawStatus &&
    rawStatus !== "ALL" &&
    Object.values(Status).includes(rawStatus as Status)
      ? (rawStatus as Status)
      : undefined;

  const orderBy = columns.map(column =>
    column.value).includes(resolvedParams.orderBy)

    ? { [resolvedParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />

      <Table.Root variant="surface" className="mt-5">
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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
