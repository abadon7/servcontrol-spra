import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import UserContext, { dateContext } from "../app/contextData";
import IconButton from "@material-ui/core/IconButton";

function DialogMenuSimple(props) {
  const { onClose, open, uiserid } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={false}
      fullScreen={false}
    >
      <DialogTitle id="simple-dialog-title">{uiserid}</DialogTitle>
    </Dialog>
  );
}

DialogMenuSimple.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function DialogMenu() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <UserContext.Consumer>
    {({ userid, userimage, logout }) => (
    <div>    
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClickOpen}
        color="inherit"
      >
        <Avatar alt={userid} src={userimage}/>
      </IconButton>
      <DialogMenuSimple open={open} onClose={handleClose} uiserid={userid} />
    </div>
    )}
    </UserContext.Consumer>
  );
}
