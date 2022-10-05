import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../Utils/client'
import { allUsersQuery } from '../../Utils/querries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {

    console.log(req.headers)
    await client
      .fetch(allUsersQuery())
      .then((data) => {
        console.log(data)
        res.status(200).json(data)
      })
      .catch((error) => {
        console.log(error)
        res.status(405).json(error)
      })
  }
}
