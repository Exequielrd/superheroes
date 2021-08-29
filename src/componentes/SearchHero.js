import axios from "axios"
import { Formik } from "formik"
import React, { useState } from "react"

const SearchHero = () => {
  const [searchByName, setSearchByName] = useState(true)

  return (
    <Formik
      initialValues={{ name: "", id: "" }}
      validate={(values) => {
        const errors = {}
        if (!values.name) {
          errors.name = "Ingresa el nombre de un superheroe"
        }
        if (!values.id) {
          errors.id = "Ingresa un ID valido"
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
              setSubmitting(false)
            })
        }

        if (values.id) {
          setSubmitting(true)
          axios
            .get(`https://superheroapi.com/api/2979053042377754/${values.id}`)
            .then((res) => {
              console.log(res)
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
          {/* Select type of search */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onClick={() => setSearchByName(!searchByName)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Buscar por ID
            </label>
          </div>

          {searchByName ? (
            //NAME SEARCH
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
                  Submit
                </button>
              )}
            </form>
          ) : (
            // ID SEARCH
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  Ingresa un ID
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.id}
                />
                {errors.id && touched.id && errors.id}
              </div>

              {isSubmitting ? (
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-warning">
                  Submit
                </button>
              )}
            </form>
          )}
        </div>
      )}
    </Formik>
  )
}

export default SearchHero
