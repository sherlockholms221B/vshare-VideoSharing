import * as React from 'react'
import { NextPage } from 'next'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import moment from 'moment'
import { MdCancel, MdFavorite } from 'react-icons/md'
import { GoVerified } from 'react-icons/go'
import { AiOutlineComment } from 'react-icons/ai'
import { Videos } from '../types'
import useAuthStore from '../store/authStore'
import { BASE_URL } from '../Utils/index'
import { urlFor } from '../Utils/client'

interface IProps {
  post: Videos
}
const VideoContainer: NextPage<IProps> = ({ post }) => {
  const { userProfile }: any = useAuthStore()
  const [liked, setLiked] = React.useState(false)
  const [video, setVideo] = React.useState(post)
  const [login, setLogin] = React.useState(false)
  const filteredLikes = video.likes?.filter(
    (item: any) => item._ref === userProfile?._id
  )

  React.useEffect(() => {
    if (filteredLikes?.length > 0) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [filteredLikes, video.likes])

  React.useEffect(() => {
    setVideo(post)
  }, [post])

  const handleLike = async (like: boolean) => {
    if (userProfile?.userName) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: video._id,
        like,
      })

      setVideo({ ...video, likes: data.likes })
    } else {
      setLogin(true)
    }
  }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 w-[100%] pb-6 '>
      <div className=''>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href={`/profile/${video.postedBy._id}`}>
              <>
                <Image
                  width={63}
                  height={62}
                  className='rounded-full cursor-pointer'
                  src={urlFor(video.postedBy.profile).width(400).url()}
                  alt='profile'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
          <div className='flex flex-col gap-1 '>
            <Link href={`/profile/${video.postedBy._id}`}>
              <div className='flex items-center gap-2 '>
                <p className='flex gap-2 items-center md:text-md font-semibold md:font-bold text-primary text-sm'>
                  {video.postedBy?.userName}{' '}
                  <GoVerified className='text-blue-400 text-md' />
                </p>
                <p className='capitalize font-meduim text-xs text-gray-500 hidden md:block'>
                  {video.postedBy?.userName}
                </p>
              </div>
            </Link>
            <p className='font-meduim text-xs text-gray-500  md:block'>
              {moment(video._createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div className=' flex items-center gap-2 '>
          <div className='rounded-md md:rounded-3xl bg-gray-200 pt-2 pl-1 pr-1 pb-2 sm:p-3 '>
            <Link href={`/details/${video._id}`}>
              <video
                controls
                src={video.video.asset.url}
                loop
                className='lg:w-[600px] sm:h-[400px] md:h-[400px] lg:h-[530px] sm:w-[400px] rounded-sm md:rounded-2xl cursor-pointer w-[100%] h-[100%] '
              ></video>
            </Link>
          </div>
          <div className='flex flex-col gap-3 items-center'>
            <div className='flex flex-col justify-center items-center'>
              {liked ? (
                <div
                  className='bg-primary rounded-full p-2 md:p-3 text-[#821010] hover:opacity-120 cursor-pointer '
                  onClick={() => handleLike(false)}
                >
                  <MdFavorite className='text-lg md:text-2xl ' />
                </div>
              ) : (
                <div
                  className='text-lg md:text-2xl text-lg md:text-2xl cursor-pointer  '
                  onClick={() => handleLike(true)}
                >
                  <MdFavorite className='text-lg md:text-2xl ' />
                </div>
              )}

              <p className='text-md font-semibold text-gray-600'>
                {video?.likes?.length | 0}
              </p>
            </div>
            <div className=' flex flex-col justify-center items-center cursor-pointer'>
              <Link href={`/details/${video._id}`}>
                <div className='flex flex-col justify-center items-center cursor-pointer'>
                  <AiOutlineComment className='text-lg md:text-2xl ' />
                  <p className='text-md font-semibold text-gray-600'>
                    {video?.comments?.length | 0}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {login && (
        <div className='absolute top-0 bottom-0 right-0 left-0 z-10 backdrop-blur-lg flex justify-center items-center '>
          <div className='px-2 py-4 text-center flex flex-col items-center justify-center bg-gray-200 sm:h-[60%] sm:w-[60%] w-[90%] h-[80%] rounded-md relative'>
            <MdCancel
              className='absolute top-2 right-2 text-3xl '
              onClick={() => setLogin(false)}
            />
            <p className='text-gray-400 text-red-500'>
              Log in to comment and like videos
            </p>
            <div className='w-full  flex justify-center items-center'>
              <Link href='/login'>
                <button
                  type='button'
                  onClick={() => setLogin(false)}
                  className='bg-white text-lg text-[#821010] font-bold capitalize border-[1px] border-[#821010] px-2 rounded py-2 mt-4 hover:bg-[#821010] hover:text-white flex justify-center items-center w-[50%] '
                >
                  log in
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoContainer
