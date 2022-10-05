import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../Utils/client'
import { topicPostsQuery } from '../../../Utils/querries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { topic }: any = req.query

    const videosQuery = topicPostsQuery(topic)
    const videos = await client.fetch(videosQuery)

    res.status(200).json(videos)
  }
}
