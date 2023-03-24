import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{title: 'User', type: 'user'}],
      options: {
        disableNew: true,
      },
    }),

    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user', title: 'User'}}],
    }),

    defineField({
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [{type: 'reference', to: {type: 'task', title: 'Task'}}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Start Date',
      type: 'datetime',
    }),
  ],
})
