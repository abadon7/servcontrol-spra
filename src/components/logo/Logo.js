import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({

    squareLogo: {
        width: '40px',
        height: '40px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        background: '#E91E63',
        color: 'white',
        fontSize: '20px'
    },

})

const Logo = () => {
    const classes = useStyles();
    return (
        <div className={classes.squareLogo}>
            SC
        </div>
    )

}

export default Logo