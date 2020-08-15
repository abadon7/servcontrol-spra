import React from 'react';
//import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon"

//const useStyles = makeStyles({
//
//    squareLogo: {
//        width: '40px',
//        height: '40px',
//        alignItems: 'center',
//        display: 'flex',
//        justifyContent: 'center',
//        background: '#E91E63',
//        color: 'white',
//        fontSize: '20px'
//    },
//
//})

const Logo = (props) => {
    //const classes = useStyles();
    return (
        /*  <div className={classes.squareLogo}>
             SC
         </div> */
        <SvgIcon {...props}>
            <rect x="0.5" y="0.5" width="23" height="23" fill="#FFFDFE" stroke="#E91E63"/>
            <path d="M8.86793 12.8679C8.1443 12.6599 7.61695 12.4051 7.2859 12.1033C6.95777 11.7986 6.79371 11.4236 6.79371 10.9783C6.79371 10.4744 6.99439 10.0584 7.39576 9.73025C7.80006 9.3992 8.32447 9.23367 8.969 9.23367C9.40846 9.23367 9.79957 9.31863 10.1423 9.48855C10.488 9.65848 10.7546 9.89285 10.9421 10.1917C11.1326 10.4905 11.2278 10.8172 11.2278 11.1717H10.3796C10.3796 10.7849 10.2566 10.4817 10.0105 10.262C9.76441 10.0393 9.41725 9.92801 8.969 9.92801C8.55299 9.92801 8.22779 10.0203 7.99342 10.2049C7.76197 10.3865 7.64625 10.6399 7.64625 10.9651C7.64625 11.2259 7.75611 11.4471 7.97584 11.6287C8.1985 11.8074 8.57496 11.9715 9.10523 12.1209C9.63844 12.2703 10.0545 12.4358 10.3533 12.6175C10.655 12.7962 10.8777 13.0056 11.0212 13.2459C11.1677 13.4861 11.241 13.7688 11.241 14.094C11.241 14.6126 11.0388 15.0286 10.6345 15.3421C10.2302 15.6526 9.68971 15.8079 9.01295 15.8079C8.5735 15.8079 8.16334 15.7244 7.78248 15.5574C7.40162 15.3875 7.10719 15.156 6.89918 14.8631C6.6941 14.5701 6.59156 14.2376 6.59156 13.8655H7.43971C7.43971 14.2522 7.5818 14.5584 7.86598 14.784C8.15309 15.0066 8.53541 15.1179 9.01295 15.1179C9.45826 15.1179 9.79957 15.0271 10.0369 14.8455C10.2742 14.6638 10.3928 14.4163 10.3928 14.1028C10.3928 13.7893 10.283 13.5476 10.0632 13.3777C9.84352 13.2049 9.44508 13.0349 8.86793 12.8679ZM17.033 13.6897C16.9539 14.3665 16.7034 14.8894 16.2815 15.2586C15.8626 15.6248 15.3045 15.8079 14.6072 15.8079C13.8513 15.8079 13.2449 15.5369 12.7879 14.9949C12.3337 14.4529 12.1067 13.7278 12.1067 12.8196V12.2044C12.1067 11.6096 12.2122 11.0867 12.4231 10.6355C12.637 10.1844 12.9387 9.83865 13.3284 9.59842C13.718 9.35525 14.1692 9.23367 14.6819 9.23367C15.3616 9.23367 15.9065 9.4241 16.3167 9.80496C16.7268 10.1829 16.9656 10.7073 17.033 11.3782H16.1848C16.1116 10.8684 15.9519 10.4993 15.7058 10.2708C15.4627 10.0423 15.1213 9.92801 14.6819 9.92801C14.1428 9.92801 13.7195 10.1272 13.4119 10.5257C13.1072 10.9241 12.9548 11.491 12.9548 12.2263V12.846C12.9548 13.5403 13.0999 14.0926 13.3899 14.5027C13.6799 14.9129 14.0857 15.1179 14.6072 15.1179C15.0759 15.1179 15.4348 15.0125 15.6838 14.8015C15.9358 14.5877 16.1028 14.2171 16.1848 13.6897H17.033Z" fill="#E91E63"/>
        </SvgIcon>
    )

}

export default Logo
