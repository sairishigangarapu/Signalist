import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'

function Header() {
  return (
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
        <Link href='/'>
          <Image src = '/assets/icons/logo.svg' alt='Signalist logo' height={100} width={100} className='h-10 w-auto cursor-pointer'/>
        </Link>
        <nav className='hidden sm:block'>
          <NavItems/>
        </nav>
        <UserDropdown/>
      </div>
    </header>
  )
}

export default Header
