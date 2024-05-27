import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userAccessToken } from "./interface";


interface authstate{
    userAccesssToken:userAccessToken|null
}

const initialState:authstate={
    userAccesssToken:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserAccessToken:(state:authstate, action:PayloadAction<userAccessToken>)=>{
            state.userAccesssToken = action.payload
        },
    }

})

export default authSlice

export const {setUserAccessToken}= authSlice.actions