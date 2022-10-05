import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import Image from 'next/image'
import { BASE_URL } from '../../Utils/index'
import useAuthStore from '../../store/authStore'
import { IUser, Videos } from '../../types'
import { NoPost, VideoContainer } from '../../components'
import { urlFor } from '../../Utils/client'

const Search = ({ videos }: { videos: Videos[] }) => {
  const { userProfile, allUsers }: any = useAuthStore()
  const [showUserVideo, setShowUserVideo] = useState(true)
  const router = useRouter()
  const { search }: any = router.query

  const searchAccounts = allUsers.filter((user: IUser) => {
    user.userName.toLowerCase().includes(search.toLowerCase())
  })

  const isAccounts = showUserVideo ? 'border-b-4 border-black' : 'text-gray-400'
  const isVideo = !showUserVideo ? 'border-b-4 border-black' : 'text-gray-400'

  return (
    <div className='w-full'>
      <div className='flex gap-10 mb-10 mb-10 border-b-4 border-gray-200 bg-white w-full'>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isAccounts}`}
          onClick={() => setShowUserVideo(true)}
        >
          accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideo}`}
          onClick={() => setShowUserVideo(false)}
        >
          video
        </p>
      </div>
      {showUserVideo ? (
        <div className='md:mt-16'>
          {searchAccounts?.length > 0 ? (
            searchAccounts?.map((account: IUser, i: any) => (
              <Link href={`/profile/${account._id}`} key={i}>
                <div className='flex p-2 cousor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                  <div>
                    <Image
                      className='rounded-full cursor-pointer'
                      src={urlFor(userProfile?.profile)
                        .width(300)
                        .height(300)
                        .url()}
                      width={50}
                      height={50}
                      alt='userProfile'
                    />
                  </div>
                  <div className='hidden xl:block '>
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                      {account.userName.replaceAll(' ', '')}
                      <GoVerified className='text-blue-400 ' />
                    </p>
                    <div className='capitalize text-gray-500 text-xs'>
                      {account.userName}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoPost text={`No Video For ${search}`} />
          )}
        </div>
      ) : (
        <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
          {videos?.length ? (
            videos.map((video, i) => <VideoContainer post={video} key={i} />)
          ) : (
            <NoPost text={`No Video For ${search}`} />
          )}
        </div>
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  params: { search },
}: {
  params: { search: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${search}`)

  return {
    props: {
      data: data,
    },
  }
}

export default Search
