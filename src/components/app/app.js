import React /*{ useState, useEffect }*/ from "react";
import "./app.css";
import HomePage from "../homepage/Homepage";
import Login from "../login/Login";
//import firebase from "../firebase/firebaseInit";
//import Details from '../details/details'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import { CssBaseline, CircularProgress } from '@material-ui/core'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  //  Redirect
} from "react-router-dom";
//import firebase from '../firebase/firebaseInit'
//import UserContext, { dateContext } from "../app/contextData";
//import { auth, provider } from "../firebase/firebaseInit";
//const theme = createMuiTheme()
import PrivateRoute from "../Private/Private";
import { AuthProvider } from "../auth/Auth";

const App = props => {

    return (
        <AuthProvider>
            {/* {userid ? <HomePage></HomePage> : <Login></Login>} */}
            <Router>
                <Switch>
                    <Route exact path="/login">
                        {/*userid ? <Redirect to="/" /> : <Login />*/}
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/">
                        <HomePage />
                    </PrivateRoute>
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
