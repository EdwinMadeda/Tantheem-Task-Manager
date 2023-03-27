import ProgressBar from '../../reusableComponents/ProgressBar';
import { useSelector } from 'react-redux';
import { selectOneProject } from './projectsSlice';
import CustomLink from '../../reusableComponents/CustomLink';
import NoItemsMsg from '../../reusableComponents/NoItemsMsg';
import { trimStr } from '../../utils/constants';

const PreviousProjectsSnippet = ({ projects, title = 'Previous Projects' }) => {
  const DraftProgressBar = ({ projectId }) => {
    const { completeDeliverables, totalDeliverables } = useSelector((state) =>
      selectOneProject(state, projectId)
    );

    return (
      <ProgressBar
        completeItems={completeDeliverables}
        totalItems={totalDeliverables}
      />
    );
  };

  return (
    <div className={`PreviousProjects Projects__Snippet`}>
      <p className="Projects__Snippet-title">{title}</p>

      {projects.length > 0 ? (
        <ul className="Projects__Snippet-items">
          {projects.map((project) => (
            <li
              className="Projects__Snippet-item Snippet__Type3-Item"
              key={project.id}
            >
              <p className="Projects__Item-name Snippet__Type3-ItemName">
                <CustomLink to={`/myprojects/${project.id}`}>
                  {`${trimStr(project.name, 15)}`}
                </CustomLink>
              </p>
              <DraftProgressBar projectId={project.id} />
            </li>
          ))}
        </ul>
      ) : (
        <NoItemsMsg />
      )}
    </div>
  );
};

export default PreviousProjectsSnippet;
