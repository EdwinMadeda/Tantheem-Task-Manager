import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import {
  deleteDeliverable,
  selectProjectById,
  selectProjectsStatus,
} from './projectsSlice';
import BackBtn from '../../reusableComponents/BackBtn';
import EditBtn from '../../reusableComponents/EditBtn';
import DeleteBtn from '../../reusableComponents/DeleteBtn';

import './SingleProject.css';
import '../../SinglePage.css';
import CustomLink from '../../reusableComponents/CustomLink';
import LoadingSpinner from '../../reusableComponents/LoadingSpinner';

const SingleDeliverable = () => {
  const { projectId, deliverableId } = useParams();

  const selectProject = useSelector((state) =>
    selectProjectById(state, projectId)
  );

  const selectDeliverable = selectProject?.deliverables?.find(
    (deliverable) => deliverable.id === deliverableId
  );

  const { deleteDeliverable: statusDeleteDeliverable, fetchProjects } =
    useSelector(selectProjectsStatus);

  return (
    <>
      {fetchProjects === 'pending' ? (
        <LoadingSpinner />
      ) : (
        <>
          {Boolean(selectProject) && Boolean(selectDeliverable) && (
            <section className="SinglePage SingleProject main">
              <div className="SinglePage__Container SinglePage__Container top">
                <BackBtn />
                <div className="SinglePage__InnerContainer Title__Container">
                  <h2 className="SinglePage__Title SinglePage__ItemName">
                    <CustomLink to={`/myprojects/${selectProject.id}`}>
                      {`${selectProject.name} | `}
                    </CustomLink>
                    {selectDeliverable.name}
                  </h2>
                  <div className="SinglePage__Ctrl-Btns">
                    <EditBtn
                      className="SinglePage__Ctrl-Btn"
                      path={`/myprojects/${selectProject.id}/edit/${selectDeliverable.id}`}
                    />
                    <DeleteBtn
                      className="SinglePage__Ctrl-Btn"
                      action={deleteDeliverable({ projectId, deliverableId })}
                      status={statusDeleteDeliverable}
                    />
                  </div>
                </div>
                <div className="SinglePage__InnerContainer">
                  <div className="SinglePage__Description">
                    <h3>Description:</h3>
                    <p>{selectDeliverable.description}</p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default SingleDeliverable;
