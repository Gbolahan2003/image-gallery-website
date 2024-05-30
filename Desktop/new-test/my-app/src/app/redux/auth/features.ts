import { db, auth } from "@/app/firebase/config";
import handleErrors from "@/errorHandler";
import { user } from "@/types/interfaces";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Dispatch } from "redux";
import { toast } from "sonner";
import { loginprops } from "./interface";
import { doc, setDoc } from "firebase/firestore";




export const signIn = (data:user)=>async(dispatch:Dispatch)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = response.user
        const userRef = await doc(db, 'users', user.uid)
        await setDoc(userRef, {
            email:data.email,
            firstName:data.firstName,
            lastName:data.lastName
        })
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const login = (data:loginprops)=>async(dispatch:Dispatch)=>{
    try {
        const response = await signInWithEmailAndPassword(auth, data.email, data.password)
        return true
    } catch (error) {
        handleErrors(error)
        return false
    }
}

export const logOut =()=>{
    return signOut(auth)
}
