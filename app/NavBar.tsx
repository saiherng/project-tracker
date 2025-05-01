

import { link } from 'fs';
import Link from 'next/link'
import React from 'react'

import { LuBugPlay } from "react-icons/lu";

const NavBar = () => {

    const links = [
        {label: "Dashboard", href: "/"},
        {label: "Issues", href: "/issues"},

    ]

    return (
    <nav className="flex space-x-6 items-center bg-gray-800 text-white p-5 mb-5 h-20 border-b">
        <Link href="/"><LuBugPlay /></Link>
        <ul className='flex space-x-6'>

            {links.map(link => 
            <Link key={link.href} 
                className=' hover:text-indigo-300 transition-colors' href={link.href}>{link.label}</Link>)}


            
        </ul>
    </nav>
  )
}

export default NavBar