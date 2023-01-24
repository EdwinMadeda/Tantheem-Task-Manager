import CheckBox from "../../reusableComponents/CheckBox";
import ViewMoreBtn from "./ViewMoreBtn";

const PreviousWorkSnippet = ({tasks, viewMore, setViewMore}) => {

  return (
    <div className={`PreviousWork Tasks__Snippet ${viewMore? 'viewMore':''}`}>
        <p className="Tasks__Snippet-title">previous Work</p>
        <ul className="Tasks__Snippet-items Snippet__Type1-Items">
          {tasks.map(task => (
            <li className="Tasks__Snippet-item Snippet__Type1-Item"
                key={task.id}>
                <CheckBox checked={task.isComplete}/>
                <p className="Task__Item-name Snippet__Type1-ItemName">{task.name.substring(0, 20)}...</p>
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