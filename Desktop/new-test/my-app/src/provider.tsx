'use client'
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import {Toaster} from 'sonner'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './app/firebase/config'
import { useRouter } from 'next/navigation'


interface ProviderIntertface {
    children:React.ReactNode
}
const GlobalProvider:FC<ProviderIntertface> = ({children}) => {

  const [user] = useAuthState(auth)
  const router = useRouter()
  // const userSession =sessionStorage.getItem('user')
  // if(!user){
  //   router.push('/login')
  // }
  
  console.log(user);
  
  return (
    <Provider store={store}>
            <Toaster
                position="top-center"
                richColors closeButton
                toastOptions={{
                    style: { height: '64px' },
                }}
            />
            {children}

    </Provider>
  )
}

export default GlobalProvider