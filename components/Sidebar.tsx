import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { Discover, SuggestedAccounts, Footer } from './index'
import useAuthStore from '../store/authStore'

const Sidebar = () => {
  const [togleSidebar, setTogleSidebar] = useState(true)
  const { userProfile }: any = useAuthStore()
  const domantLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#821010] rounded'

  return (
    <div>
      <div
        className='block xl:hidden m-2 ml-4 mt-3'
        onClick={() => setTogleSidebar((prev) => !prev)}
      >
        {togleSidebar ? (
          <ImCancelCircle fontSize={20} />
        ) : (
          <AiOutlineMenu fontSize={20} />
        )}
      </div>
      {togleSidebar && (
        <div className=' xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 shadow-lg'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={domantLink}>
                <p>
                  <AiFillHome className='md:font-bold font-semibold text-md xl:text-2xl' />
                </p>
                <span className='text-xl hidden xl:block'>For You</span>
              </div>
            </Link>
          </div>
          {!userProfile?.userName && (
            <div className='px-2 py-4 hidden xl:block text-center'>
              <p className='text-gray-400'>Log in to comment and like videos</p>
              <div className='pr-4 '>
                <Link href='/login_page'>
                  <button
                    type='button'
                    className='bg-white text-lg text-[#821010] font-bold capitalize border-[1px] border-[#821010] px-2 rounded py-2 mt-1 hover:bg-[#821010] hover:text-white flex justify-center items-center w-full'
                  >
                    log in
                  </button>
                </Link>
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
