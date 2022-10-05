export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'confirm',
      title: 'Confirm',
      type: 'string',
    },
    {
      name: 'profile',
      title: 'Profile',
      type: 'image',
    },
    {
      name: 'banner',
      title: 'Banner',
      type: 'image',
    },
  ],
}
