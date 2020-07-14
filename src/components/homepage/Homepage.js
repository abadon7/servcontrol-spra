import React, { useEffect, useState } from "react";
import UserContext, { dateContext } from "../app/contextData";
/* import Button from "@material-ui/core/Button"; */
import MenuAppBar from "../AppBar/appbar";
import ListAll from "../details/ListAll";
import TableAll from "../details/TabletAll";
import firebase from "../firebase/firebaseInit";

function Homepage(props) {
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("Something is happening");
        console.log("Checking login");
        let DB_PATH = "control/Henry/2020/1";
        //let DB_PATH = "control"
        const stList = firebase.database().ref(DB_PATH);
        console.log(stList);
        stList.orderByValue().on("value", snapshot => {
            console.log("Data");
            const dataArray = [];
            snapshot.forEach(el => {
                dataArray.push(el);
                console.log(el);
            });
            setData(dataArray);
        });
    }, []);

    return (
        <div className="w3-section">
            <MenuAppBar></MenuAppBar>
            <UserContext.Provider
                value={{
                    data
                }}
            >
                <TableAll />
            </UserContext.Provider>
        </div>
    );
}
export default Homepage;
