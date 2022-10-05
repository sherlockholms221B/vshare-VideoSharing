import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from '../Utils/Constants'

const Discover = () => {
  const router = useRouter()
  const { topic } = router.query

  const activeTopic =
    'xl:border-2 hover:bg-primary xl:border-[#821010] py-2 px-3 rounded xl:rounded-full flex gap-2 items-center cursor-pointer text-[#821010] justify-center'
  const topicStyle =
    'xl:border-2 hover:bg-primary xl:border-gray-300 py-2 px-3 rounded xl:rounded-full flex gap-2 items-center cursor-pointer text-black justify-center'
  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold hidden xl:block mt-4 m-3'>
        Popular Topics
      </p>
      <div className='flex gap-3 flex-wrap'>
        {topics.map(({ name, icon }) => (
          <Link href={`/?topic=${name}`} key={name}>
            <div className={topic === name ? activeTopic : topicStyle}>
              <span className='md:font-bold font-semibold text-md xl:text-2xl'>
                {icon}
              </span>
              <span className='font-semibold text-md hidden xl:block capitalize'>
                {name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover
