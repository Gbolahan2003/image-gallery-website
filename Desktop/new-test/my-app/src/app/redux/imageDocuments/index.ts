import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageMetadata } from "./interface";


interface documentProps {
test:string|null,
imageMetaData:ImageMetadata[]|null
}

const initialState:documentProps ={
 test:null,
 imageMetaData:null
}

const ImageDocumentSlice = createSlice({
    name:'imageDocument',
    initialState,
    reducers:{
        setImageData:(state:documentProps, action:PayloadAction<ImageMetadata[]>)=>{
            state.imageMetaData = action.payload
        }
        
    }
})

export default ImageDocumentSlice
export const {setImageData}= ImageDocumentSlice.actions