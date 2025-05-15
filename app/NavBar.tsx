"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LuBugPlay } from "react-icons/lu";

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className="mb-5 h-25 py-5 border-b flex items-center">
      <Container mx="5">
        <div className="flex items-center justify-between gap-5 h-full">
          <div className="flex items-center gap-5">
            <Link href="/" className="flex">
              <LuBugPlay />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </div>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Button asChild color="cyan" variant="soft">
        <Link href="/api/auth/signin">Login</Link>
      </Button>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          ></Avatar>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">
            <span
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer"
            >
              Sign out
            </span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
