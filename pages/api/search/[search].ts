import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../Utils/client'
import { searchPostsQuery } from '../../../Utils/querries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { search }: any = req.query

    const videosQuery = searchPostsQuery(search)

    const videos = await client.fetch(videosQuery)

    res.status(200).json(videos)
  }
}
