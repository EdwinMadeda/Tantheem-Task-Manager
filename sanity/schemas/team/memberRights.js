import {defineType} from 'sanity'

export default defineType({
  name: 'memberRights',
  title: 'Member Rights',
  type: 'array',
  of: [{type: 'string'}],
  options: {
    list: [
      {title: 'Add Or Edit Tasks', value: 'addOrEdit_Tasks'},
      {title: 'Add Or Edit SubTasks', value: 'addOrEdit_SubTasks'},
      {title: 'Add Or Edit Projects', value: 'addOrEdit_Projects'},
      {title: 'Add Or Edit Deliverables', value: 'addOrEdit_Deliverables'},

      {title: 'Work On Tasks', value: 'work_On_Tasks'},
      {title: 'Work On SubTasks', value: 'work_On_SubTasks'},
      {title: 'Work On Projects', value: 'work_On_Projects'},
      {title: 'Work On Deliverables', value: 'work_On_Deliverables'},
    ],
  },
  initialValue: ['work_On_Tasks', 'work_On_SubTasks', 'work_On_Projects', 'work_On_Deliverables'],
})
