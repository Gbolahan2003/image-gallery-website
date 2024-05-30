'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactImage from 'next/image';
import CustomModal from './customModal';
import { Button } from '../element/button';
import { UploadImageProps } from '@/app/redux/imageDocuments/interface';
import { fetchImageMetadata, uploadImage } from '@/app/redux/imageDocuments/fetaures';
import { useAuth } from '@/context/authContext';
import { toast } from 'sonner';
import { useAppDispatch } from '@/app/redux/store';
import { showItem } from '../utils';
import { batch } from 'react-redux';

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
}



interface FormValues {
  name: string;
  description: string;
  image: File | null;
}

const UploadImageModal: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  
  const dispatch = useAppDispatch()

  const {currentUser} = useAuth()
  const readImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  
  const formik = useFormik<UploadImageProps>({
    initialValues: {
      name: '',
      description: '',
      image: null,
      height:20,
      width:20
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      description: Yup.string().required('Description is required'),
      image: Yup.mixed().required('Image is required').nullable(),
    }),
    onSubmit: async(values:UploadImageProps) => {
      if (!values.image) return;

        setLoading(true)
        const { width, height } = await readImageDimensions(values.image);
        console.log(width, height);
        
        if (width && height) {
          const submitted = await dispatch(uploadImage({
            ...values,
            width,
            height
          }, currentUser.uid));

    // let submitted= await  dispatch(uploadImage(data, currentUser.uid))
    if (submitted) {
    toast.success('Image Uploaded successfully')
    dispatch(showItem(null))
    batch( async()=>{
      await dispatch(fetchImageMetadata(currentUser.uid))
    })
    
    }
    setLoading(false)

    }
  }
  });


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    formik.setFieldValue('image', file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <CustomModal title="Upload Image">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label htmlFor="image" className="text-white font-medium">Select Image:</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            onChange={handleImageChange}
          />
          {imagePreview && <ReactImage height={2} width={2} src={imagePreview} alt="Preview" className="mt-2 w-full h-48 object-cover rounded-md" />}
          {/* {formik.touched.image && formik.errors.image ? (
            // <div className="text-red-500 text-sm">{formik.errors.image}</div>
          ) : null} */}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="name" className="text-white font-medium">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="text-white font-medium">Description:</label>
          <textarea
            id="description"
            name="description"
            className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:border-blue-500"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm">{formik.errors.description}</div>
          ) : null}
        </div>
       <div className="flex justify-end ">
       <Button
       isLoading={loading}
       disabled={loading}
       size='lg'
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Upload
        </Button>
       </div>
      </form>
    </CustomModal>
  );
};

export default UploadImageModal;
