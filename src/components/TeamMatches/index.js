import {Component} from 'react'
import Loader from 'react-loader-spinner'

/* import LatestMatch from '../LatestMatch' */

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class Home extends Component {
  state = {
    recentMatchList: [],
    initialBannerUrl: '',
    matchesList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getMatchesData()
  }

  getMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()
    const updatedMatches = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    const {teamBannerUrl, latestMatchDetails, recentMatches} = updatedMatches

    const updatedLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }

    const updatedRecentMatches = recentMatches.map(eachMatch => ({
      umpires: eachMatch.umpires,
      result: eachMatch.result,
      manOfTheMatch: eachMatch.man_of_the_match,
      id: eachMatch.id,
      date: eachMatch.date,
      venue: eachMatch.venue,
      competingTeam: eachMatch.competing_team,
      competingTeamLogo: eachMatch.competing_team_logo,
      firstInnings: eachMatch.first_innings,
      secondInnings: eachMatch.second_innings,
      matchStatus: eachMatch.match_status,
    }))

    this.setState({
      initialBannerUrl: teamBannerUrl,
      isLoading: false,
      matchesList: updatedLatestMatchDetails,
      recentMatchList: updatedRecentMatches,
    })
  }

  render() {
    const {
      initialBannerUrl,
      matchesList,
      isLoading,
      recentMatchList,
    } = this.state

    return (
      <div testid="loader">
        <div>
          {isLoading ? (
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          ) : (
            <div className="main-match-container">
              <img
                src={initialBannerUrl}
                alt="team banner"
                className="banner-logo"
              />
              <h1 className="match-head">Latest Matches</h1>
              <LatestMatch matchesList={matchesList} />
              <ul className="recent-card-container">
                {recentMatchList.map(eachTeam => (
                  <MatchCard key={eachTeam.id} recentMatchList={eachTeam} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
