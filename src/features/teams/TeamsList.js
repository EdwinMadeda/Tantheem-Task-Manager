import { useSelector } from 'react-redux';
import { selectAllTeams } from './teamsSlice';

const TeamsList = () => {
    const teams = useSelector(selectAllTeams);
    const TeamItems = teams.map(team => (
        <li key={team.id}>{team.name}</li>
    ));
  
    return (
      <section>
          <p>My teams</p>
          <ul>
             {TeamItems}
          </ul>
      </section>
    )
}

export default TeamsList