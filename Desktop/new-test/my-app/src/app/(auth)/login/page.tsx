'use client'
import React, { useState } from 'react'
import image from '@/assets/images/sign-up-image.svg'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import { Button } from '@/components/element/button'
import * as Yup from 'yup'
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
import { user } from '@/types/interfaces'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import handleErrors from '@/errorHandler'
import { loginprops } from '@/app/redux/auth/interface'
import { useAuth } from '@/context/authContext'




const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

  const router = useRouter()
  
  const validationSchema = Yup.object({
    email:Yup.string().email('Invalid email address').required('Email is required'),
    password:Yup.string().required('password is required')
  })
  const initialValues={
    email:'',
    password:''
  }
 
  const {signIn} = useAuth()
  const handleSubmit = async (values: loginprops) => {
    setIsLoading(true)
    try {
      await signIn(values.email, values.password)
      toast.success('Login sucsessful')
      router.push('/dashboard')
      return
    } catch (error) {
      handleErrors(error)
    }
    setIsLoading(false)
  }


  return (
    <div className="w-full flex h-[100vh] gap-24">
    <div className="bg-theme flex flex-col p-20 w-1/2 justify-center items-center">
        <p className='text-theme'>New-Image</p>

        <Image src={image} alt='image' className='bg-theme rounded-lg'/>
    </div>
    <div className=" flex  justify-center flex-col">
          <h1 className=" text-theme text-[3rem] font-semibold">Welcome back</h1>
          <h1 className=" text-theme text-2xl mb-2">Enter details to login</h1>
          <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
             <Form className=''>
  <div className="flex flex-col gap-4 w-[28rem] ">

    <div className="">
      <CustomInput name="email" label="" placeholder="Email" />
    </div>
    <div className="">
      <CustomInput name="password" handleShowPassword={()=>setShowPassword(!showPassword)} type={showPassword?'text':'password'} label="" placeholder="Password" />
    </div>
  </div>

 <div className=" mt-6">
 <Button size='full' type='submit'  isLoading={isLoading} >
    Submit
  </Button>
 </div>
 <div className="mt-4 flex gap-2">
    <p  className='text-[#39CDCC]'>{`Don't have an account?`}</p>
    <Link href={'/sign-up'} className='text-theme'>Sign up</Link>
  </div>
</Form>
          </Formik>
            
        </div>
</div>
  )
}

export default Login