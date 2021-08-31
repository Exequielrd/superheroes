import React from "react"
import "../styles/Team.css"

const Team = ({ team }) => {
  console.log(team)
  return (
    <div className="team_container">
      <h1>Mis Heroes</h1>
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
