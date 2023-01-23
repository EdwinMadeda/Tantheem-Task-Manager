import { useState } from "react";
import Calendar from "react-calendar";
import "./ReactCalendar.css";
import "./Calendar.css";


const MyCalender = () => {
  const [date, setDate] = useState(new Date());
  const Calendar__TagNames = ['Individual','Teams','Overdue','Done'];

  return (
    <section className='Calendar Main'>
       <Calendar className="Calendar__Item" onChange={()=>{}} value={date} />
       <ul className="Calendar__Tags">
          {Calendar__TagNames.map((name, index) => (
                <li className="Calendar__Tag" key={index}>
                    <span className={`Calendar__Indicator ${name}`}></span>
                    <p>{name}</p>
                </li>
          ))}
       </ul>
    </section>
  )
}

export default MyCalender