'use client'
import React, { useState } from 'react'
import image from '@/assets/images/sign-up-image.svg'
import Image from 'next/image'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import { Button } from '@/components/element/button'
import { auth, db } from '@/app/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as Yup from 'yup'
import { user } from '@/types/interfaces'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from 'sonner'
import handleErrors from '@/errorHandler'
import { useAuth } from '@/context/authContext'
import Link from 'next/link'
import { AnyARecord } from 'dns'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  const {currentUser, signUp} = useAuth()

  const handleSubmit = async (values:any, { setSubmitting }:any) => {
    setIsLoading(true);
    const { firstName, lastName, email, password } = values;

    console.log('Password:', password); // Log the password to debug

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      console.log('Registration successful', user);
      toast.success('Registration successful');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Registration failed');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex h-[100vh] gap-24">
      <div className="bg-theme flex flex-col p-20 w-1/2 justify-center items-center">
        <p className='text-theme'>New-Image</p>
        <Image src={image} alt='image' className='bg-theme rounded-lg' />
      </div>
      <div className="flex justify-center flex-col w-1/2">
        <h1 className="text-theme text-[3rem] font-semibold">Sign up</h1>
        <h1 className="text-theme text-2xl mb-2">Enter details to sign up</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='w-3/4'>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <CustomInput name="firstName" label="" placeholder="First name" />
                </div>
                <div className="col-span-1">
                  <CustomInput name="lastName" label="" placeholder="Last name" />
                </div>
                <div className="col-span-2">
                  <CustomInput name="email" label="" placeholder="Email" />
                </div>
                <div className="col-span-2 relative">
                  <CustomInput type={showPassword ? 'text' : 'password'} handleShowPassword={()=>setShowPassword(!showPassword)} name="password" label="" placeholder="Password" />
                 
                </div>
              </div>
              <div className="mt-6">
                <Button size='full' disabled={isSubmitting} type="submit" isLoading={isLoading || isSubmitting}>
                 submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex gap-2">
          <p className='text-[#39CDCC]'>{`Already have an account?`}</p>
          <Link href={'/login'} className='text-theme'>Log in</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
