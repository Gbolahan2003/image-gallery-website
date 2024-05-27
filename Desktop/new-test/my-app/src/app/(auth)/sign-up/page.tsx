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

  const handleSubmit = async (values: user) => {
    setIsLoading(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const user = userCredentials.user
      // sessionStorage.setItem('user', 'true' )
      await setDoc(doc(db, 'users', user.uid), {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        createdAt: new Date()
      })
      console.log(user);
      
     toast.success('Registration successful')
    } catch (error) {
     handleErrors(error)
    } finally {
      setIsLoading(false)
    }
  }

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
                <Button size='full' type="submit" isLoading={isLoading || isSubmitting}>
                 submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-4 flex gap-2">
          <p className='text-[#39CDCC]'>{`Already have an account?`}</p>
          <p className='text-theme'>Log in</p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
