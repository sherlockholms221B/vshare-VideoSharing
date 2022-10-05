export interface Videos {
  caption: string
  video: {
    asset: {
      _id: string
      url: string
    }
  }
  _id: string
  _createdAt: string
  postedBy: {
    _id: string
    userName: string
    profile: any
    banner: {
      _type: string
      asset: {
        _type: string
        _ref: string
      }
    }
  }
  likes: {
    postedBy: {
      _id: string
      userName: string
      image: string
    }
  }[]
  comments: {
    comment: string
    _key: string
    postedBy: {
      _ref: string
      profile: any
    }
  }[]
  userId: string
}

export interface IUser {
  postedBy: any
  _id: string
  _type: string
  userName: string
  profile: any
  image: string
}
