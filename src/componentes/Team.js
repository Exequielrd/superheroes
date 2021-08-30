import React from "react"
import "../styles/Team.css"

const Team = ({ team }) => {
  console.log(team)
  return (
    <div className="team_container">
      {team["id"] &&
        team.map((hero) => (
          <div className="card">
            <h2>{hero.name}</h2>
            <img
              src={hero.image.url}
              alt={hero.name}
              className="card-img-top"
            />
            <div className="card-boddy">
              <h3 className="card-title">Stats</h3>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Team
