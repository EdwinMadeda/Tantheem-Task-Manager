import { useState } from 'react';
import AddBtn from '../../ReusableComponents/AddBtn'
import DotsMenu from '../../ReusableComponents/DotsMenu'
import EditBtn from '../../ReusableComponents/EditBtn';
import { STATUS } from './projectsSlice';

const ProjectDeliverables = ({deliverables, type}) => {

  const optionEntries = Object.entries(STATUS)
                              .map(entry => entry[1])
                              .filter(entry => entry !== type);
  
  const options = optionEntries.map((entry, index) => {
          return {
             id : index,
             name : entry,
             onClick : ()=>{},
          }
  });

  return (
    <div className='ProjectDeliverables__Snippet'>
        <AddBtn label={'Add Deliverable'} onClick={()=>{}}/>
        <ul className='ProjectDeliverable__Items'>

            {deliverables.map(deliverable => (
               <li  className="ProjectDeliverable__Item"
                    key={deliverable.id}>
                    <DotsMenu options={options}/>
                    <p className="ProjectDeliverable__ItemName">{deliverable.name}</p>
                    <EditBtn onClick={()=>{}}/>
               </li>
            ))}
        </ul>
    </div>
  )
}

export default ProjectDeliverables