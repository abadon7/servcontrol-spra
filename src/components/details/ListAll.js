import React from "react";
//import firebase from "../firebase/firebaseInit";
//import { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import UserContext, { dateContext } from "../app/contextData";
//import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: "0"
    },
    thinList: {
        paddingTop: "0",
        paddingBottom: "0"
    },
    avatarList: {
        backgroundColor: "#E91E63"
    }
}));

const ListAll = () => {
    //  const [data, setData] = useState([]);
    const classes = useStyles();
    //let DB_PATH = `control/${localStorage.getItem("PioneerName")}/${this.state.selYear}/${this.state.selMonth}`;
    //
    /*  useEffect(() => {
     let DB_PATH = "control/Henry/2020/1";
    //let DB_PATH = "control"
    const stList = firebase.database().ref(DB_PATH);
    console.log(stList);
    stList.orderByValue().on("value", (snapshot) => {
      console.log("Data");
      const dataArray = [];
      /*  let items = snapshot.val();
                   for (let item in items) {
                       console.log(item);
                   }
      //let keys = snapshot.key
      //console.log(items);
      //console.log(keys);
      snapshot.forEach((el) => {
        dataArray.push(el);
        console.log(el);
      });
      setData(dataArray);

    });
    //return () => stList.off("value");

  }, []);*/

    return (
        // return (
        <div>
            <List className={classes.root}>
                <UserContext.Consumer>
                    {({ data }) =>
                        data.map(item => {
                            //console.log(item)
                            return (
                                <ListItem
                                    key={item.key}
                                    className={classes.thinList}
                                >
                                    <ListItemAvatar>
                                        <Avatar className={classes.avatarList}>
                                            {item.val().day}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={"H: " + item.val().horas}
                                    />
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    R. Visits:
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {item.val().rr}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Studies:
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {item.val().est}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Placements:
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {item.val().pubs}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Videos:
                                                </Typography>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {item.val().vid}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    {/* <ListItemText primary="Studies: 15" secondary="R. Visits: 5"  /> */}
                                    {/* <ListItemText  primary="Placements: 15" secondary="Videos: 5"  /> */}
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })
                    }
                </UserContext.Consumer>
            </List>
        </div>
    );
};

export default ListAll;
