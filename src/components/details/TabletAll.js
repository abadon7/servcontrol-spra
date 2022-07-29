import React, { useContext, useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UserContext /*dateContext*/ from "../app/contextData";
//import Skeleton from '@material-ui/lab/Skeleton';
import LinearProgress from "@material-ui/core/LinearProgress";
//import Avatar from "@material-ui/core/Avatar";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
//import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DatePicker from "../DatePicker/DatePicker";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#E91E63",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      //backgroundColor: theme.palette.action.hover
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
    //    width: "90%"
  },
  container: {
    //        width: "95%",
    margin: "auto",
    maxWidth: 800,
  },
  avatarList: {
    // backgroundColor: "#E91E63",
    width: 30,
    height: 30,
    //        fontSize: "1"
  },
  smallpadding: {
    padding: 6,
  },
  bottomSpace: {
    height: 100,
  },
  title: {
    flexGrow: 1,
    marginLeft: "10vw",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function TableAll() {
  const classes = useStyles();

  const { pending, delData, updateDataForm, data, user } =
    useContext(UserContext);

  const [totalData, setTotalData] = useState({ p: 0, v: 0, h: 0, r: 0, s: 0 });

  let loading;
  const getDayName = (dateStr) => {
    var date = new Date(dateStr + ":05:00:00");
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const [popContex, setPopContex] = React.useState({
    popId: "",
    anchorEl: null,
  });

  const handleClick2 = (event, id) => {
    console.log(event.currentTarget.id);
    setPopContex({ popId: id, anchorEl: event.currentTarget });
  };

  const handleClose2 = () => {
    setPopContex({ popId: "", anchorEl: null });
  };

  useEffect(() => {
    let totalDataObj = { p: 0, v: 0, h: 0, r: 0, s: 0 };

    const sumHours = (total, newT) => {
      const currTime = total !== 0 ? total.split(":") : "0:0".split(":");
      const newTime = newT.split(":");
      let h = parseInt(currTime[0]) + parseInt(newTime[0]);
      let m = parseInt(currTime[1]) + parseInt(newTime[1]);

      if (m >= 60) {
        // Divide minutes by 60 and add result to hours
        h += Math.floor(m / 60);
        // Add remainder of totalM / 60 to minutes
        m = m % 60;
      }
      //console.log(h + ":" + m);
      return h + ":" + m;
    };
    const totalDataSum = (array) => {
      array.forEach((element) => {
        totalDataObj.p += parseInt(element.val().pubs) || 0;
        totalDataObj.v += parseInt(element.val().vid) || 0;
        totalDataObj.h = sumHours(totalDataObj.h, element.val().horas);
        totalDataObj.r += parseInt(element.val().rr) || 0;
        totalDataObj.s += parseInt(element.val().est) || 0;
      });
      console.log(totalDataObj);
      setTotalData(totalDataObj);
    };
    totalDataSum(data);
  }, [data]);

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
      <div className={classes.flex}>
        <DatePicker />
        <Typography variant="h6" className={classes.title}>
          {user}
        </Typography>
      </div>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.table}
          stickyHeader
          aria-label="sticky table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">REPORT</TableCell>
              <TableCell align="center">{totalData.p}</TableCell>
              <TableCell align="center">{totalData.v}</TableCell>
              <TableCell align="center">{totalData.h}</TableCell>
              <TableCell align="center">{totalData.r}</TableCell>
              <TableCell align="center">{totalData.s}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>

          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Day</StyledTableCell>
              <StyledTableCell align="center">Placements</StyledTableCell>
              <StyledTableCell align="center">Videos</StyledTableCell>
              <StyledTableCell align="center">Hours</StyledTableCell>
              <StyledTableCell align="center">R. Visits</StyledTableCell>
              <StyledTableCell align="center">Studies</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>

          {loading}

          <TableBody>
            {data.map((item) => (
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
                  {item.val().day}-{getDayName(item.val().date)}
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
                  <Button
                    id={"rr" + item.key}
                    aria-describedby={"info"}
                    onClick={(e) => {
                      handleClick2(e, "rv" + item.key);
                    }}
                    //variant="outlined"
                    color="secondary"
                  >
                    {item.val().rr}
                  </Button>
                  <Popover
                    id={"info2"}
                    open={popContex.popId === "rv" + item.key}
                    anchorEl={popContex.anchorEl}
                    onClose={handleClose2}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    {/*<Typography className={classes.typography}>
                      // The content of the Popover. // //
                    </Typography>
                    //<List>{generate(item.val().rvnames)}</List>*/}
                    <List>
                      {item.val().rvnames.map((value) => (
                        <ListItem key={value.name}>
                          <ListItemText primary={value.name} />
                        </ListItem>
                      ))}
                    </List>
                  </Popover>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.val().est}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ButtonGroup
                    disableElevation={true}
                    color="secondary"
                    aria-label="outlined secondary button group"
                  >
                    <Button
                      className={classes.smallpadding}
                      onClick={updateDataForm(item.key)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      className={classes.smallpadding}
                      onClick={delData(item.key)}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  </ButtonGroup>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
