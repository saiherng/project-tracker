'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuBugPlay } from "react-icons/lu";

import classnames from 'classnames';
import { Container, Flex, Box, DropdownMenu, Avatar, Text, Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';



const NavBar = () => {

    const currentPath = usePathname();
    const {status, data: session} = useSession();
    


    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]
    return (
            <nav className="mb-5 h-18 py-5 border-b">
                <Container>
                <Flex gap='5' justify='between'>
                    <Flex align='center' gap='5'>
                        <Link href="/" className='flex'><LuBugPlay /></Link>
                        <div>
                        <ul className='flex space-x-6'>
                            {links.map(link => 
                            <li key={link.href}>
                                <Link  
                                className={
                                    classnames({
                                        "text-zinc-900": link.href === currentPath,
                                        "text-zinc-500": link.href !== currentPath,
                                        "hover:text-yellow-500 transition-colors": true,
                                    })
                                }  href={link.href}>{link.label}</Link>
                            </li>
                            )}
                        </ul>
                        </div>
                    </Flex>
    
                    <Box>
                        {status === 'authenticated' && (
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
                                    <DropdownMenu.Label><Text>{session.user!.email}</Text></DropdownMenu.Label>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item color="red">
                                        <Link href='/api/auth/signout'>Sign Out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        )
                        } 
                        {/* {status === 'unauthenticated' && <Link href='/api/auth/signin' className='text-zinc-700'>Log In</Link> }  */}
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>} 
                    </Box>
                </Flex>

                
                
                </Container>
                

            </nav>

            
           
        
    
  )
}

export default NavBar