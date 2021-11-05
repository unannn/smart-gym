import React, { Component } from 'react';
import styled from "styled-components";
import moment from 'moment';

let StyledInputButton = styled.input`
    background-color:#404040;
	padding-top:5px;
	font-family:tahoma;
	font-size:18px;
	color:white;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    width:225px;
    height:40px;
    font-size:16px;
`;

class Day extends Component {
    render() {
        return <td></td>
    }
}

class CalendarTable extends Component {

    render() {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const tableHead = week.map(day => <TH>{day}</TH>);

        return <div></div>
    }
}

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: moment().format('YYYY'),
            month: moment().format('MM')
        }
    }

    componentDidMount() {

    }

    printCalendar() {
        const selectedMonthDays = this.getCalendarDayList(this.state.year, this.state.month);

        const selectedEquipList = selectedMonthDays.map((days, index) => {
            const week = days.map(day => <TD>{day}</TD>)
            return <tr>{week}</tr>
        });
        return selectedEquipList;
    }
    // 매개변수 안주면 현재 달의 날짜 리스트 반환, 주면 그 년도와 달에 해당하는 날짜 리스트 반환
    getCalendarDayList(year, month) {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let selectedDate = year + month;

        var monthStartDay = week.indexOf(moment(selectedDate).format('ddd'));
        var calendarStart = -1 * monthStartDay;
        var days = new Array(6);

        console.log(selectedDate)
        console.log(monthStartDay)

        for (let i = 0; i < 6; i++) {
            let tmp = new Array(7)
            for (let j = 0; j < 7; j++) {
                tmp[j] = parseInt(moment(selectedDate).add(calendarStart + i * 7 + j, 'days').format('D'))
            }
            days[i] = tmp;
        }

        return days;
    }

    clickNextMonth() {
        this.setState({
            year: moment(this.state.year + this.state.month).add(1, 'month').format('YYYY'),
            month: moment(this.state.year + this.state.month).add(1, 'month').format('MM')
        })
    }

    clickPreviousMonth() {
        this.setState({
            year: moment(this.state.year + this.state.month).add(-1, 'month').format('YYYY'),
            month: moment(this.state.year + this.state.month).add(-1, 'month').format('MM')
        })
    }

    render() {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const tableHead = week.map(day => <TH>{day}</TH>);
        return <div>
            <div>
                <span onClick={this.clickPreviousMonth.bind(this)}>{`<`}  </span>{this.state.year}.{this.state.month}<span onClick={this.clickNextMonth.bind(this)}>  {`>`}</span>
            </div>
            <table>
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {this.printCalendar()}
                </tbody>
            </table>
        </div>
    }

}


var TH = styled.th`
    width:90px;
    background-color:#404040;
    color:white;
`;
var TD = styled.td`
    width:90px;
    height:80px;
    vertical-align : top;
    text-align:left;
    background-color:whitesmoke;
    border:1px #909090 solid;
`;

export default Calendar;

