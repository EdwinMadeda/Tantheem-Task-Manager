import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'invite',
  title: 'Invite ',
  type: 'document',
  fields: [
    defineField({
      name: 'alias',
      type: 'string',
    }),

    defineField({
      name: 'sentBy',
      title: 'Sent By',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'participant',
      type: 'reference',
      to: {type: 'user', title: 'User'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'inviteTo',
      title: 'Invite To',
      type: 'reference',
      to: [{type: 'team'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Member', value: 'member'},
          {title: 'Team Lead', value: 'teamLead'},
        ],
      },
      initialValue: 'member',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'adminRights',
      type: 'adminRights',
      title: 'Administative Rights',
    }),

    defineField({
      name: 'memberRights',
      type: 'memberRights',
      title: 'Member Rights',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'On Invite', value: 'On Invite'},
          {title: 'Accepted', value: 'Accepted'},
          {title: 'Declined', value: 'Declined'},
          {title: 'Expired', value: 'Expired'},
        ],
      },
      initialValue: 'On Invite',
    }),

    defineField({
      name: 'expiry',
      title: 'Expiry',
      type: 'datetime',
    }),
  ],
})
