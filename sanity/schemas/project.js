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
      type: 'array',
      of: [{type: 'reference', to: {type: 'user', title: 'User'}}],
      initialValue: [],
    }),

    defineField({
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{title: 'Team', type: 'team'}],
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
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{type: 'reference', to: {type: 'deliverable', title: 'Deliverables'}}],
    }),
  ],
})
