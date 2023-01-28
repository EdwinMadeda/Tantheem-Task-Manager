import studentImg from "../../assets/images/student_photo.png";

import AddBtn from "../../reusableComponents/AddBtn";
import OrderByBtnsWrapper from "../../reusableComponents/OrderByBtnsWrapper";


import RecentTasks from "../tasks/RecentTasks";

import "./Home.css";

const Home = () => {
  return (
    <section className="Home main">
      <div className="Home__Container top">
        <div className="Home__AddBtns">
                <AddBtn label="New Task" path="/mytasks/add"/>
                <AddBtn label="New Project" path="/myprojects/add"/>
                <AddBtn label="New Team" path="/teams/add"/>
          </div>
          <div className="Home__Img">
                <img src={studentImg} alt="student"/>
          </div>
          <OrderByBtnsWrapper 
              onDueDateClick={()=>{}}
              onPriorityClick={()=>{}}
              onAlphabeticallyClick={()=>{}}
          />
      </div>
      <div className="Home__Container bottom">
        <RecentTasks />
      </div>
    </section>
  )
}

export default Home