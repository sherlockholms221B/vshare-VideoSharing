import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '../Utils/logo.svg'
import useAuthStore from '../store/authStore'
import { IoMdAdd } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import { urlFor } from '../Utils/client'
import { FiLogOut } from 'react-icons/fi'

const Navbar = () => {
  const { userProfile, logOut }: any = useAuthStore()
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (search) {
      router.push(`/search/${search}`)
    }
  }
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[80px] md:w-[90px] '>
          <Image
            className='cursor-pointer border-gray-500 '
            src={logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white'
        >
          <input
            type='text'
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            placeholder='Search accounts and videos'
            className='bg-primary p-3 md:text-md font-md border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0 '
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-400 pl-4 text-2xl text-gray-400 z-10 '
          >
            <BiSearch className='z-4' />
          </button>
        </form>
      </div>
      <div className=''>
        {userProfile?.userName ? (
          <div className='flex gap-2 md:gap-10 '>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />
                {'  '} <span className='hidden md:block'>Upload</span>
              </button>
            </Link>

            {userProfile?.profile && (
              <Link href={`/profile/${userProfile._id}`}>
                <div>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    src={urlFor(userProfile?.profile)
                      .width(300)
                      .height(300)
                      .url()}
                    alt='profile'
                    priority
                  />
                </div>
              </Link>
            )}
            <button
              onClick={() => logOut()}
              className='  p-2 rounded-full bg-[#eee] flex justify-center items-center '
            >
              <FiLogOut className='text-red-500 text-2xl' />
            </button>
          </div>
        ) : (
          <Link href='/login_page'>
            <button
              type='button'
              className='bg-white text-lg text-[#821010] font-bold capitalize border-[1px] border-[#821010] px-3 rounded py-1 hover:bg-[#821010] hover:text-white flex justify-center items-center w-full'
            >
              log in
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
