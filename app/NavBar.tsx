'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuBugPlay } from "react-icons/lu";

import classnames from 'classnames';
import { Container, Flex } from '@radix-ui/themes';

const NavBar = () => {

    const currentPath = usePathname();
    //console.log(currentPath);


    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]
    return (
            <nav className="flex space-x-6 items-center  bg-slate-700 mb-5 h-20 border-b">
                <Container>
                <Flex gap='5' justify='start'>
                <Link href="/" className='text-stone-200 flex'><LuBugPlay /></Link>
                    <ul className='flex space-x-6'>
                        {links.map(link => 
                        <Link key={link.href} 
                            className={
                                classnames({
                                    "text-gray-400": link.href === currentPath,
                                    "text-stone-200": link.href !== currentPath,
                                    "hover:text-yellow-500": true,
                                })
                            }  href={link.href}>{link.label}</Link>)}


                        
                    </ul>
                </Flex>
                

                </Container>
                

            </nav>
        
    
  )
}

export default NavBar