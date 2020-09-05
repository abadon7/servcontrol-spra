import React, { useContext /*useState, useEffect*/ } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

function PrivateRoute({ children, ...rest }) {
    //    console.log(argumentos)
    const { currentUser } = useContext(AuthContext);
    //    console.log(userid)
    return (
        <Route
            {...rest}
            render={({ props }) =>
                currentUser ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props }
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute;
