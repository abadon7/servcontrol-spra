import React, { useState, useEffect } from "react";
import "./app.css";
import HomePage from "../homepage/Homepage";
import Login from "../login/Login";
import firebase from "../firebase/firebaseInit";
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
  const [data, setData] = useState([]);
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
        const userimage = user.photoURL;
        changeUserImage(userimage);
        changeUser(userid);
        let DB_PATH = "control/Henry/2020/1";
        //let DB_PATH = "control"
        const stList = firebase.database().ref(DB_PATH);
        console.log(stList);
        stList.orderByValue().on("value", (snapshot) => {
          console.log("Data");
          const dataArray = [];
          /*  let items = snapshot.val();
                   for (let item in items) {
                       console.log(item);
                   } */
          //let keys = snapshot.key
          //console.log(items);
          //console.log(keys);
          snapshot.forEach((el) => {
            dataArray.push(el);
            console.log(el);
          });
          setData(dataArray);
        });
      } else {
        console.log("User not found");
        console.log("go to Login");
      }
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ userid, datequery, changeUser, login, logout, userimage, data }}
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
