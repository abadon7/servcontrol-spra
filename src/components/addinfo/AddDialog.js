import React, { useContext, useState } from "react";
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

const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "10ch"
        }
    },
    inputW90: {
        width: "95% !important"
    },
    thinInput: {
        "& input": {
            paddingTop: 14,
            paddingBottom: 14
        }
    },
    width16ch: {
        width: "16ch !important"
    }
}));

export default function AddDialog(props) {
    //const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const {
        showAdd,
        setShowAdd,
        //dataRValues,
        //collectData,
        pushData,
        dataUser
    } = useContext(UserContext);

    //    const handleClickOpen = () => {
    //        setOpen(true);
    //    };
    //
    const handleClose = () => {
        //setOpen(false);
        //        props.openclose();
        setShowAdd(false);
    };
    //const inputDate = dataRValues.date;
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        console.log("checking or unchecking " + value);
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        //if (currentIndex === -1) {
        //    newChecked.push(value);
        //    addEst(value);
        //} else {
        //    newChecked.splice(currentIndex, 1);
        //    rmEst(value);
        //}
        //setChecked(newChecked);
        if (checkEst(value)) {
            console.log("Adding Checkbox");
            addEst(value);
        } else {
            console.log("Removing Checbox");
            rmEst(value);
        }
        //return true
    };
    const dateNow = new Date();
    const getISODate = date => {
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
        year: dateNow.getFullYear()
    };
    const [dataRValues, setDataRValues] = useState(initialDataValues);

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
                month: cloneDate.getMonth() + 1
            });
            return true;
        }
        setDataRValues({
            ...dataRValues,
            [keyName]: value
        });
    };
    const handlenChange = event => {
        let value = event.target.value;
        let name = event.target.name;
        console.log(event.target.value);
        console.log(event.target.name);
        collectData(value, name);
    };

    const pushRnames = () => {
        let rname = document.getElementById("return_v");
        console.log(`Sending ${rname}`);
        let rvnameClone = dataRValues.rvnames;
        rvnameClone.push({ name: rname.value, study: 0 });
        //rnamesChange(rname.value);
        //setTestRvNames([...testRvNames, {name:rname.value, study:0}]);
        updateRr();
        rname.value = "";
    };
    const rmRvNames = value => {
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
    const rmEst = idx => {
        let data = dataRValues.rvnames;
        data[idx].study = 0;
        collectData(data, "rvnames");
        updateEst();
    };
    const addEst = idx => {
        let data = dataRValues.rvnames;
        data[idx].study = 1;
        collectData(data, "rvnames");
        updateEst();
    };
    const checkEst = idx => {
        console.log("Checking study at " + idx);
        return dataRValues.rvnames[idx].study === 0;
    };
    const submitForm = () => {
        resetdataRValues();
        pushData(dataRValues);
    };
    const handlenDateChange = date => {
        console.log(date);
        setDataRValues({
            ...dataRValues,
            horas: decomposeDate(date)
        });
    };
    const decomposeDate = date => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes}`;
    };
    const composeDate = date => {
        const spliDate = date.split(":");
        return new Date(new Date().setHours(spliDate[0], spliDate[1], 0, 0));
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                //open={open}
                open={showAdd}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add a new activity record"}
                </DialogTitle>
                <DialogContent>
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                color="secondary"
                                defaultValue={dataRValues.date}
                                className={[
                                    classes.textField,
                                    classes.width16ch
                                ]}
                                onChange={handlenChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    name: "date"
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
                                defaultValue={dataRValues.pubs}
                                onChange={handlenChange}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    name: "pubs"
                                }}
                                inputProps={{
                                    min: "0"
                                }}
                                variant="outlined"
                            />
                            <TextField
                                id="videos"
                                label="Videos"
                                variant="outlined"
                                color="secondary"
                                onChange={handlenChange}
                                defaultValue={dataRValues.vid}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                InputProps={{
                                    name: "vid"
                                }}
                                inputProps={{
                                    min: "0"
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
                                    InputProps={{
                                        name: "horas"
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <TextField
                                className={classes.inputW90}
                                id="return_v"
                                label="Return Visits"
                                variant="outlined"
                                color="secondary"
                                //onChange={handlenChange}
                                InputProps={{
                                    name: "rr",
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
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <List className={classes.root}>
                                {dataRValues.rvnames.map((rname, idx) => {
                                    const labelId = `checkbox-list-label-${idx}`;
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
                                                        "aria-labelledby": labelId
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                id={labelId}
                                                primary={rname.name}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() =>
                                                        rmRvNames(idx)
                                                    }
                                                >
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                        <div>
                            <Badge
                                badgeContent={dataRValues.est}
                                color="secondary"
                            >
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
                    <Button
                        variant="contained"
                        onClick={submitForm}
                        color="secondary"
                        autoFocus
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
