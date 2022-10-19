import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getCardData()
  }

  getCardData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const updatedData = teams.map(eachData => ({
      id: eachData.id,
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
    }))

    this.setState({teamList: updatedData, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state

    return (
      <div testid="loader">
        <div className="main-ipl-container">
          <div className="ipl-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
          ) : (
            <ul className="card-container">
              {teamList.map(eachTeam => (
                <TeamCard key={eachTeam.id} teamList={eachTeam} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
