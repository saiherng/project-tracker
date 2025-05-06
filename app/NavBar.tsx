'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuBugPlay } from "react-icons/lu";

import classnames from 'classnames';
import { Container, Flex, Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Image from 'next/image'


const NavBar = () => {

    const currentPath = usePathname();
    const {status, data: session} = useSession();
    


    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]
    return (
            <nav className=" bg-slate-700 mb-5 h-18 py-5 border-b">
                <Container>
                <Flex gap='5' justify='between'>
                    <Flex align='center' gap='5'>
                        <Link href="/" className='text-stone-200 flex'><LuBugPlay /></Link>
                        <div>
                        <ul className='flex space-x-6'>
                            {links.map(link => 
                            <li key={link.href}>
                                <Link  
                                className={
                                    classnames({
                                        "text-gray-400": link.href === currentPath,
                                        "text-stone-200": link.href !== currentPath,
                                        "hover:text-yellow-500": true,
                                    })
                                }  href={link.href}>{link.label}</Link>
                            </li>
                            )}
                        </ul>
                        </div>
                    </Flex>
    
                    <Box>
                        {status === 'authenticated' && <Link href='/api/auth/signout' className='text-green-700'>Log Out</Link> } 
                        {status === 'unauthenticated' && <Link href='/api/auth/signin' className='text-green-700'>Log In</Link> } 
                    </Box>
                </Flex>

                
                
                </Container>
                

            </nav>

            
           
        
    
  )
}

export default NavBar