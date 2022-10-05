import { signInUser } from './../../../Utils/querries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../Utils/client'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body
    const user = req.body

    const query = signInUser(email)

    const userAlreadyExist = await client.fetch(query)

    if (!userAlreadyExist) {
      return res.status(200).json({ mag: 'user already exist' })
    }

    const data = await client.createIfNotExists(user)

    res.status(200).json(data)
  }
}
