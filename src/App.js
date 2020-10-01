import React /*{ useState, useEffect }*/ from "react";
import "./App.css";
import HomePage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
//import firebase from "../firebase/firebaseInit";
//import Details from '../details/details'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { CssBaseline, CircularProgress } from '@material-ui/core'
import {
    HashRouter as Router,
    Switch,
    Route
    //  Redirect
} from "react-router-dom";
//import firebase from '../firebase/firebaseInit'
//import UserContext, { dateContext } from "../app/contextData";
//import { auth, provider } from "../firebase/firebaseInit";
//const theme = createMuiTheme()
import PrivateRoute from "./components/Private/Private";
import { AuthProvider } from "./components/auth/Auth";

const App = props => {
    const NoMatch = () => <h1>404 Not Found</h1>;
    return (
        <Router>
            <Switch>
                <AuthProvider>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/">
                        <HomePage />
                    </PrivateRoute>
                </AuthProvider>
                <Route component={NoMatch} />
            </Switch>
        </Router>
    );
};

export default App;
