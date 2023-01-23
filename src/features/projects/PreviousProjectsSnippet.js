import ProgressBar from '../../ReusableComponents/ProgressBar';
import { totalDeliverablesCount, completeDeliverablesCount } from './projectsSlice';
import { useSelector } from 'react-redux';

const PreviousProjectsSnippet = ({projects}) => {
  
    //console.log(useSelector(state => completeDeliverablesCount(state, 0)));

  return (
    <div className={`PreviousProjects Projects__Snippet`}>
        <p className="Projects__Snippet-title">previous Projects</p>
        <ul className="Projects__Snippet-items">
          {projects.map(project => (
              <li className="Projects__Snippet-item Snippet__Type3-Item" 
                  key={project.id}>
                       <p className="Projects__Item-name Snippet__Type3-ItemName">{`${project.name.substring(0,15)}...`}</p>
                       <ProgressBar
                          completeItems = {10}
                          totalItems = {12}
                       />
                  </li>
            ))
          }
        </ul> 
    </div>
  )
}

export default PreviousProjectsSnippet