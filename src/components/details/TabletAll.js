import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserContext, { /*dateContext*/ } from "../app/contextData";
//import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from "@material-ui/core/LinearProgress";
//import Avatar from "@material-ui/core/Avatar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DatePicker from "../DatePicker/DatePicker";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: "#E91E63",
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            //backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        // minWidth: 700,
        //    width: "90%"
    },
    container: {
        //        width: "95%",
        margin: "auto",
        maxWidth: 800
    },
    avatarList: {
        // backgroundColor: "#E91E63",
        width: 30,
        height: 30
        //        fontSize: "1"
    },
    smallpadding: {
        padding: 6
    },
    bottomSpace: {
        height: 100
    }
});

export default function TableAll() {
    const classes = useStyles();
    const { pending } = useContext(UserContext);
    let loading;

    if (pending) {
        loading = (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={7}>
                        <LinearProgress />
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    } else {
        loading = "";
    }

    return (
        <div className={classes.container}>
            <DatePicker />
            <TableContainer className={classes.container} component={Paper}>
                <Table
                    className={classes.table}
                    stickyHeader
                    aria-label="sticky table"
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">
                                Day
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Placements
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Videos
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Hours
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Return Visits
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Studies
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {loading}
                    <TableBody>
                        <UserContext.Consumer>
                            {({ data }) =>
                                data.map(item => (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={item.key}
                                    >
                                        <StyledTableCell align="center">
                                            {/*<Avatar className={classes.avatarList}>
                                            {item.val().day}
                                        </Avatar>{" "}*/}
                                            {item.val().day}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {item.val().pubs}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {item.val().vid}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {item.val().horas}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {item.val().rr}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {item.val().est}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <ButtonGroup
                                                disableElevation
                                                color="secondary"
                                                aria-label="outlined secondary button group"
                                            >
                                                <IconButton
                                                    className={
                                                        classes.smallpadding
                                                    }
                                                >
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                    className={
                                                        classes.smallpadding
                                                    }
                                                >
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </ButtonGroup>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </UserContext.Consumer>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
