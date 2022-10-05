import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createUser, GetUser } from '../Utils'
import { Input, FileUpload, Banner } from './index'
import useAuthStore from '../store/authStore'
import { client } from '../Utils/client'
import { upload } from '../Utils/ImageUpload'

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [valid, setValid] = useState(false)
  const [wrongeFileType, setWrongeFileType] = useState(false)
  const [isProfileloading, setIsProfileloading] = useState(false)
  const [isBannerloading, setIsBannerloading] = useState(false)
  const [profileAssset, setProfileAssset] = useState(null)
  const [BannerAsset, setBannerAsset] = useState(null)
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [next, setNext] = useState(false)

  const { addUser } = useAuthStore()

  const router = useRouter()
  const [information, setInformation] = useState({
    userName: '',
    email: '',
    password: '',
    confirm: '',
  })
  const { userName, email, password, confirm } = information
  const after =
    'after:w-[480px] after:h-[520px] after:absolute after:bg-gradient-to-t from-transparent via-red-500 to-red-500 after:top-[-50%] after:left-[-50%] after:animate-wiggle after:origin-bottom-right'

  const handleSubmite = async (e: any) => {
    e.preventDefault()
    if (isSignUp) {
      await createUser(
        information,
        profileAssset,
        BannerAsset,
        setInvalidPassword,
        addUser,
        router
      )
    } else {
      GetUser(information, addUser, router, setInvalidPassword)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setInvalidPassword(false)
    }, 2000)
  }, [invalidPassword])

  const uploadImage = async (e: any) => {
    const selectedFile = e.target.files[0]
    if (!next) {
      upload(
        selectedFile,
        setIsProfileloading,
        setProfileAssset,
        setWrongeFileType
      )
    } else {
      upload(
        selectedFile,
        setIsBannerloading,
        setBannerAsset,
        setWrongeFileType
      )
    }
  }

  const handleChange = (e: any) => {
    setInformation({ ...information, [e.target.name]: e.target.value })
  }
  return (
    <div className='flex justify-center items-center h-[100vh] bg-[#23242a] relative '>
      <div
        className={`relative w-[580px] h-[520px] bg-[#1c1c1c] rounded-sm  overflow-hidden  ${after}`}
      >
        <div className='absolute z-10 bg-[#23242a] form  flex flex-col gap-3 justify-around items-center text-center'>
          {invalidPassword && (
            <h3 className='text-2xl capitalize font-semibold text-red-800 hover:text-red-400 '>
              invalid credentails
            </h3>
          )}
          <h3 className='text-2xl capitalize font-semibold text-red-500 hover:text-red-400 '>
            {isSignUp ? 'sign up' : 'sign in'}
          </h3>
          <form
            onSubmit={handleSubmite}
            className='flex flex-col w-full px-1 items-center  '
          >
            <Input
              type='email'
              placeholder='Email'
              value={email}
              name='email'
              handleChange={handleChange}
              upload={false}
              comment={false}
            />

            {isSignUp && (
              <>
                <Input
                  type='text'
                  placeholder='User Name'
                  value={userName}
                  name='userName'
                  handleChange={handleChange}
                  upload={false}
                  comment={false}
                />
              </>
            )}
            <Input
              type='password'
              placeholder='Password'
              value={password}
              name='password'
              handleChange={handleChange}
              upload={false}
              comment={false}
            />
            {isSignUp && (
              <>
                {' '}
                <Input
                  type='password'
                  placeholder='Confirm Password'
                  value={confirm}
                  name='confirm'
                  handleChange={handleChange}
                  upload={false}
                  comment={false}
                />
                <p
                  className=' cursor-pointer text-md text-white hover:opacity-100 opacity-80 mt-4 border-2 border-gray-500 p-2 hover:shadow-lg rounded-md capitalize'
                  onClick={() => setValid(true)}
                >
                  {valid ? 'Changed my mind' : ' upload profile / banner image'}
                </p>
              </>
            )}

            <button
              type='submit'
              className='bg-white text-lg text-[#821010] font-bold capitalize border-[1px] border-[#821010] px-3 rounded py-1 mt-4 hover:bg-[#821010] hover:text-white flex justify-center items-center '
            >
              {isSignUp ? 'sign up' : 'sign in'}
            </button>
          </form>
          <button
            className='text-md text-gray-600 hover:opacity-100 opacity-80'
            type='button'
            onClick={() => setIsSignUp((prev) => !prev)}
          >
            {!isSignUp
              ? 'Dont have an account? sign up'
              : 'Alredy have an account? sign in'}
          </button>
        </div>
      </div>
      {isSignUp && (
        <>
          {valid && (
            <div className='absolute top-0 bottom-0 right-0 left-0 backdrop-blur h-[100vh] w-[100vw] z-20 '>
              <div className='flex flex-col  justify-center items-center  w-full h-full'>
                {next ? (
                  <p className='text-md text-white '>
                    Select a background image
                  </p>
                ) : (
                  <p className='text-md text-white '>Select a profile image</p>
                )}
                {next ? (
                  <Banner
                    imageAsset={BannerAsset}
                    wrongeFileType={wrongeFileType}
                    isloading={isBannerloading}
                    uploadImage={uploadImage}
                  />
                ) : (
                  <FileUpload
                    imageAsset={profileAssset}
                    wrongeFileType={wrongeFileType}
                    isloading={isProfileloading}
                    uploadImage={uploadImage}
                  />
                )}
                {!next ? (
                  <button
                    type='button'
                    onClick={() => setNext(true)}
                    className='bg-[#821010] text-center mt-10 rounded text-white text-md font-medium py-2 px-4  outline-none  '
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={() => {
                      setValid(false)
                      setNext(false)
                    }}
                    className='bg-[#821010] text-center mt-10 rounded text-white text-md font-medium py-2 px-4  outline-none  '
                  >
                    finish
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Login
