import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subTask',
  title: 'Sub Task',
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
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{type: 'team'}],
      options: {
        disableNew: true,
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'reminder',
      title: 'Reminder',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isComplete',
      title: 'Is Complete',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      initialValue: 'low',
      options: {
        list: [
          {title: 'HIGH', value: 'high'},
          {title: 'MEDIUM', value: 'medium'},
          {title: 'LOW', value: 'low'},
        ],
      },
    }),
    defineField({
      name: 'createdAt',
      title: 'Start Date',
      type: 'datetime',
    }),
  ],
})
