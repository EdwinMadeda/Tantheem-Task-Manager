import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'deliverable',
  title: 'Deliverable',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'IN_PROGRESS', value: 'In Progress'},
          {title: 'COMPLETE', value: 'Complete'},
          {title: 'TO_DO', value: 'To Do'},
        ],
      },
      initialValue: 'To Do',
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
  ],
})
