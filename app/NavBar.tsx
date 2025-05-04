'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuBugPlay } from "react-icons/lu";

import classnames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname();
    //console.log(currentPath);


    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]
    return (
        
            <nav className="flex space-x-6 items-center bg-slate-700  p-5 mb-5 h-20 border-b">
                <Link href="/" className='text-stone-200'><LuBugPlay /></Link>
                
                <ul className='flex space-x-6'>
                    {links.map(link => 
                    <Link key={link.href} 
                        className={
                            classnames({
                                "text-sky-600": link.href === currentPath,
                                "text-stone-200": link.href !== currentPath,
                                "hover:text-sky-500": true,
                            })
                        }  href={link.href}>{link.label}</Link>)}


                    
                </ul>
            </nav>
        
    
  )
}

export default NavBar