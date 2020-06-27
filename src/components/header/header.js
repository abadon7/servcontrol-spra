import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Settings from '../settings/settings';
//import './switch.css';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mbMenu: 'hide',
            user: 0,
            settingsShow: false,
        }
        this.showmbMenu = this.showmbMenu.bind(this);
        this.showSettings = this.showSettings.bind(this);

    }
    UNSAFE_componentWillMount() {
        this.setState({
            user: this.props.user,
        });
    }
    udateInfo() {
        this.props.callBack();
    }
    showmbMenu() {
        if (this.state.mbMenu === 'hide') {
            this.setState({
                mbMenu: 'show'
            });
        } else {
            this.setState({
                mbMenu: 'hide'
            });
        }
    }
    showText() {
        console.log("This is a functions called by a ref action");
    }
    showSettings() {
        console.log('Opening settings modal');
        if (this.state.settingsShow) {
            this.setState({
                settingsShow: false
            });
        } else {
            this.setState({
                settingsShow: true
            });
        }
    }
    render() {
        const { } = this.props;
        var mbMenuDis = "w3-bar-block w3-deep-purple w3-hide-large w3-hide-medium"
        var mbMenuDisShow = `${mbMenuDis} w3-show`;
        var mbMenuDisHide = `${mbMenuDis} w3-hide`;
        return (
            <React.Fragment>
                <header>
                    {/* 
                    <div className='wrapper'>
                        <h1>Control de Servicio {this.state.name}</h1>
                        {this.state.user ?
                            <button className="button-error pure-button" color="primary" onClick={this.logout}>Salir</button>                
                            :
                            <button className="pure-button" color="primary" onClick={this.login}>Entrar</button>              
                        }
                    </div>
                */}
                    <div className="w3-top">
                        <div className="w3-bar w3-deep-purple">
                            {/* <a href="#" className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium">Control de Servicio</a> */}
                            <a href="#" className="w3-bar-item w3-button">Control de Servicio</a>
                            {this.props.user === 1 ?
                                <React.Fragment >
                                    <NavLink to="/agregar" className="w3-bar-item w3-button w3-hide-small">Agregar</NavLink>
                                    <NavLink to="/detalles" className="w3-bar-item w3-button w3-hide-small">Detalles</NavLink>
                                    <NavLink to="/revisitas" className="w3-bar-item w3-button w3-hide-small">Revisitas</NavLink>
                                    <a className="w3-bar-item w3-button w3-right" onClick={this.showSettings} ><i class="material-icons">settings</i></a>
                                    <a className="w3-bar-item w3-button w3-right" onClick={this.props.logOutFn}><i className="material-icons">exit_to_app</i></a>

                                </React.Fragment>
                                :
                                <React.Fragment >
                                    <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right" onClick={this.props.logIntFn} > <i className="fa fa-sign-in-alt"></i></a>

                                </React.Fragment>
                            }
                            {/* <a className="w3-bar-item w3-button w3-left w3-hide-large w3-hide-medium" onClick={this.showmbMenu}>&#9776;</a> */}
                        </div>
                    </div>
                    <div className={this.state.mbMenu == 'show' ? mbMenuDisShow : mbMenuDisHide} >
                        {this.props.user == 1 ?
                            <React.Fragment >
                                {/* <NavLink to="/agregar" className="w3-bar-item w3-button">Agregar</NavLink>
                                <NavLink to="/detalles" className="w3-bar-item w3-button">Detalles</NavLink>
                                <NavLink to="/revisitas" className="w3-bar-item w3-button">Revisitas</NavLink> */}
                                <a className="w3-bar-item w3-button w3-right" onClick={this.showSettings} ><i class="material-icons">settings</i>Settings</a>
                                <a className="w3-bar-item w3-button" onClick={this.props.logOutFn}><i className="fa fa-sign-out-alt"></i></a>
                            </React.Fragment>
                            :
                            <React.Fragment >
                                <a href="#" className="w3-bar-item w3-button" onClick={this.props.logIntFn}><i className="fa fa-sign-in-alt"></i></a>
                            </React.Fragment>
                        }
                    </div>
                    <div class="w3-bottom w3-hide-large w3-hide-medium w3-text-purple w3-light-gray">
                        <div class="w3-bar">
                            {this.props.user == 1 ?
                                <React.Fragment >
                                    <NavLink to="/agregar" className="w3-bar-item w3-button"><i class="material-icons">add</i></NavLink>
                                    <NavLink to="/detalles" className="w3-bar-item w3-button"><i class="material-icons">list</i></NavLink>
                                    <NavLink to="/revisitas" className="w3-bar-item w3-button">Revisitas</NavLink>
                                    
                                </React.Fragment>
                                :
                                <React.Fragment >
                                    <a href="#" className="w3-bar-item w3-button" onClick={this.props.logIntFn}><i className="fa fa-sign-in-alt"></i></a>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </header>
                {this.state.settingsShow ? <Settings closefn={this.showSettings} refresh={this.props.callBack} /> : null}
            </React.Fragment>
        )
    }

}
export default Header;
//React.render(<Switch isChecked={true} />, document.getElementById("page"));
