import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import ToActionBtn from "../../reusableComponents/ToActionBtn";
import { selectAllTasks } from "./taskSlice";
import CustomLink from "../../reusableComponents/CustomLink";

const Item = ({task})=>{
  return (
      <div className="Item Latest__Item" style={{}}>
          <div className="Content">
            <p>
                <CustomLink
                  className="Title"
                  to={`/mytasks/${task.id}`}>
                    {task.name}
                </CustomLink>
                <span className="Duedate">Due on 22/05/2022</span>
            </p>
            <p className="Description">Do ABCD</p>
          </div>
          {/* <p className="Label">Latest Task</p> */}
      </div>
  )
}

const Ctrl__Btns = (total) =>{
  let content = [];
  for (let count = 0; count < total; count++) 
    content.push(<span className="Ctrl__Btn"></span>)
  return content;
}

const maxItemWidth = 500;
const getItemsPerPage = ()  => Math.floor(window.innerWidth / maxItemWidth);

const LatestTask = () => {
const tasks = useSelector(selectAllTasks);
const tasksCount = tasks.length;
const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
const [ctrlBtnsCount, setCtrlBtnsCount] = useState(tasksCount / itemsPerPage);

  window.addEventListener('resize', ()=>{
     setItemsPerPage(getItemsPerPage());
  })

  useEffect(()=>{
    setCtrlBtnsCount(tasksCount / itemsPerPage);
  },[itemsPerPage, tasksCount]);

  return (
    <div className="Latest Task">
        <ToActionBtn label="My Tasks" linkTo="/mytasks" />
        <div className="Latest__Items" style={{width : `${tasksCount  * (100/itemsPerPage)}%`}}>
          {tasks.map(task => (
              <Item key={task.id} task={task}/>
            ))}
        </div>
        <div className="Ctrl__Btns">
            {Ctrl__Btns(ctrlBtnsCount)}
        </div>
    </div>
  )
}

export default LatestTask