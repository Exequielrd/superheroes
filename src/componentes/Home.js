import axios from "axios"
import React, { useEffect, useReducer, useState } from "react"
import "../styles/Home.css"
import SearchHero from "./SearchHero"
import Team from "./Team"

const Home = () => {
  const [id, setId] = useState(680)
  const [superhero, setSuperhero] = useState("")

  // Reducer for handle the team
  const initialState = []

  function reducer(state, action) {
    switch (action.type) {
      case "ADDHERO":
        return [...state, { hero: action.payload }]
      case "DELETEHERO":
        return [state.filter((hero) => hero.id !== action.payload.id)]
      default:
        return state
    }
  }
  const [team, dispatch] = useReducer(reducer, initialState)

  console.log(superhero)
  useEffect(() => {
    axios
      .get(`https://superheroapi.com/api/2979053042377754/${id}`)
      .then((res) => {
        setSuperhero(res.data)
      })
  }, [id])

  return (
    <div className="container-fluid">
      <Team team={team} />
      <SearchHero />
    </div>
  )
}

export default Home
