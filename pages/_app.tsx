import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Navbar, Sidebar } from '../components/index'
import LoginPage from './login_page'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true)
  const router = useRouter()

  const path = router.pathname

  useEffect(() => {
    setIsSSR(false)
  }, [])

  if (isSSR) return null

  return (
    <div>
      {path === '/login_page' ? (
        <LoginPage {...pageProps} />
      ) : (
        <div className='xl:w-[1220px] m-auto overflow-hidden h-[100vh] '>
          <Navbar />

          <div className='flex sm:gap-3 md:gap-20'>
            <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
              <Sidebar />
            </div>
            <div className=' mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApp
