import { NextUIProvider } from '@nextui-org/react'
import Header from './components/header/Header'
import { AuthProvider } from './contexts/authContext.jsx'
import Router from './navigation/Router.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <>
      <NextUIProvider>
        <AuthProvider>
          <Header />
          <Router />
          <ToastContainer />
        </AuthProvider>
      </NextUIProvider>
    </>
  )
}

export default App
