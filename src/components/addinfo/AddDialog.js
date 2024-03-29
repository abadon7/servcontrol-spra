import React, { useContext, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import UserContext from "../app/contextData";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Badge from "@material-ui/core/Badge";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import MomentUtils from '@date-io/moment';
import Autocomplete from "@material-ui/lab/Autocomplete";
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "10ch",
    },
  },
  inputW90: {
    width: "95% !important",
  },
  thinInput: {
    "& input": {
      paddingTop: 14,
      paddingBottom: 14,
    },
  },
  width16ch: {
    width: "16ch !important",
  },
}));

export default function AddDialog(props) {
  //const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    showAdd,
    //setShowAdd,
    //dataRValues,
    //collectData,
    pushData,
    dataUser,
    closeAdd,
    updateData,
    rrDataNames,
  } = useContext(UserContext);
  const [errors, setErrors] = React.useState({});

  const [touched, setTouched] = React.useState({});

  //    const handleClickOpen = () => {
  //        setOpen(true);
  //    };
  //
  const handleClose = () => {
    //setOpen(false);
    //        props.openclose();
    //setShowAdd(false);
    closeAdd();
    if (props.action === "update") {
      resetdataRValues();
    }
  };
  //const inputDate = dataRValues.date;
  const classes = useStyles();
  //const [checked, /*setChecked*/] = React.useState([]);

  const handleToggle = (value) => () => {
    console.log("checking or unchecking " + value);
    //const currentIndex = checked.indexOf(value);
    //const newChecked = [...checked];

    //if (currentIndex === -1) {
    //    newChecked.push(value);
    //    addEst(value);
    //} else {
    //    newChecked.splice(currentIndex, 1);
    //    rmEst(value);
    //}
    //setChecked(newChecked);
    console.log(chkIfStudent(getStName(value)));
    if (!chkIfStudent(getStName(value))) {
      if (checkEst(value)) {
        console.log("Adding Checkbox");
        addEst(value);
      } else {
        console.log("Removing Checbox");
        rmEst(value);
      }
    } else {
      alert("This RR is already marked as student");
    }
    //return true
  };

  const chkIfStudent = (n) => {
    console.log("Cehcking student name " + n);
    const student = rrDataNames.find(
      (student) => student.name.trim() === n.trim()
    );
    if (student !== undefined) {
      return student.study === 1;
    }
    return false;
  };

  const dateNow = new Date();
  const getISODate = (date) => {
    const formatDate = new Date(date);
    return new Date(
      formatDate.getTime() - formatDate.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
  };

  const initialDataValues = {
    date: getISODate(dateNow),
    day: dateNow.getDate(),
    est: 0,
    //horas: new Date(new Date().setHours(0,0,0,0)),
    horas: "00:00",
    month: dateNow.getMonth() + 1,
    pubs: 0,
    rr: 0,
    rvnames: [],
    user: dataUser,
    vid: 0,
    weekday: dateNow.getDay(),
    year: dateNow.getFullYear(),
  };

  const [dataRValues, setDataRValues] = useState(initialDataValues);

  useEffect(() => {
    console.log(props.action);
    if (props.action === "update") {
      setDataRValues(props.data);
    }
  }, [props.action, props.data]);

  const resetdataRValues = () => {
    setDataRValues(initialDataValues);
  };
  const collectData = (value, keyName) => {
    console.log(`updating ${keyName} with ${value}`);
    if (keyName === "date") {
      let reFormatDate = value.split("-").join("/");
      let cloneDate = new Date(reFormatDate);
      setDataRValues({
        ...dataRValues,
        [keyName]: value,
        day: cloneDate.getDate(),
        weekday: cloneDate.getDay(),
        year: cloneDate.getFullYear(),
        month: cloneDate.getMonth() + 1,
      });
      return true;
    }
    setDataRValues({
      ...dataRValues,
      [keyName]: value,
    });
  };
  const handlenChange = (event) => {
    //      let value = event.target.value;
    //        let name = event.target.name;
    console.log(event.target.value);
    console.log(event.target.name);
    const { name, value: newValue, type } = event.target;
    // keep number fields as numbers
    const value = type === "number" ? +newValue : newValue;
    console.log(name);
    console.log(value);
    collectData(value, name);
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const dateInputValidation = (fieldValue) => {
    console.log(`validating ${fieldValue}`);
    if (fieldValue.trim() === "00:00" || fieldValue.trim() === "0:0") {
      console.log("No time");
      return false;
    }
    return true;
  };
  const validate = {
    horas: dateInputValidation,
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;
    // check for a new error
    const error = validate[name](value);
    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      //...(error && { [name]: touched[name] && error })
      ...(error && { [name]: error }),
    });
  };

  const pushRnames = () => {
    let rname = document.getElementById("return_v");
    console.log(`Sending ${rname.value}`);
    // if (rname.value.trim() === "") {
    //   return alert("Please write a name");
    // }
    let rvnameClone = dataRValues.rvnames;
    rvnameClone.push({ name: rname.value, study: 0 });
    //rnamesChange(rname.value);
    //setTestRvNames([...testRvNames, {name:rname.value, study:0}]);
    updateRr();
    rname.value = "";
  };

  const rmRvNames = (value) => {
    console.log(`remove ${value}`);
    let rnameData = dataRValues.rvnames;
    if (rnameData[value].study === 1) {
      handleToggle(value)();
    }
    rnameData.splice(value, 1);
    updateRr();
    updateEst();
  };
  const updateRr = () => {
    let rrData = dataRValues.rvnames.length;
    collectData(rrData, "rr");
  };
  const updateEst = () => {
    let estData = dataRValues.rvnames.reduce((a, b) => a + b["study"], 0);
    collectData(estData, "est");
  };
  const rmEst = (idx) => {
    let data = dataRValues.rvnames;
    data[idx].study = 0;
    collectData(data, "rvnames");
    updateEst();
  };

  const addEst = (idx) => {
    let data = dataRValues.rvnames;
    data[idx].study = 1;
    collectData(data, "rvnames");
    updateEst();
  };

  const checkEst = (idx) => {
    console.log("Checking study at " + idx);
    return dataRValues.rvnames[idx].study === 0;
  };

  const getStName = (idx) => {
    console.log("Getting name for " + idx);
    return dataRValues.rvnames[idx].name;
  };

  const checkRvnames = () => {
    if (dataRValues.rvnames.length === 0) {
      pushRnames();
    }
  };

  const submitForm = () => {
    if (dateInputValidation(dataRValues.horas)) {
      setErrors({
        ...errors,
        horas: false,
      });
      checkRvnames();
      pushData(dataRValues);
      resetdataRValues();
    } else {
      alert("Please add the time");
      setErrors({
        ...errors,
        horas: true,
      });
    }
  };

  const submitFormUpdate = () => {
    if (dateInputValidation(dataRValues.horas)) {
      setErrors({
        ...errors,
        horas: false,
      });
      checkRvnames();
      updateData(props.itemKey, dataRValues);
    } else {
      alert("Please add the time");
      setErrors({
        ...errors,
        horas: true,
      });
    }
  };

  const handlenDateChange = (date) => {
    console.log(date);
    setDataRValues({
      ...dataRValues,
      horas: decomposeDate(date),
    });
  };

  const decomposeDate = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const composeDate = (date) => {
    const spliDate = date.split(":");
    return new Date(new Date().setHours(spliDate[0], spliDate[1], 0, 0));
  };

  //const [returnvValue, setReturnvValue] = React.useState(rrDataNames);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        //open={open}
        open={showAdd}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        transitionDuration={0}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add or update an activity record"}
        </DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="date"
                label="Date"
                type="date"
                color="secondary"
                //defaultValue={dataRValues.date}
                value={dataRValues.date}
                className={[classes.textField, classes.width16ch]}
                onChange={handlenChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  name: "date",
                }}
              />
            </div>
            <div>
              <TextField
                id="placements"
                label="Placements"
                type="number"
                color="secondary"
                placeholder="0"
                //defaultValue={dataRValues.pubs}
                value={dataRValues.pubs}
                onChange={handlenChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  name: "pubs",
                }}
                inputProps={{
                  min: "0",
                }}
                variant="outlined"
              />
              <TextField
                id="videos"
                label="Videos"
                variant="outlined"
                color="secondary"
                onChange={handlenChange}
                //defaultValue={dataRValues.vid}
                value={dataRValues.vid}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  name: "vid",
                }}
                inputProps={{
                  min: "0",
                }}
                type="number"
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  required
                  clearable
                  ampm={false}
                  label="Hours"
                  inputVariant="filled"
                  value={composeDate(dataRValues.horas)}
                  onChange={handlenDateChange}
                  onBlur={handleBlur}
                  InputProps={{
                    name: "horas",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div>
              <Autocomplete
                id="return_v"
                freeSolo
                //clearOnBlur
                //value={rrDataNames}
                //options={rrDataNames.map((option) => option.name)}
                options={rrDataNames}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.inputW90}
                    id="return_v"
                    label="Return Visits"
                    variant="outlined"
                    color="secondary"
                    //onChange={handlenChange}
                    InputProps={{
                      name: "rr",
                      type: "search",
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        </>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={pushRnames}
                          >
                            ADD
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <div>
              <List className={classes.root}>
                {dataRValues.rvnames !== "" &&
                  dataRValues.rvnames
                    .filter((rname) => rname.name !== "")
                    .map((rname, idx) => {
                      const labelId = `checkbox-list-label-${idx}`;
                      //if (rname.name !== "") {
                      return (
                        <ListItem
                          key={idx}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(idx)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={
                                //checked.indexOf(idx) !==
                                //-1
                                rname.study === 1
                              }
                              tabIndex={-1}
                              disableRipple
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={rname.name} />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => rmRvNames(idx)}
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                      //}
                    })}
              </List>
            </div>
            <div>
              <Badge badgeContent={dataRValues.est} color="secondary">
                <LocalLibraryOutlinedIcon />
              </Badge>
            </div>
          </form>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          {props.action === "update" ? (
            <Button
              variant="contained"
              onClick={submitFormUpdate}
              color="secondary"
              autoFocus
            >
              UPDATE
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={submitForm}
              color="secondary"
              autoFocus
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
