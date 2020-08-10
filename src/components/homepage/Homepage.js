import React, { useEffect, useState, useContext } from "react";
import UserContext from "../app/contextData";
/* import Button from "@material-ui/core/Button"; */
import MenuAppBar from "../AppBar/appbar";
//import ListAll from "../details/ListAll";
import TableAll from "../details/TabletAll";
import firebase from "../firebase/firebaseInit";
import { AuthContext } from "../auth/Auth";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import AddDialog from "../addinfo/AddDialog";

const useStyles = makeStyles(theme => ({
    fabFixed: {
        position: "fixed",
        bottom: 0,
        right: 0,
        marginRight: 24,
        marginBottom: 24
    },
    bottomSpace: {
        height: 100
    },
    container: {
        //        width: "95%",
        margin: "auto",
        maxWidth: 800
    }
}));

function Homepage(props) {
    // Assign a contextType to read the current theme context.
    // React will find the closest theme Provider above and use its value.
    // In this example, the current theme is "dark".
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(true);
    const [cData, setcData] = useState();

    const { currentUser } = useContext(AuthContext);
    const cDataUserName = currentUser.displayName.split(" ")[0];

    const [dataUser, setDataUser] = useState(cDataUserName);
    const [dateState, setDateState] = React.useState({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });
    const pushData = data => {
        console.log(data);
        let DB_PATH = "control/".concat(
            dataUser,
            "/",
            dateState.year,
            "/",
            dateState.month
        );
        const dataRef = firebase.database().ref(DB_PATH);
        dataRef.push(data);
        //resetdataRValues();
    };
    const [noData, setNoData] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const closeAdd = () => {
        console.log("Closing Add");
        setShowAdd(false);
    };
    const openAdd = () => {
        console.log("Opening Add");
        console.log(showAdd);
        setShowAdd(true);
        console.log(showAdd);
    };

    console.log("INIT");
    useEffect(() => {
        console.log("Something is happening");
        console.log("Checking login");
        console.log(dataUser);
        //let DB_PATH = "control/Henry/2020/1";
        let DB_PATH = "control/".concat(
            dataUser,
            "/",
            dateState.year,
            "/",
            dateState.month
        );
        console.log(DB_PATH);
        //let DB_PATH = "control"
        const stList = firebase.database().ref(DB_PATH);
        console.log(stList);
        const dataArray = [];
        stList.orderByValue().on("value", snapshot => {
            console.log("Data");
            let dataMap = new Map();
            snapshot.forEach(el => {
                dataArray.push(el);
                console.log(el);
                console.log(el.key);
                //console.log(el.val());
                dataMap.set(el.key, el.val());
            });
            setData(dataArray);
            setcData(dataMap);
            setPending(false);
            if (dataArray.length === 0) {
                console.log("No data");
                setNoData(true);
            } else {
                console.log("data found");
                setNoData(false);
            }
        });
    }, [dataUser, dateState]);

    return (
        <div className={classes.container}>
            <MenuAppBar />
            <UserContext.Provider
                value={{
                    data,
                    pending,
                    setPending,
                    dateState,
                    setDateState,
                    showAdd,
                    setShowAdd,
                    pushData,
                    dataUser
                }}
            >
                <TableAll />

                <div className={!noData && classes.bottomSpace}>
                    <Fab
                        onClick={openAdd}
                        className={classes.fabFixed}
                        color="primary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                    <AddDialog />
                </div>
                {noData && <div>No data found</div>}
            </UserContext.Provider>
        </div>
    );
}
export default Homepage;
