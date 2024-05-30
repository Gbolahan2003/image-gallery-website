'use client'
import ReactImage from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import image from '@/assets/images/background.jpg'
import Lightbox from '@/components/element/lightBox'
import { useAuth } from '@/context/authContext'
import { Button } from '@/components/element/button'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { showItem } from '@/components/utils'
import ShowAllModals from '@/components/modals/showAllModals'
import { Form, Formik } from 'formik'
import CustomInput from '@/components/form/formik/customInput'
import * as Yup from 'yup'
import { addUserData, fetchImageMetadata } from '../redux/imageDocuments/fetaures'
import Iconify from '@/components/element/icon'
import { Tooltip } from 'flowbite-react'


 const DashboardPage = () => {
     
       const {currentUser} = useAuth()

  const dispatch = useAppDispatch()
  const ImageData = useAppSelector(state=>state.imageDocument.imageMetaData)

useEffect( ()=>{
   dispatch(fetchImageMetadata(currentUser.uid))

},[dispatch, currentUser])
  



  return (
    <>
    {
        currentUser && (
            <div className={` bg-background min-h-screen text-primary-text`}>
    <header className="p-4 border-b flex justify-between items-center mb-10 border-border-color">
      <h1 className="text-3xl font-bold">Welcome to your Gallery</h1>
      {/* <h1 className="text-secondary-text">Welcome to your gallery {users?.firstName}.</h1> */}
      <button
      onClick={()=>dispatch(showItem('AddImage'))}
        className="mt-4 p-2 bg-primary-accent text-primary-text rounded-lg"

      >
    Upload New Photo
      </button>
    </header>
    <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-card-bg p-4 hover:cursor-pointer duration-300 hover:p-8 rounded-lg shadow-md">
          <Image width={100} height={50}  src={`https://via.placeholder.com/150?text=Image+${index + 1}`} alt={`Image ${index + 1}`} className="w-full h-auto rounded-lg" />
          <h2 className="text-xl font-semibold mt-2">Image {index + 1}</h2>
          <p className="text-secondary-text">Description of image {index + 1}.</p>
        </div>
      ))} */}
      {ImageData?.map((image, index) => (
        <div key={index} className="relative bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative w-full image-container" style={{ paddingBottom: '100%', overflow: 'hidden' }}>
            <ReactImage
              src={image.imageUrl}
              alt={image.name}
              layout="fill"
              objectFit="cover"
              className="rounded-md image transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex  top-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300 overlay">
            <div className="">
            <button
                className="bg-red-600 hover:bg-red-800 text-white p-2 rounded-md m-2"
                onClick={() => dispatch(showItem('DeleteModal'))}
              >
                <Tooltip content='Delete'>
                <Iconify icon='fluent:delete-24-regular'/>

                </Tooltip>
              </button>
              <button
                className="bg-blue-600 text-white p-2 hover:bg-theme rounded-md m-2"
                onClick={() => console.log(image.id)}
              >
              <Tooltip content='Edit' className='4xl'>
               <Iconify icon='fluent:edit-28-filled'/> 
               </Tooltip>
              </button>
              <button
                className="bg-blue-600 text-white hover:bg-white p-2 rounded-md m-2 hover:text-black"
                onClick={() => console.log(image.id)}
              >
               <Tooltip content='share'>
               <Iconify icon='fluent:share-24-filled'/>
               </Tooltip>
              </button>
            </div>
            </div>
          </div>
          <h3 className="text-white font-semibold mt-2">{image.name}</h3>
          <p className="text-gray-400">{image.description}</p>
          <p className="text-gray-500 text-sm">{new Date(image.uploadedAt).toLocaleString()}</p>
        </div>
      ))}
    </main>
  </div>
        )
    }
    <ShowAllModals/></>
  )
}

export default DashboardPage
