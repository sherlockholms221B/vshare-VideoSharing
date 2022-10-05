import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import moment from 'moment'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../Utils/index'
import { Videos } from '../../types'
import useAuthStore from '../../store/authStore'
import { Comments, Like } from '../../components/index'
import { urlFor } from '../../Utils/client'

interface IProps {
  postDetails: Videos
}

const Details = ({ postDetails }: IProps) => {
  const { userProfile }: any = useAuthStore()
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [comment, setComment]: any = useState('')
  const [posting, setPosting] = useState(false)
  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null)
  const onVideoPlay = () => {
    if (playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [isVideoMuted, post])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e: any) => {
    e.preventDefault()

    if (userProfile && comment) {
      setPosting(true)

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment,
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setPosting(false)
    }
  }

  if (!post) {
    return null
  }

  return (
    <div className='flex w-full absolute left-0  top-0 bg-white flex-wrap lg:flex-nowrap z-10'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center '>
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px] ' />
          </p>
        </div>
        <div className='relative '>
          <div className='lg:h-[100vh] h-[60vh] '>
            <video
              ref={videoRef}
              loop
              onClick={onVideoPlay}
              src={post.video.asset.url}
              className='h-full cursor-pointer'
            ></video>
          </div>
          <div className='absolute top-[45%] left-[45%]  cursor-pointer'>
            {!playing && (
              <button className='' onClick={onVideoPlay}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className='text-white text-3xl lg:text-5xl' />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className='text-white text-3xl lg:text-5xl' />
            </button>
          )}
        </div>
      </div>
      <div className='w-[1000px] relative md:w-[900px] lg:w-[700px] '>
        <div className='lg:mt-20 mt-10 '>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='md:w-20 md:h-20 w-16 h-16 ml-4'>
              <Link href='/'>
                <div>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={urlFor(postDetails.postedBy.profile).width(400).url()}
                    width={63}
                    height={62}
                    alt='profile'
                    priority
                    layout='responsive'
                  />
                </div>
              </Link>
            </div>
            <div className='flex flex-col gap-1 '>
              <Link href='/'>
                <div className='flex flex-col mt-3 gap-2 '>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy?.userName}{' '}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-meduim text-xs text-gray-500 hidden md:block'>
                    {post.postedBy?.userName}
                  </p>
                </div>
              </Link>
              <p className='font-meduim text-xs text-gray-500 ml-1 md:block'>
                {moment(post._createdAt).fromNow()}
              </p>
            </div>
          </div>
          <p className='px-10 text-md text-gray-600 text-lg mt-2'>
            {post.caption}
          </p>

          <div className='mt-10 px-10'>
            {userProfile && (
              <Like
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
                likes={post.likes}
              />
            )}
          </div>
          <Comments
            comment={comment}
            addComment={addComment}
            setComment={setComment}
            posting={posting}
            comments={post.comments}
          />
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
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data },
  }
}

export default Details
