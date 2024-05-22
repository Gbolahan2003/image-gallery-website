import React from 'react'
import image from '../../../../public/images/sign-up-image.svg'
import Image from 'next/image'

const SignUp = () => {
  return (
    <div>S
        <div className="">
            <div className="">
                <p className='text-theme'>New-Image</p>
            </div>
            <div className="">
                <Image src={image} alt='sign-up image'/>
                <div className="">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp