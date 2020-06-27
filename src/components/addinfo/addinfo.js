import React, { Component } from 'react';
import ReactDom from 'react-dom';
import firebase, { auth, provider } from '../../firebaseInit.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import './addinfo.css';

import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../node_modules/rc-time-picker/assets/index.css';
import { APP_USERS, P_NAME } from '../../timeInformation.js';
const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
/* class Form extends React.Component {

    constructor() {
      super();

      this.displayData = [];

      this.state = {
        showdata : this.displayData,
        postVal : ''
      };

      this.appendData = this.appendData.bind(this);
      this.prependData = this.prependData.bind(this);
      this.handleChangeForm = this.handleChangeForm.bind(this);

    };

  appendData() {
         this.displayData.push(<div  id="display-data"><pre>{this.state.postVal}</pre></div>);
         this.setState({
            showdata : this.displayData,
            postVal : ''
         });
      }

  prependData() {
   this.displayData.unshift(<div id="display-data"><pre>{this.state.postVal}</pre></div>);
   this.setState({
      showdata : this.displayData,
      postVal : ''
   });
 }

 handleChangeForm(e) {
      let getTextAreaValue = e.target.value;
      this.setState({
        postVal :getTextAreaValue
      });
}

  render() {
    return (
          <div id="mainContainer">
             <textarea rows="4" cols="50" value={this.state.postVal} onChange={this.handleChangeForm}  />
             <div >
             <input  type="submit" className="button" onClick={this.appendData}  value="Append"/>
             <input  type="submit" className="button" onClick={this.prependData}   value="Prepend"/>
             </div>
             <div id="display-data-Container">
             {this.displayData}
             </div>
          </div>
      );
  }
} */
class Addinfo extends React.Component {
    constructor(props) {
        super(props);
        //this.myRef = React.createRef();
        var today = this.props.dateInfo.today;
        var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        /*var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", " Noviembre", "Diciembre"
        ];
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var currentDay = weekday[today.getDay()];
        var currentMonth = monthNames[today.getMonth()];
        const currentYear = today.getFullYear();
        const monthDays = new Date(today.getDay(), today.getMonth() + 1, 0).getDate();
        const currentDate = { day: currentDay, month: currentMonth, year: currentYear, days: monthDays, dayNum: today.getDate() };

 */

        this.rrinputdisplay = [];
        this.state = {
            publications: '',
            videos: '',
            horas: 0,
            returnvisits: '',
            estudios: 0,
            itemsControl: [],
            totalHoras: 0,
            dateInit: date,
            username: localStorage.getItem('PioneerName'),
            dateString: this.props.dateInfo,
            addDate: '',
            startDate: moment(),
            myName: '',
            rrinfotext: '',
            rrinputarr: this.rrinputdisplay,
            returnvisitsname: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);

    }
    /*componentWillMount() {
        this.setState({
            isChecked: this.props.isChecked,
            itemIdSw: this.props.itemIdSw
        });
    }*/
    handleChange(date) {
        console.log(date);
        console.log(date._d.getMonth());
        this.setState({
            startDate: date
        });
    }
    handleTimeChange(time) {
        console.log(time && time.format(str));
        this.setState({
            horas: time.format(str)
        });
    }
    getFirebaseInfo() {
        this.setState({
            username: localStorage.getItem('PioneerName'),
        })
    }
    testdate = (e) => {
        console.log(e.target.value);
        let formatDate = moment(e.target.value);
        console.log(formatDate);
        console.log(new Date(e.target.value));
        this.setState({
            startDate: formatDate,
            addDate: e.target.value
        });
    };

    _handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        /*if(e.target.name === 'returnvisits'){
            console.log(`You are adding ${e.target.value} return visits`);
            for (var i = 0; i < e.target.value; i += 1) {
              this.rrinputdisplay.push(<input type="text" key={i} />);
            };
            this.rrinputdisplay.push(<input type="text" />);
            this.setState({
                rrinfotext: `You are adding ${e.target.value} return visits`,
                rrinputarr: this.rrinputdisplay
            });
        }*/
    }
    addrv = (e) => {
        e.preventDefault();
        let rvname = this.state.returnvisitsname;
        console.log(`You are adding ${rvname} return visits`);
        this.rrinputdisplay.push({ name: rvname, study: 0 });
        this.setState({
            rrinfotext: `You are adding ${rvname} return visits`,
            revinfotext: 'Use the checkbox to select the students',
            rrinputarr: this.rrinputdisplay,
            returnvisitsname: '',
            returnvisits: this.rrinputdisplay.length
        });
    }
    removerv = (index) => {
        console.log(`removing ${index}`);
        console.log(this.state.rrinputarr);
        this.rrinputdisplay = this.state.rrinputarr;
        this.rrinputdisplay.splice(index,1);
        console.log(this.rrinputdisplay);
        let stdtotal = this.state.estudios;
        if(stdtotal > 0){
            stdtotal = stdtotal - 1
        }
        this.setState({
            rrinputarr: this.rrinputdisplay,
            returnvisits: this.rrinputdisplay.length,
            estudios: stdtotal
        })
    }
    chkStudents = (index) => {
        console.log(`Checking ${index}`);
        this.rrinputdisplay = this.state.rrinputarr;
        let stdvalue = this.rrinputdisplay[index].study;
        let stdtotal = this.state.estudios;
        if(stdvalue === 0){
            this.rrinputdisplay[index].study = 1;
            stdtotal = stdtotal + 1;
        }else{
            this.rrinputdisplay[index].study = 0;
            stdtotal = stdtotal - 1;
        }
        this.setState({
            rrinputarr: this.rrinputdisplay,
            estudios: stdtotal
        })
    }
    addinfo = (e) => {
        e.preventDefault();
        console.log('Checking info');
        console.time('Info');
        let dateToAdd = this.state.dateInit; // !This line could be useless 
        let customDate = this.state.addDate;
        const addWeekDay = this.state.startDate._d.getDay();
        const addDay = this.state.startDate._d.getDate();
        const addMonth = this.state.startDate._d.getMonth() + 1;
        const addYear = this.state.startDate._d.getFullYear();
        if (customDate !== '') {
            dateToAdd = customDate;
        }
        let rvarrnames = '';
        if(this.state.rrinputarr.length > 0){
            rvarrnames = this.state.rrinputarr;
        }
        const item = {
            pubs: this.state.publications,
            vid: this.state.videos,
            horas: this.state.horas,
            rr: this.state.returnvisits,
            rvnames: rvarrnames,
            est: this.state.estudios,
            date: dateToAdd,
            user: this.state.username,
            month: addMonth,
            year: addYear,
            day: addDay,
            weekday: addWeekDay
        }
        let newState = [];
        newState.push({
            pubs: this.state.publications,
            vid: this.state.videos,
            horas: this.state.horas,
            rr: this.state.returnvisits,
            est: this.state.estudios,
            date: dateToAdd,
            user: this.state.username
        });
        /*  this.setState({
             items: newState
         }); */
         if (confirm(`This information will be added to ${this.state.username}, is it correct?`)) {
            
        }
        console.log(item);
        const controlref = firebase.database().ref(`control/${this.state.username}/${addYear}/${addMonth}`);
        //controlref.push(item);
        controlref.push(item, function (error) {
            if (error)
                alert('Tuvimos problemnas guardando la información')
            else
                alert('La información se guardó correctamente')
        })
        console.timeEnd('Info')
    }
    render() {
        const { onPress } = this.props;
        return (
            <div className="hours-day">
                <div className="w3-container w3-pink w3-center marging-top-46"><span>Today is {moment().format('LL')} </span></div>
                <div className="w3-card-4 add-container marging-bottom-46">
                    <div className="w3-container w3-pink w3-center ">
                        <h6>Agregar Información para {this.state.username}</h6>
                    </div>

                    <form className="w3-container">
                        <p>
                            <label>Fecha</label>
                            <input type="date" className="w3-input" name="addDate" onChange={this.testdate} />
                            {/*<DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                className="w3-input"
                            />*/}
                            {/* <input className="w3-input" required type="date" name="addDate" value={this.state.addDate} onChange={this._handleChange} /> */}
                        </p>
                        <p>
                            <label>Publicaciones</label>
                            <input className="w3-input" type="number" name="publications" value={this.state.publications} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <label>Videos</label>
                            <input className="w3-input" type="number" name="videos" value={this.state.videos} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <label>Horas</label>
                            <TimePicker
                                style={{ width: 100 }}
                                showSecond={false}

                                className="w3-input"
                                onChange={this.handleTimeChange}
                            />
                            {/* <input className="w3-input" type="time" name="horas" value={this.state.horas} placeholder="0" onChange={this._handleChange} /> */}
                        </p>
                        <p>
                            <label>Revisitas</label>
                            {/*<input className="w3-input" type="number" name="returnvisits" value={this.state.returnvisits} placeholder="0" onChange={this._handleChange} />*/}
                            <div className="w3-bar">
                                <input className="w3-input w3-left width-70per" type="text" name="returnvisitsname" value={this.state.returnvisitsname} placeholder="Return visit name" onChange={this._handleChange} />
                                <button className="w3-btn w3-deep-purple w3-right" onClick={this.addrv}>Add</button>
                            </div>
                            <div className="w3-panel w3-pink">
                                <h7 className="w3-opacity">{this.state.revinfotext}</h7>
                            </div>
                            <div>
                                <ul className="w3-ul w3-card-4">
                                    {this.state.rrinputarr.map((item, index) => {
                                        console.log('checking rv');
                                        console.log(item+index);
                                        return (
                                            <li key={index} className="w3-display-container"><input className="w3-check w3-display-left" type="checkbox" onClick={() => this.chkStudents(index)}/>&times;{item.name}{index}<span onClick={() => this.removerv(index)} className="w3-button w3-transparent w3-display-right">&times;</span></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </p>
                        <p>
                            <label>Estudios</label>
                            <input className="w3-input" type="text" name="estudios" readonly="true" value={this.state.estudios} placeholder="0" onChange={this._handleChange} />
                        </p>
                        <p>
                            <div className="w3-center">
                                <button className="w3-button w3-deep-purple" onClick={this.addinfo}>Agregar</button>
                                <input type="hidden" name="dateInit" value={this.state.dateInit} />
                                <input type="hidden" name="username" defaultValue={this.state.username} />
                            </div>
                        </p>
                    </form>
                </div>
            </div>
        );

    }

}
export default Addinfo;
//React.render(<Switch isChecked={true} />, document.getElementById("page"));


