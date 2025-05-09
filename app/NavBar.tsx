'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuBugPlay } from "react-icons/lu";

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';



const NavBar = () => {

    return (
            <nav className="mb-5 h-18 py-5 border-b">
                <Container>
                <Flex gap='5' justify='between'>
                    <Flex align='center' gap='5'>
                        <Link href="/" className='flex'><LuBugPlay /></Link>
                        <NavLinks />
                    </Flex>
                    <AuthStatus/>
                    </Flex>
                </Container>
                

            </nav>
  )
}

const NavLinks = () => {

    const currentPath = usePathname();
    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"}]

    return     <ul className='flex space-x-6'>
                {links.map(link => 
                <li key={link.href}>
                    <Link  
                    className={
                        classnames({
                            'nav-link' : true,
                            "!text-zinc-900": link.href === currentPath
                        })
                    }  href={link.href}>{link.label}</Link>
                </li>
                )}
            </ul> 

}

const AuthStatus = () => {
     const {status, data: session} = useSession();
    if (status === 'loading') return null;

    if (status === 'unauthenticated') 
        return <Link className='nav-link' href='/api/auth/signin'>Login</Link>
    
    return <Box>
                <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    {/* <Button variant="soft">
                    Account 
                        <DropdownMenu.TriggerIcon/>
                    </Button> */}
                    <Avatar src={session!.user!.image!}
                    fallback='?' size='2' radius='full' 
                    className='cursor-pointer'
                    referrerPolicy='no-referrer'>
                    </Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label><Text>{session!.user!.email}</Text></DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item color="red">
                        <Link href='/api/auth/signout'>Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
    </Box>
}

export default NavBar