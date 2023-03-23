import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'users',
  title: 'Users ',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
    }),
    defineField({
      name: 'userAvatar',
      title: 'User Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
