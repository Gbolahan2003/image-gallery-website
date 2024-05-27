import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/app/firebase/config'

const Navbar = () => {
  return (
    <div className=' bg-theme p-6 text-white shadow-sm'>
        <div className="flex justify-between ">
            <p>Logo</p>
            <div className="flex gap-10">
            <p>Home</p>
            <p>Gallery</p>
            <p>About</p>
        
        
        </div>
        <div className="flex gap-4">
            <div className="">
                Profile
            </div>
            <button onClick={()=>{signOut(auth)
                sessionStorage.removeItem('user')}
            } className="">
                Logout
            </button>
        </div>
        </div>
        </div>
  )
}

export default Navbar