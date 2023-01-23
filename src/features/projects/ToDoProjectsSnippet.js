import { Link } from 'react-router-dom';
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
              <li className="Projects__Snippet-item Snippet__Type2-Item"
                  key={project.id}>
                  <div className="Projects__Data">
                    <span className='Projects__Name'>
                        <Link to={`/myprojects/${project.id}`}>
                            {`${project.name.substring(0, 10)}...`}
                        </Link>
                    </span>
                    <span>{'Due Today'}</span>
                    <span className="Projects__Priority">{`${project.priority} Priority`}</span>
                  </div>

                 
              </li>))
            }
          </ul>
    </div>
  )
}

export default ToDoProjectsSnippet