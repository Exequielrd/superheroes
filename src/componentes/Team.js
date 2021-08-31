import React, { useEffect } from "react"
import "../styles/Team.css"

const Team = ({ team }) => {
  const powerstats = team.map((hero) => Object.entries(hero.powerstats))
  const flated = powerstats.flat()
  const teamstats = {}

  flated.forEach((arr) => {
    if (arr[0] in teamstats) {
      teamstats[arr[0]] += parseInt(arr[1])
    } else {
      teamstats[arr[0]] = parseInt(arr[1])
    }
  })

  const helper = Object.values(teamstats).sort((a, b) => b - a)

  const speciality = {}
  for (let stat in teamstats) {
    if (teamstats[stat] === helper[0]) {
      speciality[teamstats[stat]] = stat
    }
  }
  console.log(speciality)

  return (
    <div className="team_container">
      <h1>Mis Heroes</h1>
      <h2>Especialidad: {speciality[helper[0]]}</h2>
      {
        <ul className="team_stats">
          <li>IQ: {teamstats.intelligence || 0}</li>
          <li>ST: {teamstats.strength || 0}</li>
          <li>DB: {teamstats.durability || 0}</li>
          <li>SP: {teamstats.speed || 0}</li>
          <li>PW: {teamstats.power || 0}</li>
          <li>CT: {teamstats.combat || 0}</li>
        </ul>
      }
      {team &&
        team.map((hero) => (
          <div className="team_card" key={hero.id}>
            <img
              src={hero.image.url}
              alt={hero.name}
              className="card-img-top"
            />
            <div className="card-boddy">
              <h2 className="card-title">{hero.name}</h2>
              <ul className="powerstats">
                <li>Intelligence: {hero.powerstats.intelligence}</li>
                <li>Strength: {hero.powerstats.strength}</li>
                <li>Durability: {hero.powerstats.durability}</li>
                <li>Speed: {hero.powerstats.speed}</li>

                <li>Power: {hero.powerstats.power}</li>
                <li>Combat: {hero.powerstats.combat}</li>
              </ul>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Team
