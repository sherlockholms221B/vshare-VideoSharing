import create from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

import { BASE_URL } from '../Utils/index'

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  logOut: () => set({ userProfile: null }),

  fatchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`)

    set({ allUsers: data })
  },
})

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
)

export default useAuthStore
