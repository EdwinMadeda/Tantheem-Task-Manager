import CheckBox from "../../ReusableComponents/CheckBox";
import ViewMoreBtn from "./ViewMoreBtn";

const PreviousWorkSnippet = ({tasks, viewMore, setViewMore}) => {

  return (
    <div className={`PreviousWork Tasks__Snippet ${viewMore? 'viewMore':''}`}>
        <p className="Tasks__Snippet-title">previous Work</p>
        <ul className="Tasks__Snippet-items">
          {tasks.map(task => (
            <li className="Tasks__Snippet-item"
                key={task.id}>
                <CheckBox checked={task.isComplete}/>
                <p className="Task__Item-name">{task.name}</p>
            </li>))
          }
        </ul>
        <ViewMoreBtn 
            viewMore={viewMore} 
            setViewMore={setViewMore} 
          />
        
    </div>
  )

}

export default PreviousWorkSnippet