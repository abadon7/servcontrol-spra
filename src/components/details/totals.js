import React, { Component } from 'react';
import firebase, { auth, provider } from '../../firebaseInit.js';
class Totals extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            username: localStorage.getItem("PioneerName") || "",
            totalHoras:0
        this._handleChangeH = this._handleChangeH.bind(this);
        //const UserContext = React.createContext(['stop', 'Carito', 'Henry']);
    }
	render() {
    	return (
			<div>
                <p>
                    <span className="w3-tag w3-pink w3-xlarge">
                        Horas Totales: {this.state.totalHoras}
                    </span>
                </p>
            </div>
        )
	}
}
export default Totals;