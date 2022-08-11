//@pflow
//
import React, { useCallback, useEffect, useState, useContext } from "react";
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
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  fabFixed: {
    position: "fixed",
    bottom: 0,
    right: 0,
    marginRight: 24,
    marginBottom: 24,
  },
  bottomSpace: {
    height: 100,
  },
  container: {
    //        width: "95%",
    margin: "auto",
    maxWidth: 800,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 200,
    color: "#fff",
  },
}));

function Homepage() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [cData, setcData] = useState(new Map());
  const [rrDataNames, setRrDataNames] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const cDataUserName = currentUser.displayName.split(" ")[0];

  const [dataUser /*setDataUser*/] = useState(cDataUserName);
  const [dateState, setDateState] = React.useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [dialogProps, setDialogProps] = useState({
    data: "",
    action: "add",
    key: "",
  });

  const params = useParams();
  console.log(params);

  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const getUser = useCallback(() => {
    let user = dataUser;
    if (typeof params.name !== "undefined") {
      user = params.name.charAt(0).toUpperCase() + params.name.slice(1);
    }
    return user;
  }, [dataUser, params.name]);

  const getDbPath = useCallback(() => {
    //let user = dataUser;
    //if (typeof params.name !== "undefined") {
    // user = params.name.charAt(0).toUpperCase() + params.name.slice(1);
    //}
    return `control/${getUser()}/${dateState.year}/${dateState.month}`;
  }, [dateState.month, dateState.year, getUser]);

  const pushData = (data) => {
    console.log(data);
    setOpenBackdrop(true);
    //let DB_PATH = `control/${dataUser}/${dateState.year}/${dateState.month}`;
    let DB_PATH = getDbPath();
    const dataRef = firebase.database().ref(DB_PATH);
    dataRef.push(data).then((result) => {
      console.log(result);
      setOpenBackdrop(false);
      setOpenSuccess(true);
      closeAdd();
    });
    //resetdataRValues();
  };

  const delData = (key) => () => {
    console.log("Deleting Item");
    const DB_PATH = `${getDbPath()}/${key}`;
    console.log(DB_PATH);
    const dataRef = firebase.database().ref(DB_PATH);
    if (window.confirm("Do you want to delete this item?")) {
      dataRef.remove();
    }
  };

  const updateData = (key, data) => {
    console.log("Updating Item");
    console.log(data);
    setOpenBackdrop(true);
    const DB_PATH = `${getDbPath()}/${key}`;
    const dataRef = firebase.database().ref(DB_PATH);
    dataRef.update(data).then(() => {
      console.log(`Item ${key} has been updated`);
      setOpenBackdrop(false);
      setOpenSuccess(true);
      closeAdd();
    });
  };

  const updateDataForm = (key) => () => {
    console.log("Updating item");
    console.log(key);
    const itemData: Object = cData.get(key);
    if (itemData == null) {
      throw new Error("Key not found");
    }
    setDialogProps({
      ...dialogProps,
      action: "update",
      data: itemData,
      key: key,
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
      ...dialogProps,
      action: "add",
      data: "",
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
    //let DB_PATH = `control/${dataUser}/${dateState.year}/${dateState.month}`;
    let DB_PATH = getDbPath();
    console.log(DB_PATH);
    //let DB_PATH = "control"
    const stList = firebase.database().ref(DB_PATH);
    console.log(stList);
    //stList.orderByValue().on("value", (snapshot) => {
    stList.orderByChild("day").on("value", (snapshot) => {
      console.log("Data");
      const dataArray = [];
      const dataRvNames = [];
      const tempDataRvNames = {};
      let dataMap: Map<string, Object> = new Map();
      snapshot.forEach((el) => {
        dataArray.push(el);
        console.log(el);
        console.log(el.key);
        //console.log(el.val());
        dataMap.set(el.key, el.val());
        el.val().rvnames.forEach((el2) => {
          if (!tempDataRvNames[el2.name.trim()]) {
            tempDataRvNames[el2.name.trim()] = el2;
            dataRvNames.push(el2);
          }
        });
      });
      console.log(dataRvNames);
      setData(dataArray);
      setcData(dataMap);
      setPending(false);
      setRrDataNames(dataRvNames);
      if (dataArray.length === 0) {
        console.log("No data");
        setNoData(true);
      } else {
        console.log("data found");
        setNoData(false);
      }
    });
  }, [dataUser, dateState, getDbPath]);

  return (
    <div className={classes.container}>
      <MenuAppBar />
      <UserContext.Provider
        value={{
          data,
          rrDataNames,
          pending,
          setPending,
          dateState,
          setDateState,
          showAdd,
          closeAdd,
          //setShowAdd,
          pushData,
          dataUser,
          user: getUser(),
          delData,
          updateDataForm,
          updateData,
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
            itemKey={dialogProps.key}
          />
        </div>
        {noData && <div>No data found</div>}
        <div>
          <span>V: 08-05-2022.1</span>
        </div>
      </UserContext.Provider>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSuccessClose}
          severity="success"
        >
          The info has been saved successfully
        </MuiAlert>
      </Snackbar>
      <Backdrop
        className={classes.backdrop}
        open={openBackdrop}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Homepage;
