import React, { Component } from "react";
//import './switch.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import firebase, { auth, provider } from "../../firebaseInit.js";
class Details extends React.Component {
    constructor(props) {
        super(props);
        //var DB_PATH = '';
        this.state = {
            username: localStorage.getItem("PioneerName") || "",
            itemsControl: [],
            totalHoras: 0,
            DB_PATH: '',
            listDaysMonth: '',
            selMonth: '',
            selYear: ''
        };
        this.getFirebaseInfo = this.getFirebaseInfo.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const today = this.props.dateInfo.today;
        //const addDay = today._d.getDate();
        const addMonth = today.getMonth() + 1;
        const addYear = today.getFullYear();
        this.setState({
            listDaysMonth: this.getDaysInMonth(this.props.dateInfo.today.getMonth(), this.props.dateInfo.year),
            selMonth: addMonth,
            selYear: addYear,
        }, () => {
            console.log('Setting states');
            this.getFirebaseInfo();
        });
        
    }
    getFirebaseInfo() {
        console.log('Getting info');
        let DB_PATH = `control/${localStorage.getItem("PioneerName")}/${this.state.selYear}/${this.state.selMonth}`;
        console.log(`This is the url ${DB_PATH}`);
        const itemsRef = firebase.database().ref(DB_PATH);
        console.log(itemsRef);
        itemsRef.orderByValue().on('value', snapshot => {
            let items = snapshot.val();
            console.log(items);
        });
        /*itemsRef.orderByChild("day").on("child_added", function(data) {
           console.log(data.val().day);
        });*/
        let newState = [];
        let totalHours = 0;
        let totalP = 0;
        let totalV = 0;
        let totalR = 0;
        let totalE = 0;
        console.log('totalE Org' + totalE);
        /*itemsRef.orderByChild("day").on('child_added', snapshot => {
            console.log(snapshot);
            let items = snapshot.val();
            console.log(items);
            let hour = 0;
            let minute = 0;
            //let second = 0;
            console.log(items.id);
            newState.push({
                id: items.id,
                pubs: items.pubs,
                vid: items.vid,
                horas: items.horas,
                rr: items.rr,
                est: items.est,
                user: items.user,
                date: items.date,
                day: items.day,
                weekday: items.weekday
            });
            console.log(items);
            console.log(newState);
            let time1 = items.horas;
            console.log(time1);
            let splitTime1 = time1.split(':');
            hour = hour + parseInt(splitTime1[0], 10);
            minute = minute + parseInt(splitTime1[1], 10);
            console.log("hour: " + hour);
            console.log("minute: " + minute);
            totalHours = hour + Math.floor(minute / 60) + ":" + (minute % 60); //totalHours + addHours;
            console.log(totalHours);*/
        itemsRef.on('value', snapshot => {
            console.log(snapshot);
            let items = snapshot.val();
            console.log(items);
            let hour = 0;
            let minute = 0;
            //let second = 0;
            //console.log(items.id);
            for (let item in items) {
                let rvnamesarr = items[item].rvnames;
                if(items[item].rvnames === ''){
                    rvnamesarr = [];
                }
                newState.push({
                    id: item,
                    day: items[item].day,
                    pubs: items[item].pubs,
                    vid: items[item].vid,
                    horas: items[item].horas,
                    rr: items[item].rr,
                    rnames: rvnamesarr,
                    est: items[item].est,
                    user: items[item].user,
                    date: items[item].date,
                    weekday: items[item].weekday
                });
                console.log(newState);
                console.log(items[item]);
                let time1 = items[item].horas;
                console.log(time1);
                if(time1 === 0){
                    hour = hour + parseInt(time1, 10);
                    minute = minute + parseInt(time1, 10);
                }else{
                    let splitTime1 = time1.split(':');
                    hour = hour + parseInt(splitTime1[0], 10);
                    minute = minute + parseInt(splitTime1[1], 10);
                }
                
                console.log("hour: " + hour);
                console.log("minute: " + minute);
                //hour = hour + minute/60;
                //minute = minute%60;
                //second = parseInt(splitTime1[2]));
                //minute = minute + second/60;
                //second = second%60;
                //console.log((hour+Math.floor(minute/60))+':'+minute%60);
                //alert('sum of above time= '+hour+':'+minute+':'+second);
                //let addHours = parseInt(items[item].horas);
                totalHours = hour + Math.floor(minute / 60) + ":" + (minute % 60); //totalHours + addHours;
                let est = parseInt(items[item].est) || 0;
                let pub = parseInt(items[item].pubs) || 0;
                let rr = parseInt(items[item].rr) || 0;
                let vid = parseInt(items[item].vid) || 0;
                /*console.log("totalE "+ totalE);
                console.log("est "+ items[item].est);
                console.log("est int"+ est);*/
                totalE = totalE + est;
                totalP = totalP + pub;
                totalR = totalR + rr;
                totalV = totalV + vid;
                console.log(totalHours);
            }
            newState = newState.sort(function (a, b) {
                console.log(a);
                console.log(b);
                if (a.day > b.day) {
                    return 1;
                }
                if (a.day < b.day) {
                    return -1;
                }
              // a must be equal to b
                return 0;
            });
            this.setState({
                itemsControl: newState,
                totalHoras: totalHours,
                totalE: totalE,
                totalP: totalP,
                totalR: totalR,
                totalV: totalV,
                DB_PATH: DB_PATH,
                username: localStorage.getItem("PioneerName")
            });
        });
    }
    removeItem(itemId) {
        const itemRef = firebase
            .database()
            .ref(`${this.state.DB_PATH}/${itemId}`);
        if (confirm("Are you sure you want to delete this item?")) {
            itemRef.remove();
        }
        //itemRef.remove();
    }
    getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    handleChange(e) {
        if(e.target.name === 'showMonth'){
            this.setState({
                selMonth: parseInt(e.target.value) + 1
            }, () => {
                this.getFirebaseInfo();
            });
        }
        if(e.target.name === 'showYear'){
            this.setState({
                selYear: parseInt(e.target.value)
            }, () => {
                this.getFirebaseInfo();
            });
        }
    }
    render() {
        return (
            <div className="info-container">
                <div className="marging-top-46">
                    <h4>{this.state.username}'s Information</h4>
                </div>
                <div className="">
                    <label>To change month and year</label>
                    <select className="w3-select w3-deep-purple" name="showMonth" onChange={this.handleChange}>
                    {this.props.dateInfo.monthNames.map((item, index) => {
                        return this.state.selMonth === index + 1 ?
                            <option selected key={index} value={index}>{item}</option>
                        :
                            <option key={index} value={index}>{item}</option>
                        }
                            
                    )}
                    </select>
                    <select className="w3-select" name="showYear" onChange={this.handleChange}>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                    </select>
                </div>
                <div>
                    <p>
                        <span className="w3-tag w3-pink w3-xlarge">
                            Horas Totales: {this.state.totalHoras}
                        </span>
                    </p>
                </div>
                <div className="w3-responsive w3-card-4">
                    {/* <ul className="w3-ul w3-card-4">
            {this.state.itemsControl.map((item) => {
                console.log(item);
                console.log("Showing information");
                return (
                    <li key={item.id} className="w3-bar">
                    <span onclick="this.parentElement.style.display='none'" className="w3-bar-item w3-button w3-white w3-xlarge w3-right">×</span>
                    <span className="w3-bar-item"><strong>Date</strong><br/>{item.date}</span>
                    <div className="w3-bar-item">
                    <span className="w3-large">Hours</span><br />
                    <span>{item.horas}</span>
                    </div>
                    </li>

                    )
                })}
            </ul> */}
                    <table className="data-table w3-table-all w3-hoverable">
                        <thead>
                            <tr className="w3-pink">
                                <th>Day</th>
                                <th>P</th>
                                <th>V</th>
                                <th>H</th>
                                <th>R</th>
                                <th>E</th>
                                <th>Actions</th>
                            </tr>
                            <tr className="w3-border w3-border-purple">
                                <td>Total</td>
                                <td>{this.state.totalP}</td>
                                <td>{this.state.totalV}</td>
                                <td>{this.state.totalHoras}</td>
                                <td>{this.state.totalR}</td>
                                <td>{this.state.totalE}</td>
                                <td />
                            </tr>
                        </thead>
                        {this.state.itemsControl.map(item => {
                            console.log(item);
                            console.log('Showing information');
                            return (
                                <tbody key={item.id}>
                                    <tr>
                                        <td>
                                            {item.day}-{this.props.dateInfo.weekdays[item.weekday].substring(0,3)}
                                        </td>
                                        <td>{item.pubs}</td>
                                        <td>{item.vid}</td>
                                        <td>{item.horas}</td>
                                        <td>
                                            {item.rr}
                                            <ul className="w3-ul w3-card-1">
                                            {
                                                item.rnames.map((rv,index) => {
                                                    console.log(rv.name);
                                                    return rv.study === 1 ?
                                                        <li className='w3-text-pink' key={index}><span>{rv.name + ' (E)'}</span></li>
                                                    :
                                                        <li key={index}>{rv.name}</li>;
                                                })}
                                            </ul>
                                        </td>
                                        <td>{item.est}</td>
                                        <td>
                                            <a className="w3-button no-padding">
                                                <i className="fa fa-edit" />
                                            </a>

                                            <a
                                                className="w3-button no-padding"
                                                /* onClick={() => { if (confirm('Are you sure you want to delete this item?')) { this.removeItem(item.id) }; }} */ onClick={() =>
                                                    this.removeItem(item.id)
                                                }
                                            >
                                                <i className="fa fa-trash-alt" />
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                        <tbody>
                            <tr className="w3-border w3-border-purple">
                                <td>Total</td>
                                <td>{this.state.totalP}</td>
                                <td>{this.state.totalV}</td>
                                <td>{this.state.totalHoras}</td>
                                <td>{this.state.totalR}</td>
                                <td>{this.state.totalE}</td>
                                <td />
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Details;
