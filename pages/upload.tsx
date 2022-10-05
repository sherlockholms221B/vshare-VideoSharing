import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloud } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'
import useAuthStore from '../store/authStore'
import { client } from '../Utils/client'
import { Input } from '../components/index'
import { topics } from '../Utils/Constants'
import { BASE_URL } from '../Utils/index'

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore()
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [isloading, setIsloading] = useState(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0])
  const [savingPost, setSavingPost] = useState(false)
  const [wrongeFiletype, setWrongeFiletype] = useState(false)
  const router = useRouter()

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0]
    const fileTypes = [
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/x-matroska',
    ]
    if (fileTypes.includes(selectedFile.type)) {
      setIsloading(true)
      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data)
          setIsloading(false)
        })
    } else {
      setIsloading(false)
      setWrongeFiletype(true)
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }

      await axios.post(`${BASE_URL}/api/post`, document)
      router.push('/')
    }
  }
  return (
    <div
      className='flex w-full h-full absolute left-0 top-[100px] mb-10 pt-10 lg:pt-20  bg-[#eee] justify-center 
     '
    >
      <div className='bg-white rounded-lg xl:h-full flex gap-6 flex-wrap justify-between items-center p-14 pt-6 w-full md:w-[80%] md:h-[95vh] md:bg-red-400 '>
        <div className=''>
          <div className=''>
            <p className='text-2xl font-bold'>Upload video</p>
            <p className='text-md text-gray-400 mt-1'>
              Post a video to your account
            </p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-[#821010] hover:bg-gray-100  '>
            {isloading ? (
              <p className=''>uploading</p>
            ) : (
              <div className=''>
                {videoAsset ? (
                  <div className=' rounded-xl  w-[250px] h-[460px] flex justify-center items-center'>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450px] bg-black '
                    ></video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col justify-center w-full items-center h-full '>
                      <div className='flex flex-col justify-center items-center '>
                        <p className='font-bold text-xl'>
                          <FaCloud className='text-6xl text-gray-300' />
                        </p>
                        <p className='text-xl font-semibold'> Upload video</p>
                      </div>
                      <p className='text-gray-400 text-center mt-10 text-sm leading-8'>
                        MP4 or WebM or ogg or x-matroska <br /> 720x1280 or
                        higher <br /> up to 10 minutes <br /> less than 2GB
                      </p>
                      <p className='bg-[#821010] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none  '>
                        select file
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      className='w-0 h-0'
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongeFiletype && (
              <p className='text-center text-xl font-semibold mt-4 w-[250px] text-red-200 '>
                {' '}
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium'>Caption</label>
          <Input
            type='text'
            placeholder=''
            name='caption'
            value={caption}
            handleChange={(e: any) => setCaption(e.target.value)}
            upload={true}
            comment={false}
          />
          <label className='text-md font-medium'>Choose a Category</label>
          <select
            onChange={(e: any) => setCategory(e.target.value)}
            className='outline-none border-2 border-gray-200 capitalize text-md lg:p-4 p-2 rounded cursor-pointer '
          >
            {topics.map(({ name }) => (
              <option
                value={name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                key={name}
              >
                {name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10'>
            <button
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              type='button'
              onClick={() => {}}
            >
              Discard
            </button>
            <button
              className='bg-[#821010] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
              type='button'
              onClick={handlePost}
            >
              {savingPost ? 'Posting' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
