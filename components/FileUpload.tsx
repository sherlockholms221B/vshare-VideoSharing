import React from 'react'
import Image from 'next/image'
import { FaCloud } from 'react-icons/fa'

interface IProps {
  isloading: boolean
  wrongeFileType: boolean
  imageAsset: any
  uploadImage: any
}

const FileUpload = ({
  isloading,
  imageAsset,
  wrongeFileType,
  uploadImage,
}: IProps) => {
  return (
    <>
      <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[200px] sm:w-[260px] h-3/6 sm:h-[460px] p-5 cursor-pointer hover:border-[#821010] hover:bg-gray-200 bg-gray-100  '>
        {isloading ? (
          <p className=''>uploading</p>
        ) : (
          <div className=''>
            {imageAsset ? (
              <div className=' rounded-xl  w-[250px] h-[460px] flex justify-center items-center'>
                <Image
                  src={imageAsset.url}
                  width={200}
                  height={400}
                  className='rounded-xl h-[450px] bg-black '
                  alt='userProfile'
                />
              </div>
            ) : (
              <label className='cursor-pointer'>
                <div className='flex flex-col justify-center w-full items-center h-full '>
                  <div className='flex flex-col justify-center items-center  text-center'>
                    <p className='font-bold text-xl'>
                      <FaCloud className='text-6xl text-gray-300' />
                    </p>
                    <p className='text-xl font-semibold'>Upload profile</p>
                  </div>

                  <p className='bg-[#821010] text-center mt-10 rounded text-white text-md font-medium p-2 w-53 outline-none border-4 border-red-600 '>
                    select file
                  </p>
                </div>
                <input
                  type='file'
                  name='profile'
                  className='w-0 h-0'
                  onChange={uploadImage}
                />
              </label>
            )}
          </div>
        )}
        {wrongeFileType && (
          <p className='text-center text-xl font-semibold mt-4 w-[250px] text-red-200 '>
            Please select a image file
          </p>
        )}
      </div>
    </>
  )
}

export default FileUpload
