import './index.css'

const MatchCard = props => {
  const {recentMatchList} = props
  const {
    result,
    competingTeam,
    competingTeamLogo,
    matchStatus,
  } = recentMatchList
  console.log(matchStatus)
  return (
    <li className="recent-match-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="recent-team-logo"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
