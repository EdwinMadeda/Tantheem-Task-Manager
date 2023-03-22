import { FaPen } from 'react-icons/fa';
import './signInSignUp.css';

const SignInSignUp = (props) => {
  return (
    <section className="SignInSignUp main">
      <div className="SignInSignUp__Container SignInSignUp__Form__Wrapper">
        {props.children}
      </div>
      <div className="SignInSignUp__Container SignInSignUp__Intro__Wrapper">
        <div className="SignInSignUp__Intro">
          <h1 className="SignInSignUp__Intro_AppName">Tantheme</h1>
          <ul className="SignInSignUp__Intro__Contents">
            <li>
              <h2>
                <span className="listIcon"></span>Create tasks
              </h2>
              <p>For daily tasks, personal projects, team management</p>
            </li>
            <li>
              <h2>
                <span className="listIcon"></span>Collaborate with your team
              </h2>
              <p>For daily tasks, personal projects, team management</p>
            </li>
            <li>
              <h2>
                <span className="listIcon"></span>Check the timeline in Calender
              </h2>
              <p>Keep your eyes on your schedule</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="SignInSignUp__Indicator">
        <FaPen className="SignInSignUp__Indicator_Icon" />
      </div>

      <div className="Page-ClipArt top-right"></div>
      <div className="Page-ClipArt bottom-left"></div>
    </section>
  );
};
export default SignInSignUp;
