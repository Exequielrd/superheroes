import React, { useState } from "react"
import axios from "axios"
import { Formik } from "formik"
import "../styles/SearchHero.css"

const SearchHero = ({ dispatch, team }) => {
  const [searchData, setSearchData] = useState()
  const [error, setError] = useState()
  const IDs = team.map((hero) => hero.id)

  const addHero = (hero) => {
    if (IDs.includes(hero.id)) {
      setError("Ya has agregado a este heroe a tu equipo")
    } else {
      dispatch({
        type: "ADDHERO",
        payload: hero,
      })
    }
  }

  return (
    <Formik
      initialValues={{ name: "", id: "" }}
      validate={(values) => {
        const errors = {}
        if (!values.name) {
          errors.name = "Ingresa el nombre de un superheroe"
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (values.name) {
          setSubmitting(true)
          axios
            .get(
              `https://superheroapi.com/api/2979053042377754/search/${values.name}`
            )
            .then((res) => {
              setSearchData(res.data.results)
              setSubmitting(false)
            })
            .catch((err) => {
              alert(err)
              setSubmitting(false)
            })
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div className="search_container ">
          {/* NAME SEARCH */}
          <form onSubmit={handleSubmit} className="form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre del Superheroe
              </label>
              <div className="d-flex bg-white ">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                ></input>
                {isSubmitting ? (
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <button type="submit" className="btn btn-warning search_btn">
                    Buscar
                  </button>
                )}
              </div>
              {errors.name && touched.name && errors.name}
            </div>
          </form>

          <div className="search_result_container row">
            {searchData &&
              searchData.map((hero) => (
                <div className="card searchHero_card col-sm-3" key={hero.id}>
                  <img
                    src={hero.image.url}
                    className="card-img-top"
                    alt={hero.name}
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
                    <button
                      className="btn btn-warning"
                      onClick={() => addHero(hero)}
                    >
                      Añadir al equipo
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </Formik>
  )
}

export default SearchHero
