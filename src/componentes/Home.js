import { typeParameterDeclaration } from "@babel/types"
import axios from "axios"
import React, { useEffect, useState } from "react"
import "../styles/Home.css"
import Team from "./Team"

const Home = () => {
  const [id, setId] = useState(680)
  const [superhero, setSuperhero] = useState("")
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
      <Team />
    </div>
  )
}

export default Home
