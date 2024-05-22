import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { store } from './app/redux/store'
import {Toaster} from 'sonner'


interface ProviderIntertface {
    children:React.ReactNode
}
const GlobalProvider:FC<ProviderIntertface> = ({children}) => {
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