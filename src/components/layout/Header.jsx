import React from 'react'
import { Navbar } from '../index'
import { cn } from '../../lib/utils'

function Header() {
  return (
    <div className='w-full h-full p-4 flex justify-center items-center bg-blue-300'>
      <Navbar />
    </div>
  )
}

export default Header