import type { NextApiRequest, NextApiResponse } from 'next'
import { signInUser } from '../../../Utils/querries'
import { client } from './../../../Utils/client'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body
    const query = signInUser(email)

    const data = await client.fetch(query)
    if (!data) {
      res.status(200).json({ msg: 'No user found' })
    } else {
      res.status(200).json(data[0])
    }
  }
}
