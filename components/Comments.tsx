import React, { useState, useEffect, SetStateAction, Dispatch } from 'react'
import useAuthStore from '../store/authStore'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { NoPost, Input } from './index'
import { IUser } from '../types'
import { urlFor } from '../Utils/client'

interface IProps {
  posting: boolean
  comments: IComments[]
  addComment: (e: React.FormEvent) => void
  comment: string
  setComment: Dispatch<SetStateAction<string>>
}

interface IComments {
  comment: string
  length?: number
  _key: string
  postedBy: {
    profile(profile: any): unknown
    _ref: string
    _id: string
  }
}

const Comments = ({
  comments,
  addComment,
  setComment,
  posting,
  comment,
}: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore()
  const handleChange = (e: any) => {
    setComment(e.target.value)
  }
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#eee] border-b-2 lg:pb-0 pb-[100px] '>
      <div className='overflow-scroll lg:h-[475px] '>
        {comments?.length ? (
          <div className=''>
            {comments.map((item, i) => (
              <div key={i}>
                {allUsers.map(
                  (user: IUser, j: any) =>
                    user._id === (item.postedBy._id || item.postedBy._ref) && (
                      <div className='p-2 items-center shadow-lg' key={j}>
                        <Link href={`/profile/${user._id}`}>
                          <div className='flex items-start gap-3'>
                            <div className='w-8 h-8'>
                              <Image
                                className='rounded-full cursor-pointer'
                                src={urlFor(user.profile)
                                  .width(300)
                                  .height(300)
                                  .url()}
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
                        <div className='m-1 '>
                          <p className='text-md '>{item.comment}</p>
                        </div>
                      </div>
                    )
                )}
              </div>
            ))}
          </div>
        ) : (
          <NoPost text='No Comments Yet' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <Input
              type='text'
              placeholder='Add comment...'
              name='comment'
              upload={false}
              handleChange={handleChange}
              value={comment}
              comment
            />
            <button onClick={addComment} className='text-md text-gray-500 '>
              {posting ? 'Commenting ' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
