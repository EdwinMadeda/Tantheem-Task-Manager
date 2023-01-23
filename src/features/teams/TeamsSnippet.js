import { Link } from "react-router-dom";

const TeamsSnippet = ({teams}) => {

  return (
    <div className="Teams__Snippet">
        <p className="Teams__Snippet-title">My Teams</p>
        <ul className="Teams__Snippet-items">
            {teams.map(team => (
               <li key={team.id} className="Teams__Snippet-item">
                  <p className="Teams__Snippet-itemName">
                     <Link to={`/teams/${team.id}`}>{team.name}</Link>
                  </p>
                  <p className="Teams__Tasks__Data">
                     <span>13 Tasks</span>
                     <span>1 Due Soon</span>
                     <span>7 Remains</span>
                  </p>
               </li>
            ))}
        </ul>
    </div>
  )
}

export default TeamsSnippet