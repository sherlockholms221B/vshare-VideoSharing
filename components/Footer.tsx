import React from 'react'
import { footerList1, footerList2, footerList3 } from '../Utils/Constants'

const List = ({ items, mt }: { items: string[]; mt: Boolean }) => {
  return (
    <div className={`flex flex-wrap gap-3 ${mt && ' mt-5'}`}>
      {items.map((list) => (
        <p
          className='text-gary-400 text-sm hover:underline hover:text-[#821010] cursor-pointer'
          key={list}
        >
          {list}
        </p>
      ))}
    </div>
  )
}

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block text-center'>
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className='text-gray-500 capitalize text-sm tex-3xl mt-20 font-bold'>
        2022 vshare <span className='text-[#821010] '>Designed by santus</span>
      </p>
    </div>
  )
}

export default Footer
