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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

    const [dataUser /*setDataUser*/] = useState(cDataUserName);
    const [dateState, setDateState] = React.useState({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });
    const [dialogProps, setDialogProps] = useState({
        data: "",
        action: "add"
    });
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const handleSuccessClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
    };

    const getDbPath = () => {
        return `control/${dataUser}/${dateState.year}/${dateState.month}`;
    };

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
        dataRef.push(data).then((result)=>{
            console.log(result);
            setOpenSuccess(true);
        });
        //resetdataRValues();
    };

    const delData = key => () => {
        console.log("Deleting Item");
        const DB_PATH = `${getDbPath()}/${key}`;
        console.log(DB_PATH);
        const dataRef = firebase.database().ref(DB_PATH);
        dataRef.remove();
    };
    const updateData = key => () => {
        console.log("Updating item");
        console.log(key);
        const itemData = cData.get(key);
        setDialogProps({
            ...dialogProps,
            action: "update",
            data: itemData
        });
        console.log(itemData);
        openAdd();
    };

    const [noData, setNoData] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const closeAdd = () => {
        console.log("Closing Add");
        setShowAdd(false);
        setDialogProps({
            ...setDialogProps,
            action: "add",
            data: ""
        });
    };
    const openAdd = () => {
        console.log("Opening Add");
        console.log(showAdd);
        setShowAdd(true);
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
        stList.orderByValue().on("value", snapshot => {
            console.log("Data");
            const dataArray = [];
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
                    closeAdd,
                    //setShowAdd,
                    pushData,
                    dataUser,
                    delData,
                    updateData
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
                    <AddDialog
                        action={dialogProps.action}
                        data={dialogProps.data}
                    />
                </div>
                {noData && <div>No data found</div>}
            </UserContext.Provider>
            <Snackbar
                open={openSuccess}
                autoHideDuration={6000}
                onClose={handleSuccessClose}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSuccessClose} severity="success">
                    The info has been saved successfully
                </MuiAlert>
            </Snackbar>
        </div>
    );
}
export default Homepage;
