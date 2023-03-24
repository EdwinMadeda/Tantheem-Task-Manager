import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'task',
  title: 'Task',
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
      name: 'belongsTo',
      title: 'Belongs To',
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
      name: 'groupedInto',
      title: 'Grouped Into',
      type: 'reference',
      to: [
        {title: 'Project', type: 'project'},
        {title: 'Deliverable', type: 'deliverable'},
      ],
      options: {
        disableNew: true,
      },
      weak: true,
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
      name: 'subTasks',
      title: 'Sub Tasks',
      type: 'array',
      of: [{type: 'reference', to: {type: 'subTask', title: 'SubTask'}}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Start Date',
      type: 'datetime',
    }),
  ],
})
