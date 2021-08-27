import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Login from "./Login"
import Home from "./Home"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

function PrivateRoute({ children, ...rest }) {
  let token = localStorage.getItem("token") || null
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App
