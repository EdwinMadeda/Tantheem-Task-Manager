import studentImg from "../../assets/images/student_photo.png";

import AddBtn from "../../ReusableComponents/AddBtn";
import OrderByBtn from "../../ReusableComponents/OrderByBtn";
import LatestProject from "../projects/LatestProject";

import LatestTask from "../tasks/LatestTask";
import LatestTeam from "../teams/LatestTeam";

import "./Home.css";

const Home = () => {
  return (
    <section className="Home main">
      <div className="Home__Container top">
        <div className="Home__AddBtns">
                <AddBtn label="New Task" onClick={()=> {}}/>
                <AddBtn label="New Project" onClick={()=> {}}/>
                <AddBtn label="New Team" onClick={()=> {}}/>
          </div>
          <div className="Home__Img">
                <img src={studentImg} alt="student"/>
          </div>
        <div className="Home__OrderByBtns">
              <p className="Home__OrderByTitle">Order By</p>
              <OrderByBtn label="Due Date" onClick={()=>{}} />
              <OrderByBtn label="Priority" onClick={()=>{}} />
              <OrderByBtn label="Alphabetically" onClick={()=>{}} />
        </div>
      </div>
      <div className="Home__Container bottom">
        <LatestTask />
        <LatestProject />
        <LatestTeam />
      </div>
    </section>
  )
}

export default Home