import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team',
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
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{title: 'User', type: 'user'}],
      options: {
        disableNew: true,
      },
    }),

    defineField({
      name: 'ledBy',
      title: 'Led By',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'details',
          fields: [
            defineField({
              name: 'alias',
              type: 'string',
              initialValue: 'teamLead',
            }),
            defineField({
              name: 'participant',
              type: 'reference',
              to: {type: 'user', title: 'User'},
              validation: (Rule) => Rule.required().unique(),
            }),

            defineField({
              name: 'adminRights',
              type: 'adminRights',
              title: 'Administative Rights',
            }),

            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              initialValue: 'On Invite',
              options: {
                list: [
                  {title: 'In Service', value: 'In Service'},
                  {title: 'On Suspension', value: 'On Suspension'},
                ],
              },
            }),

            defineField({
              name: 'createdAt',
              title: 'Created At',
              type: 'datetime',
              initialValue: new Date().toISOString(),
            }),
            defineField({
              name: 'updatedAt',
              title: 'Updated At',
              type: 'datetime',
              initialValue: new Date().toISOString(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.unique().min(1),
    }),

    defineField({
      name: 'members',
      title: 'Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'details',
          fields: [
            defineField({
              name: 'alias',
              type: 'string',
              initialValue: 'member',
            }),
            defineField({
              name: 'participant',
              type: 'reference',
              to: {type: 'user', title: 'User'},
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
              initialValue: 'On Invite',
              options: {
                list: [
                  {title: 'In Service', value: 'In Service'},
                  {title: 'On Suspension', value: 'On Suspension'},
                ],
              },
            }),

            defineField({
              name: 'createdAt',
              title: 'Created At',
              type: 'datetime',
              initialValue: new Date().toISOString(),
            }),
            defineField({
              name: 'updatedAt',
              title: 'Updated At',
              type: 'datetime',
              initialValue: new Date().toISOString(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
})
