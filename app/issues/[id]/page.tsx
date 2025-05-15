import { prisma } from "@/prisma/client";
import { Box, Callout, Text, Flex, Grid, Link } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "../_components/EditIssueButton";
import DeleteIssueButton from "../_components/DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  const params = await props.params;

  const issueId = parseInt(params.id);

  if (isNaN(issueId)) notFound();

  const issue = await fetchUser(issueId);

  if (!issue) notFound();

  return (
    <div>
      <Grid
        columns={{ initial: "1", sm: "70% 20%", md: "70% 20%" }}
        className="gap-5 mt-5"
      >
        <Box>
          <IssueDetails issue={issue} />
        </Box>

        {session && (
          <Box>
            <Flex gap="3" direction="column" align="start">
              <Text>Assign to User:</Text>
              <AssigneeSelect issue={issue} />
              
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}

        {!session && (
          <Flex direction="column" gap="3">
            <Callout.Root color="red">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>
                <Link href="/api/auth/signin">Log in</Link> to edit this issue!
              </Callout.Text>
            </Callout.Root>
          </Flex>
        )}
      </Grid>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const paramsID = await params;
  const issue = await fetchUser(parseInt(paramsID.id));

  return {
    title: issue?.title,
    description: issue?.description,
  };
}

export default IssueDetailPage;
