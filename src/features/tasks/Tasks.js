import { useState} from "react";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./taskSlice";
import AddBtn from "../../reusableComponents/AddBtn";
import girlPhoto from "../../assets/images/girl_photo.png";
import PreviousWorkSnippet from "./PreviousWorkSnippet";
import ToDoSnippet from "./ToDoSnippet";
import "./Tasks.css";

const Tasks = () => {
  const [viewMore, setViewMore] = useState(false);
  const tasks = useSelector(selectAllTasks);
  
  return (
    <section className="Task main">
      <div className="Task__Container top">

        <div className="Task__innerContainer">
          <p className="Task__welcomeMsg">Hello,</p>
          <div className="Task__AddBtn-Container AddBtn-Container">
            <AddBtn label="New Task" path={'/mytasks/add'}/>
          </div>
        </div>

        <div className="Task__img">
          <img src={girlPhoto} alt="girl" />
        </div>
       
      </div>
      <div className="Task__Container bottom">
              <PreviousWorkSnippet 
                  tasks={tasks} 
                  viewMore={viewMore}
                  setViewMore={setViewMore} />
                  
              <ToDoSnippet 
                  tasks={tasks} 
                  viewMore={viewMore}
                  setViewMore={setViewMore} />
      </div>
    </section>
  )
}

export default Tasks