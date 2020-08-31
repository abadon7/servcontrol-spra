import React, {useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import UserContext from "../app/contextData";

const useStyles = makeStyles(theme => ({
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    thinSelect: {
        "& select": {
            paddingTop: 14,
            paddingBottom: 14
        }
    }
}));

export default function DatePicker() {
    const classes = useStyles();
    const { dateState, setDateState, setPending} = useContext(UserContext);
    const handleDateChange = event => {
        console.log(event.target.value);
        const selectedMonth = event.target.value;
        const eventName = event.target.name;
        setPending(true);
        setDateState({
            ...dateState,
            [eventName]: selectedMonth
        });
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const years = Array(10)
        .fill("")
        .map((v, idx) => 2017 + idx);

    //    React.useEffect(() => {
    //        months.map((mnth, num) => {
    //            console.log(num);
    //        });
    //    }, []);
    //
    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                    Month
                </InputLabel>
                <Select
                    className={classes.thinSelect}
                    native
                    value={dateState.month}
                    onChange={handleDateChange}
                    label="Month"
                    inputProps={{
                        name: "month",
                        id: "outlined-age-native-simple"
                    }}
                >
                    {months.map((mnth, num) => {
                        return <option key={num} value={num}>{mnth}</option>;
                    })}
                </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                    Year
                </InputLabel>
                <Select
                    className={classes.thinSelect}
                    native
                    value={dateState.year}
                    onChange={handleDateChange}
                    label="Year"
                    inputProps={{
                        name: "year",
                        id: "outlined-age-native-simple"
                    }}
                >
                    {years.map(yr => {
                        return <option key={yr} value={yr}>{yr}</option>;
                    })}
                </Select>
            </FormControl>
        </div>
    );
}
