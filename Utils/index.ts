import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

export const BASE_URL = process.env.NEXT_PUBLIC_URL

export const createUser = async (
  {
    userName,
    email,
    password,
    confirm,
  }: {
    userName: string
    email: string
    password: string
    confirm: string
  },
  profileAssset: any,
  bannerAsset: any,
  setInvalidPassword: any,
  addUser: any,
  router: any
) => {
  const user = {
    _id: uuidv4(),
    _type: 'user',
    userName: userName,
    email: email,
    password: password,
    confirm: confirm,
    profile: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: profileAssset?._id,
      },
    },
    banner: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: bannerAsset?._id,
      },
    },
  }


  if (password !== confirm || !userName || !email || !password || !confirm) {
    setInvalidPassword(true)
  } else {
    const { data } = await axios.post(`${BASE_URL}/api/auth/signup`, user)
    addUser(data)
    router.push('/')
  }
}

export const GetUser = async (
  {
    email,
    password,
  }: {
    email: string
    password: string
  },
  addUser: any,
  router: any,
  setInvalidPassword: any
) => {
  const user = {
    _id: uuidv4(),
    _type: 'user',
    password: password,
    email: email,
  }

  if (!email || !password) {
    setInvalidPassword(true)
  } else {
    const { data } = await axios.post(`${BASE_URL}/api/auth/signin`, user)

    addUser(data)
    router.push('/')
  }
}
