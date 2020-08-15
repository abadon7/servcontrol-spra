import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
/* import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle"; */
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
//import UserContext, { dateContext } from "../app/contextData";
import Logo from "../logo/Logo";
import { AuthContext } from "../auth/Auth";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        padding: "0",
        marginLeft: "12px"
    },
    title: {
        flexGrow: 1
    },
    marginBottom10:{
        marginBottom:10
    }

}));

export default function MenuAppBar() {
    const classes = useStyles();
    //const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { currentUser, /*login,*/ logout } = useContext(AuthContext);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="inherit" elevation={0}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <Logo style={{ fontSize: 40 }} />
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                        Service
                    </Typography>
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    size="small"
                                >
                                    <Avatar alt={currentUser.email} src={currentUser.photoURL} />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right"
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <span>{currentUser.email}</span>
                                    <MenuItem onClick={handleClose}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout(() => handleClose);
                                        }}
                                    >
                                        Sign out
                                    </MenuItem>
                                </Menu>
                            </div>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.marginBottom10}/>
        </div>
    );
}
