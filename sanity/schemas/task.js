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
      initialValue: '',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue: '',
    }),

    defineField({
      name: 'owners',
      title: 'Owners',
      description: 'Persons responsible for seeing the task through to completion.',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user', title: 'User'}}],
      initialValue: [],
    }),

    defineField({
      name: 'assignees',
      title: 'Assignees',
      description: 'Persons responsible for doing the work.',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user', title: 'User'}}],
      initialValue: [],
    }),

    defineField({
      name: 'followers',
      title: 'Followers',
      description: 'Any persons that wants to be kept in the loop as the task progresses',
      type: 'array',
      of: [{type: 'reference', to: {type: 'user', title: 'User'}}],
      initialValue: [],
    }),

    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      initialValue: '',
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
    defineField({
      name: 'subTasks',
      title: 'Sub Tasks',
      type: 'array',
      of: [{type: 'reference', to: {type: 'subTask', title: 'SubTask'}}],
      initialValue: [],
    }),
  ],
})
