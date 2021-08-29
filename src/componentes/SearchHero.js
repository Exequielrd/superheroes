import React, { useState } from "react"

const SearchHero = () => {
  const [searchByName, setSearchByName] = useState(true)

  return (
    <div className="search_container">
      <form>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onClick={() => setSearchByName(!searchByName)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Buscar por ID
          </label>
        </div>
        {searchByName ? (
          <div className="mb-3">
            <label htmlFor="Nombre" className="form-label">
              Nombre del Superheroe
            </label>
            <input type="email" className="form-control" id="Nombre" />
          </div>
        ) : (
          <div className="mb-3">
            <label htmlFor="id" className="form-label">
              Buscar por id
            </label>
            <input type="password" className="form-control" id="id" />
          </div>
        )}

        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
    </div>
  )
}

export default SearchHero
