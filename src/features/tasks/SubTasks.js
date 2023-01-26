import AddBtn from '../../reusableComponents/AddBtn'
import CheckBox from '../../reusableComponents/CheckBox';
import EditBtn from '../../reusableComponents/EditBtn';
import { STATUS } from "./taskSlice";

const subTasks = ({subTasks, taskId, status}) => {

  return (
    <div className="SinglePage__InnerContainer">

      <h3 className="SubTasks__Title SinglePage__Sub-item__Title SinglePage__Title">{status}</h3>
      <div className='SubTasks__Snippet SinglePage__Sub-item__Snippet'>
          {status === STATUS.TO_DO && 
            <AddBtn label={'Add SubTask'} path={`/mytasks/${taskId}/add`}/>
          }
          <ul className='SubTask__Items SinglePage__Sub-item__Items'>
              {subTasks.map(subTask => (
                <li  className="SubTask__Item SinglePage__Sub-item__Item"
                      key={subTask.id}>
                      <CheckBox checked={false} onChange={()=>{}}/>
                      <p className="subTask__ItemName SinglePage__Sub-item__ItemName">{subTask.name}</p>
                      <EditBtn onClick={()=>{}}/>
                </li>
              ))}
          </ul>
          {subTasks.length === 0 && <p>{`No ${status} items`}</p>}
      </div>

    </div>
  )
}

export default subTasks