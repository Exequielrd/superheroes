import React, { useReducer } from "react"
import "../styles/Home.css"
import SearchHero from "./SearchHero"
import Team from "./Team"

const Home = () => {
  // Reducer for handle the team
  const initialState = []

  function reducer(state, action) {
    switch (action.type) {
      case "ADDHERO":
        return [...state, action.payload]
      case "DELETEHERO":
        return [state.filter((hero) => hero.id !== action.payload.id)]
      default:
        return state
    }
  }
  const [team, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="container-fluid ">
      <Team team={team} />
      <SearchHero dispatch={dispatch} team={team} />
    </div>
  )
}

export default Home
