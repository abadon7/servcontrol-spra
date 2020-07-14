import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserContext, { dateContext } from "../app/contextData";

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
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles({
    table: {
        // minWidth: 700,
        //    width: "90%"
    },
    container: {
        width: "90%",
        margin: "auto"
    }
});

export default function TableAll() {
    const classes = useStyles();

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Day</StyledTableCell>
                        <StyledTableCell align="center">
                            Placements
                        </StyledTableCell>
                        <StyledTableCell align="center">Videos</StyledTableCell>
                        <StyledTableCell align="center">Hours</StyledTableCell>
                        <StyledTableCell align="center">
                            Return Visits
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            Studies
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <UserContext.Consumer>
                        {({ data }) =>
                            data.map(item => (
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={item.key}>
                                    <StyledTableCell align="center">
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
                                </StyledTableRow>
                            ))
                        }
                    </UserContext.Consumer>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
