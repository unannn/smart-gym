import React, { Component } from 'react';
import styled from "styled-components";
import moment from 'moment';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            day: this.props.day,
        }
    }
    render() {
        //const key = this.state.year + this.state.month + this.state.day;
        return <TD onClick={(e) => {
            this.setState({
                year: this.props.year,
                month: this.props.month,
                day: this.props.day
            }, () => {
                return this.props.onClickDate(this.state)
            });
        }} isRezDay={this.props.isRezDay}>
            <ReservationDateStyle isRezDay={this.props.isRezDay}>
                <DateTextStyle isSelected={this.props.isSelected} isHoliday={this.props.isHoliday}>
                    {this.props.day}
                </DateTextStyle>
            </ReservationDateStyle>
        </TD>
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

    // 매개변수 안주면 현재 달의 날짜 리스트 반환, 주면 그 년도와 달에 해당하는 날짜 리스트 반환
    getCalendarDayList(year, month) {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let selectedDate = year + month;

        var monthStartDay = week.indexOf(moment(selectedDate).format('ddd'));
        var calendarStart = -1 * monthStartDay;
        var days = new Array(6);

        for (let i = 0; i < 6; i++) {
            let tmp = new Array(7)
            for (let j = 0; j < 7; j++) {
                const date = moment(selectedDate).add(calendarStart + i * 7 + j, 'days');
                const Fomatdate = {
                    year: date.format('YYYY'),
                    month: date.format('MM'),
                    day: date.format('DD')
                }

                tmp[j] = Fomatdate;
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

    isRezValidDay(todayDate, date) {
        if (todayDate <= date && moment(todayDate).add(this.props.rezValidDate, "days").format("YYYYMMDD") > date) {
            return true;
        }
        return false;
    }
    isHoliday(date) {
        console.log(this.props.holidays)

        console.log(date)
        if (this.props.holidays.includes(date)) {
            console.log(date)
            return true;
        }
        return false;
    }

    render() {
        //요일 이름
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const tableHead = week.map(day => <TH>{day}</TH>);
        //날짜 출력
        const selectedMonthDays = this.getCalendarDayList(this.state.year, this.state.month);
        const todayDate = moment().format("YYYYMMDD");


        const selectedEquipList = selectedMonthDays.map((days, weekIndex) => {
            const week = days.map((date, dayIndex) => {
                const selectedDate = {
                    year: this.props.selectedDate.year,
                    month: this.props.selectedDate.month,
                    day: this.props.selectedDate.day
                }
                const isSelected = Object.entries(selectedDate).toString() === Object.entries(date).toString();


                return <Day key={weekIndex * 7 + dayIndex} onClickDate={this.props.onClickDate} year={date.year}
                    month={date.month} day={date.day} isSelected={isSelected}
                    isRezDay={this.isRezValidDay(todayDate, date.year + date.month + date.day)} isHoliday={this.isHoliday(date.year + date.month + date.day)} ></Day>
            })
            return <tr>{week}</tr>
        });

        return <CalendarStyle>
            <div>
                <span onClick={this.clickPreviousMonth.bind(this)}>{`<`}  </span>
                {this.state.year}.{this.state.month}
                <span onClick={this.clickNextMonth.bind(this)}>  {`>`}</span>
            </div>
            <table>
                <thead>
                    {tableHead}
                </thead>
                <tbody>
                    {selectedEquipList}
                </tbody>
            </table>
        </CalendarStyle>
    }

}


var TH = styled.th`
    width:90px;
    background-color:#404040;
    color:white;
    border:1px #909090 solid;

`;


var TD = styled.td`
    width:90px;
    height:80px;
    vertical-align : top;
    text-align:left;
    /* border:1px #909090 solid; */
    border: ${props => props.isRezDay ? '2px tomato solid' : '1px #909090 solid'}
`;

var DateTextStyle = styled.div`
    background-color:${props => props.isSelected ? 'tomato' : 'white'};
    color:${props => props.isHoliday ? 'red' : 'black'};
    width:22px;
    height:22px;
    display: inline-block;
    border-radius: 50%;
`;
var ReservationDateStyle = styled.div`
    //background-color:${props => props.isRezDay ? 'yellow' : 'white'};
    //border:3px cadetblue solid;
    height:100%;

`;

var CalendarStyle = styled.div`
    display:inline-block;
`;


export default Calendar;

