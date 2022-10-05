import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import useAuthStore from '../store/authStore'
import { IUser } from '../types'
import image from '../Utils/Github Readme.png'
import { urlFor } from '../Utils/client'

const SuggestedAccounts = () => {
  const { fatchAllUsers, allUsers, userProfile }: any = useAuthStore()

  useEffect(() => {
    fatchAllUsers()
  }, [fatchAllUsers])

  const filetedUser = allUsers.filter((user: IUser) => {
    return userProfile?.userName ? user._id !== userProfile._id : user
  })


  return (
    <div className='lg:border-b2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>
      <div className=''>
        {filetedUser?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  className='rounded-full cursor-pointer'
                  src={`${
                    user
                      ? urlFor(user?.profile).width(300).height(300).url()
                      : 'https://i.ibb.co/51Dsk3B/About-me.png'
                  }`}
                  width={34}
                  height={34}
                  alt='userProfile'
                />
              </div>
              <div className='hidden xl:block '>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {user.userName.replaceAll(' ', '')}
                  <GoVerified className='text-blue-400 ' />
                </p>
                <div className='capitalize text-gray-500 text-xs'>
                  {user.userName}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts
