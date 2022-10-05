import axios from 'axios'
import { Videos } from '../types'
import { VideoContainer, NoPost } from '../components/index'
import { BASE_URL } from '../Utils/index'

interface IProps {
  videos: Videos[]
}

const Home = ({ videos }: IProps) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      {videos.length ? (
        videos.map((video: Videos) => (
          <VideoContainer post={video} key={video._id} />
        ))
      ) : (
        <NoPost text={'No post found'} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string }
}) => {
  if (topic) {
    const { data } = await axios.get(`${BASE_URL}/api/discover/${topic}`)

    return {
      props: {
        videos: data,
      },
    }
  } else {
    const { data } = await axios.get(`${BASE_URL}/api/post`)

    return {
      props: {
        videos: data,
      },
    }
  }
}

export default Home
