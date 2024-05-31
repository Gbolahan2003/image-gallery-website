import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase/config'
import Iconify from './icon'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className=' bg-background p-6 lg:px-10  text-white shadow-sm border-b items-center  border-border-color'>
        <div className="flex lg:justify-between gap-6 items-center ">
            <div className="">
            <Link href={'/'}><Iconify icon='solar:gallery-wide-broken' className='text-4xl t' /></Link>
            </div>

        <div className="flex gap-3 px-2 items-center border-2 border-border-color rounded-xl p-2 lg:w-1/3 w-3/4">
            <input type="text" placeholder='Search...' className='w-11/12 bg-transparent outline-none pl-2'/>
            <div className="">
                <Iconify icon='heroicons-outline:search'/>
            </div>
        </div>
        
        
        <div className="flex gap-4">
        
            <button onClick={()=>{signOut(auth)
                sessionStorage.removeItem('user')}
            } className="flex items-center gap-1 duration-300 hover:text-theme" >
            <div className="">Logout</div>
                <Iconify icon='tabler:logout'/>
            </button>
        </div>
        </div>
        </div>
  )
}

export default Navbar