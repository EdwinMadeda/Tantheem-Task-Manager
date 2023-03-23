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
      type: 'string',
    }),
    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          title: 'Member',
          type: 'user',
        },
      ],
    }),
    defineField({
      name: 'tasks',
      title: 'Tasks',
      type: 'array',
      of: [
        {
          title: 'Task',
          type: 'task',
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Start Date',
      type: 'datetime',
    }),
  ],
})
