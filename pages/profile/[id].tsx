import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import { VideoContainer, NoPost } from '../../components'
import { BASE_URL } from '../../Utils/index'
import { IUser, Videos } from '../../types'
import { urlFor } from '../../Utils/client'
import useAuthStore from '../../store/authStore'

interface IProps {
  data: {
    user: IUser
    userVideos: Videos[]
    userLiked: Videos[]
  }
}

const Profile = ({ data }: IProps) => {
  const { userProfile }: any = useAuthStore()
  const { user, userLiked, userVideos } = data
  const [showUserVideo, setShowUserVideo] = useState(true)
  const [videosCategory, setVideosCategory] = useState<Videos[]>([])

  const video = showUserVideo ? 'border-b-4 border-black' : 'text-gray-400'
  const liked = !showUserVideo ? 'border-b-4 border-black' : 'text-gray-400'

  useEffect(() => {
    if (showUserVideo) {
      setVideosCategory(userVideos)
    } else {
      setVideosCategory(userLiked)
    }
  }, [showUserVideo, userLiked, userVideos])

  return (
    <div className='w-full '>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='w-16 h-16 md:w-32 md:h-32 '>
          <Image
            className='rounded-full cursor-pointer'
            src={urlFor(user?.profile).width(300).height(300).url()}
            width={120}
            height={120}
            alt='userProfile'
          />
        </div>
        <div className='flex flex-col justify-center'>
          <p className='flex  md:text-2xl tracking-wider gap-1 items-center justify-center text-md font-bold text-primary lowercase'>
            {user.userName.replaceAll(' ', '')}
            <GoVerified className='text-blue-400 ' />
          </p>
          <div className='capitalize md:text-xl text-gray-500 text-xs'>
            {user.userName}
          </div>
        </div>
      </div>
      <div className=''>
        <div className='flex gap-10 mb-10 mb-10 border-b-4 border-gray-200 bg-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${video}`}
            onClick={() => setShowUserVideo(true)}
          >
            videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
            onClick={() => setShowUserVideo(false)}
          >
            liked
          </p>
        </div>
        <div
          className='flex gap-6 flex-wrap md:justify-start
        '
        >
          {videosCategory?.length > 0 ? (
            videosCategory?.map((post: Videos, i: number) => (
              <VideoContainer post={post} key={i} />
            ))
          ) : (
            <NoPost text={`No ${showUserVideo ? '' : 'Liked'} Videos Yet`} />
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`)

  return {
    props: {
      data: data,
    },
  }
}

export default Profile
