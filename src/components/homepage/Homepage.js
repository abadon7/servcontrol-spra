import React from "react";
import UserContext, { dateContext } from "../app/contextData";
/* import Button from "@material-ui/core/Button"; */
import MenuAppBar from "../AppBar/appbar";
import ListAll from "../details/ListAll";
function Homepage(props) {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <UserContext.Consumer>
      {({ userid, datequery, logout }) => (
        <div className="w3-section">
          <MenuAppBar></MenuAppBar>|
          <p>
            Welcome {userid} in {datequery}
          </p>
          <ListAll/>
        </div>
      )}
    </UserContext.Consumer>
  );
}
export default Homepage;
