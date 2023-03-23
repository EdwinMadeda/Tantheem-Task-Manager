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
      type: 'string',
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'string',
      initialValue: 'user',
      options: {
        list: [
          {title: 'USER', value: 'user'},
          {title: 'TEAM', value: 'team'},
        ],
      },
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{type: 'user'}],
      options: {
        disableNew: true,
      },
      hidden: ({document}) => document.assignedTo !== 'user',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{type: 'team'}],
      options: {
        disableNew: true,
      },
      hidden: ({document}) => document.assignedTo !== 'team',
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
      of: [
        {
          title: 'Deliverable',
          type: 'deliverable',
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
