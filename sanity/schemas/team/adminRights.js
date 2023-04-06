import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'adminRights',
  title: 'Administrative Rights',
  type: 'object',
  fields: [
    defineField({
      name: 'leadership',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Demote', value: 'demote'},
          {title: 'Remove', value: 'remove'},
          {title: 'Suspend', value: 'suspend'},
        ],
      },
    }),
    defineField({
      name: 'membership',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Promote', value: 'promote'},
          {title: 'Remove', value: 'remove'},
          {title: 'Suspend', value: 'suspend'},
        ],
      },
    }),
    defineField({
      name: 'invites',
      title: 'Invites',
      type: 'object',
      fields: [
        defineField({
          name: 'toLeadership',
          title: 'To Leadership',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'toMembership',
          title: 'To Membership',
          type: 'boolean',
          initialValue: false,
        }),
      ],
    }),
  ],
})
