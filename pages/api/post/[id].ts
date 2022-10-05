import { client } from './../../../Utils/client'
import { postDetailQuery } from './../../../Utils/querries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id }: any = req.query
    const query = postDetailQuery(id)

    await client.fetch(query).then((data) => {
      res.status(200).json(data[0])
    })
  } else if (req.method === 'PUT') {
    const { comment, userId } = req.body

    const { id }: any = req.query

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          postedBy: {
            _type: 'postedBy',
            _ref: userId,
          },
        },
      ])
      .commit()
    res.status(200).json(data)
  }
}
