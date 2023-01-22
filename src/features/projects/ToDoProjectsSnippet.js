import OrderByBtnsWrapper from '../../ReusableComponents/OrderByBtnsWrapper';

const ToDoProjectsSnippet = ({projects}) => {

  return (
    <div className='ToDoProjects Projects__Snippet'>
        <p className='Projects__Snippet-title'>TO DO</p>
        <div className="Projects__OrderByBtns">
              <OrderByBtnsWrapper 
                    onDueDateClick={()=>{}}
                    onPriorityClick={()=>{}}
                    onAlphabeticallyClick={()=>{}}
              />
          </div>
          <ul className="Projects__Snippet-items">
            {projects.map(project => (
              <li className="Projects__Snippet-item"
                  key={project.id}>
                  <div className="Projects__Data">
                    <span>{`${project.name.substring(0, 10)}...`}</span>
                    <span>{'Due Today'}</span>
                  </div>

                  <p className="Projects__Priority">{`${project.priority} Priority`}</p>
              </li>))
            }
          </ul>
    </div>
  )
}

export default ToDoProjectsSnippet