import React, { Component } from 'react';
import './switch.css';
class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isChecked: null,
            itemIdSw: 0,
            labelOn: "Si",
            labelOff: "No"
        }
        this._handleChange2 = this._handleChange2.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setState({ 
            isChecked: this.props.isChecked,
            itemIdSw: this.props.itemIdSw                                       
        });
    }
    _handleChange = (e) => {
       this.setState({ isChecked: !this.state.isChecked });
       
    }
     _handleChange2() {
         console.log(`This return visit ${this.state.itemIdSw} is a bible study ${this.state.isChecked}`);
         this.setState({ isChecked: !this.state.isChecked });
    }
    returnCounter = () => {
        console.log(this.state.itemIdSw)
        return this.state.isChecked;
    }
    render() {
        const { onPress} = this.props;
        return (
            <div className="switch-container" ref={this.myRef}>
                <label>
                    <input ref="switch" checked={this.state.isChecked} value={this.state.itemIdSw} onChange={this._handleChange} onClick={onPress} className="switch" type="checkbox" />
                    <div>
                        <span className="Switch-Labels">
                            {this.state.isChecked ?
                                <label className="SwitchLabelOn">{this.state.labelOn}</label>
                            :
                                <label className="SwitchLabelOff">{this.state.labelOff}</label>
                            }
                        </span>
                        <span><g className="icon icon-toolbar grid-view"></g></span>
                        <span><g className="icon icon-toolbar ticket-view"></g></span>
                        <div></div>
                    </div>
                </label>
            </div>
        );
    }
    
}
export default Switch;
//React.render(<Switch isChecked={true} />, document.getElementById("page"));
