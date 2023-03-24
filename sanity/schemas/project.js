import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
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
      name: 'managedBy',
      title: 'Managed By',
      type: 'reference',
      to: [
        {title: 'User', type: 'user'},
        {title: 'Team', type: 'team'},
      ],
      options: {
        disableNew: true,
      },
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'To Do',
      options: {
        list: [
          {title: 'IN_PROGRESS', value: 'In Progress'},
          {title: 'COMPLETE', value: 'Complete'},
          {title: 'TO_DO', value: 'To Do'},
        ],
      },
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
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{type: 'reference', to: {type: 'deliverable', title: 'Deliverable'}}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Start Date',
      type: 'datetime',
    }),
  ],
})
