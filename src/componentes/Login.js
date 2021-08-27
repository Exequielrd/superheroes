import React, { useState } from "react"
import "../styles/Login.css"
import logo from "../images/logo.png"
import { Formik } from "formik"
import axios from "axios"

const Login = () => {
  const [submitError, setSubmitError] = useState()

  return (
    <div className="login_container">
      <img src={logo} alt="" className="login_logo" />
      {submitError && (
        <div className="alert alert-danger" role="alert">
          ¡Email o contraseña incorrectos!
        </div>
      )}

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {}
          if (!values.email) {
            errors.email = "Ingrese un email"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "El email es invalido"
          }

          if (!values.password) {
            errors.password = "Ingrese una contraseña"
          }

          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true)
          axios
            .post("http://challenge-react.alkemy.org/", {
              email: values.email,
              password: values.password,
            })
            .then((response) => {
              localStorage.setItem("token", response.data.token)
              setSubmitting(false)
            })
            .catch((err) => {
              setSubmitError(err)
              setSubmitting(false)
              setTimeout(() => setSubmitError(null), 3000)
            })
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
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              {/* Email errors */}
              <span className="errors">
                {errors.email && touched.email && errors.email}
              </span>
            </div>

            {/* Password input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              {/* Password errors */}
              <span className="errors">
                {errors.password && touched.password && errors.password}
              </span>
            </div>

            {isSubmitting ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border text-warning " role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <button type="submit" className="btn btn-warning btn-lg">
                Submit
              </button>
            )}
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login
