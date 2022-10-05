import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MdFavorite } from 'react-icons/md'
import useAuthStore from '../store/authStore'

interface IProps {
  handleDislike: () => void
  handleLike: () => void
  likes: any
}

const Like = ({ handleDislike, handleLike, likes }: IProps) => {
  const { userProfile }: any = useAuthStore()
  const [liked, setLiked] = useState(false)
  const filteredLikes = likes?.filter(
    (item: any) => item._ref === userProfile._id
  )

  useEffect(() => {
    if (filteredLikes?.length > 0) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [likes, filteredLikes])
  return (
    <div className=' flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
          <div
            className='bg-primary rounded-full p-2 md:p-4 text-[#821010] hover:opacity-120 '
            onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-2xl ' />
          </div>
        ) : (
          <div
            className='bg-primary rounded-full p-2 md:p-4  hover:opacity-120 '
            onClick={handleLike}
          >
            <MdFavorite className='text-lg md:text-2xl ' />
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length | 0}</p>
      </div>
    </div>
  )
}

export default Like
