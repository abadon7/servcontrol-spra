import React, { useState, useEffect } from "react";
import "./app.css";
import HomePage from "../homepage/Homepage";
import Login from "../login/Login";
//import Details from '../details/details'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { CssBaseline, CircularProgress } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//import firebase from '../firebase/firebaseInit'
import UserContext, { dateContext } from "../app/contextData";
import { auth, provider } from "../firebase/firebaseInit";
//const theme = createMuiTheme()
function PrivateRoute({ children, ...rest }) {
  return (
    <UserContext.Consumer>
      {({ userid }) => (
        <Route
          {...rest}
          render={({ location }) =>
            userid ? (
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
      )}
    </UserContext.Consumer>
  );
}
const App = (props) => {
  const [userid, setuser] = useState(null);
  const [datequery, setDataQuery] = useState("Julio/2020");
  const [userimage, setuserimage] = useState(null);
  const changeUser = (userdata) => {
    setuser(userdata);
  };
  const changeUserImage = (userimage) => {
    setuserimage(userimage);
  };
  const logout = () => {
    auth.signOut().then(() => {
      changeUser(null);
    });
  };
  const login = (cb) => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user.email;
      const userimage = result.user.photoURL;
      console.log(userimage);
      changeUser(user);
      changeUserImage(userimage);
      setTimeout(cb, 10);
    });
  };
  useEffect(() => {
    console.log("Something is happening");
    console.log("Checking login");
    auth.onAuthStateChanged((user) => {
      console.log("Loging user");
      if (user) {
        console.log(user.photoURL);
        console.log("User found");
        console.log("go to Home");
        const userid = user.email;
        const userimage = user.photoURL
        changeUserImage(userimage)
        changeUser(userid);
      } else {
        console.log("User not found");
        console.log("go to Login");
      }
    });
  },[]);
  return (
    <UserContext.Provider
      value={{ userid, datequery, changeUser, login, logout, userimage  }}
    >
      {/* {userid ? <HomePage></HomePage> : <Login></Login>} */}
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <HomePage />
          </PrivateRoute>
          <Route exact path="/login">
            {userid ? <Redirect to="/" /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
