import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
//import Details from '../details/details'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { CssBaseline, CircularProgress } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import UserContext, { dateContext } from "./components/app/contextData";
import { render } from "react-dom";
import firebase, { auth, provider } from "./components/firebase/firebaseInit";
//const theme = createMuiTheme()

class App extends React.Component {
  constructor(props) {
    super(props);

    this.changeUser = () => {
      this.setState((state) => ({
        userid: state.userid === "Henry" ? "Carito" : "Henry",
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      userid: "",
      changeUser: this.changeUser,
      datequery: "Julio/2020",
      goLogin: this.goLogin,
      goHome: this.goHome,
    };
  }
  goLogin = () => {
    let history = useHistory();
    history.push("/login");
  };
  goHome = () => {
    let history = useHistory();
    history.push("/");
  };

  componentDidMount() {
    //let history = useHistory();
    console.log("Checking login");
    auth.onAuthStateChanged((user) => {
      console.log("Loging user");
      if (user) {
        console.log("User found");
        this.setState({
          user,
        });
        this.goLogin();
      } else {
        this.goHome();
      }
    });
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {/* {this.state.userid == "Henry" ?(
					<HomePage></HomePage>
				):(
					<Login></Login>
				)} */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </UserContext.Provider>
    );
  }
}

export default App;
