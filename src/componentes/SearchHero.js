import React, { useState } from "react"
import axios from "axios"
import { Formik } from "formik"
import "../styles/searchHero.css"

const SearchHero = ({ dispatch }) => {
  const [searchData, setSearchData] = useState()

  return (
    <Formik
      initialValues={{ name: "" }}
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
              console.log(res)
              setSearchData(res.data.results)
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
        <div className="search_container">
          {/* NAME SEARCH */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre del Superheroe
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </div>

            {isSubmitting ? (
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <button type="submit" className="btn btn-warning">
                Buscar
              </button>
            )}
          </form>

          <div className="search_result_container">
            {searchData &&
              searchData.map((hero, index) => (
                <div className="card searchHero_card">
                  <img
                    src={hero.image.url}
                    className="card-img-top"
                    alt={hero.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{hero.name}</h5>
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
