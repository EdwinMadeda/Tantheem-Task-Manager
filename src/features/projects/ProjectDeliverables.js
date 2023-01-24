import AddBtn from '../../reusableComponents/AddBtn'
import DotsMenu from '../../reusableComponents/DotsMenu'
import EditBtn from '../../reusableComponents/EditBtn';
import { STATUS } from './projectsSlice';

const ProjectDeliverables = ({deliverables, type, projectId}) => {

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
        <AddBtn label={'Add Deliverable'} path={`/myprojects/${projectId}/add`}/>
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