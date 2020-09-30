import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
    totalsContainer: {
        margin: "auto",
        padding: "10px",
        float: "right"
    }
});

const Totals = props => {
    const classes = useStyles();
    console.log(props);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center">Day</TableCell>
                    <TableCell align="center">Placements</TableCell>
                    <TableCell align="center">Videos</TableCell>
                    <TableCell align="center">Hours</TableCell>
                    <TableCell align="center">Return Visits</TableCell>
                    <TableCell align="center">Studies</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
        </Table>
    );
};

export default Totals;
