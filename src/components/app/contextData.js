import React from 'react';

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

//const UserContext2 = React.createContext(null);
const UserContext = React.createContext({
  })
export const dateContext = React.createContext({
    date: null,
    changeDate: () => {},
})
export default UserContext
