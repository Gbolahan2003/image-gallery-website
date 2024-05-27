import { configureStore } from "@reduxjs/toolkit";
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'
import { auth } from "../firebase/config";
import authSlice from "./auth";


export const store = configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})

export const useAppDispatch :()=> typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;