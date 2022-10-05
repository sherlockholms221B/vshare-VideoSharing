import React from 'react'
interface IProps {
  type: string
  placeholder: string
  value: string
  name: string
  handleChange: any
  upload: boolean
  comment: boolean
}
const Input = ({
  type,
  placeholder,
  value,
  handleChange,
  name,
  upload,
  comment,
}: IProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-[80%] mt-3 rounded-sm outline-none focus:shadow-lg ${
        upload && 'text-md border-2 border-gray-300 shadow-lg  '
      }  ${
        comment
          ? 'bg-[#eee] px-6 py-4 text-md font-md border-2 w-[250px] md:w-[700px] lg:w-[350px] shadow-lg border-gray-100 focus:outline-none focus:border-3 focus:border-gray-300 flex-1 rouneed-lg'
          : 'px-2 py-2 '
      }`}
      onChange={handleChange}
      value={value}
      name={name}
    />
  )
}

export default Input
