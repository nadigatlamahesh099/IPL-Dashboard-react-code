import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamList} = props
  const {id, name, teamImageUrl} = teamList
  return (
    <Link to={`/team-matches/${id}`} className="ipl-card-link">
      <li className="card-item-container">
        <img src={teamImageUrl} alt={name} className="ipl-logo" />
        <p className="ipl-head">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
