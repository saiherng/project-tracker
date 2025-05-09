"use client";

import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const handleValueChange = (userId: string) => {
    if (
      userId === issue.assignedToUserId ||
      (!userId && !issue.assignedToUserId)
    )
      return;
     axios
    .patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userId === "unassigned" ? null : userId,
    })
    .then(() => {
      toast.success('Assigned saved successfully.');
    })
    .catch(() => {
      toast.error('Changes could not be saved.');
    });
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={handleValueChange}
      >
        <Select.Trigger placeholder="Assign a User" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
	  <Toaster/>
    </>
  );
};

export default AssigneeSelect;
