'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import image from '@/assets/images/background.jpg'
import Lightbox from '@/components/element/lightBox'

const Dashboard = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(true);
  const fileInputRef:any = useRef(null);

  const handleBannerClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="pt-10 px-4">
        <div className="">
          <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-45deg from-custom-blue to-custom-dark'>
            Welcome to our Gallery
          </h1>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div
            className="relative border-dashed border-2 border-gray-500 rounded-lg overflow-hidden cursor-pointer"
            style={{ height: '20rem', width: '100%', maxWidth: '700px' }}
            onClick={handleBannerClick}
          >
            <div className="absolute inset-0 bg-dark-brown opacity-60 z-10"></div>
            <Image
              src={image}
              alt="background image"
              layout="fill"
              objectFit="cover"
              className="absolute z-0"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20 text-white font-bold">
              Click to upload
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e:any) => {
                // Handle file upload logic here
                const file = e.target.files[0];
                if (file) {
                  console.log('File selected:', file);
                }
              }}
            />
          </div>
        </div>
      </div>
 
    </div>
  )
}

export default Dashboard
