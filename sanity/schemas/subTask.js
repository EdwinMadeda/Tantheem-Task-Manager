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
      initialValue: '',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: '',
    }),

    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      initialValue: '',
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Need assistance', value: 'NEED_ASSISTANCE'},
          {title: 'Open', value: 'OPEN'},
          {title: 'Close', value: 'CLOSE'},
          {title: 'Verify', value: 'VERIFY'},
          {title: 'Verify & Close', value: 'CLOSE_&_VERIFY'},
        ],
      },
      initialValue: 'OPEN',
    }),

    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      options: {
        list: [
          {title: 'High', value: 1},
          {title: 'Medium', value: 2},
          {title: 'Low', value: 3},
        ],
      },
      initialValue: 3,
    }),
  ],
})
