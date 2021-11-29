import React, { Component } from 'react';
import styled from "styled-components";
import moment from 'moment';
import { ModeComment, RestorePageSharp } from '@material-ui/icons';
import { Pointer } from 'highcharts';
import axios from 'axios';

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.year,
            month: this.props.month,
            day: this.props.day,
            dayOfWeek: this.props.dayOfWeek,
            isHoliday: this.props.isHoliday,
            isRezValidDay: this.props.isRezDay
        }
    }

    render() {
        //const key = this.state.year + this.state.month + this.state.day;
        return <TD key={this.props.keyValue} onClick={(e) => {
            this.setState({
                year: this.props.year,
                month: this.props.month,
                day: this.props.day,
                dayOfWeek: this.props.dayOfWeek,
                isHoliday: this.props.isHoliday,
                isRezValidDay: this.props.isRezDay
            }, () => {
                return this.props.onClickDate(this.state)
            });
        }} isRezDay={this.props.isRezDay}>
            <ReservationDateStyle isRezDay={this.props.isRezDay}>
                <DateStyle isSelected={this.props.isSelected} >
                    <DateTextStyle isHoliday={this.props.isHoliday} isCurrentMonth={this.props.month === this.props.selectedMonth}>
                        {this.props.day}
                    </DateTextStyle>
                </DateStyle>

            </ReservationDateStyle>
        </TD>
    }
}

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: moment().format('YYYY'),
            previousYear: moment().add(-1, 'month').format('YYYY'),
            nextYear: moment().add(1, 'month').format('YYYY'),

            month: moment().format('MM'),
            previousMonth: moment().add(-1, 'month').format('MM'),
            nextMonth: moment().add(1, 'month').format('MM'),

            holidays: [],
            nextMonthHolidays: [],
            previousMonthHolidays: [],

            reRender: false
        }


    }

    componentDidUpdate() {
    }

    componentDidMount() {
        const queryString = '?year=' + this.state.year + '&month=' + this.state.month;
        const nextQuery = '?year=' + this.state.nextYear + '&month=' + this.state.nextMonth;
        const prevQuery = '?year=' + this.state.previousYear + '&month=' + this.state.previousMonth;
        //여기서 휴일 받아오기
        this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + queryString, 'holidays');
        this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + queryString, 'holidays');
        this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + prevQuery, 'previousMonthHolidays');
        this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + prevQuery, 'previousMonthHolidays');
        this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + nextQuery, 'nextMonthHolidays');
        this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + nextQuery, 'nextMonthHolidays');
    }

    getHolidays(uri, order) {
        let processResponse = async function (response) {
            const holidays = response.data.data;
            await this.setState({ [order]: this.state[order].concat(holidays) })
        }

        axios.get(uri,
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(processResponse.bind(this))
            .catch((response) => {
                console.log('Error');
                console.log(response);
            })
    }




    // 매개변수 안주면 현재 달의 날짜 리스트 반환, 주면 그 년도와 달에 해당하는 날짜 리스트 반환
    getCalendarDayList(year, month) {
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let selectedDate = year + month;
        var monthStartDay = week.indexOf(moment(selectedDate).locale('en').format('ddd'));

        var calendarStart = -1 * monthStartDay;
        var days = new Array(6);

        for (let i = 0; i < 6; i++) {
            let tmp = new Array(7)
            for (let j = 0; j < 7; j++) {
                const date = moment(selectedDate).add(calendarStart + i * 7 + j, 'days');
                const Fomatdate = {
                    year: date.format('YYYY'),
                    month: date.format('MM'),
                    day: date.format('DD'),
                    dayOfWeek: date.locale('ko').format('ddd')
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
            month: moment(this.state.year + this.state.month).add(1, 'month').format('MM'),
            previousMonth: moment(this.state.previousYear + this.state.previousMonth).add(1, 'month').format('MM'),
            nextMonth: moment(this.state.nextYear + this.state.nextMonth).add(1, 'month').format('MM'),
            previousYear: moment(this.state.previousYear + this.state.previousMonth).add(1, 'month').format('YYYY'),
            nextYear: moment(this.state.nextYear + this.state.nextMonth).add(1, 'month').format('YYYY'),
            holidays: [],
            nextMonthHolidays: [],
            previousMonthHolidays: []
        }, () => {
            const queryString = '?year=' + this.state.year + '&month=' + this.state.month;
            const nextQuery = '?year=' + this.state.nextYear + '&month=' + this.state.nextMonth;
            const prevQuery = '?year=' + this.state.previousYear + '&month=' + this.state.previousMonth;
            //여기서 휴일 받아오기
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + queryString, 'holidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + queryString, 'holidays');
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + prevQuery, 'previousMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + prevQuery, 'previousMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + nextQuery, 'nextMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + nextQuery, 'nextMonthHolidays');
        })
    }

    clickPreviousMonth() {
        this.setState({
            year: moment(this.state.year + this.state.month).add(-1, 'month').format('YYYY'),
            month: moment(this.state.year + this.state.month).add(-1, 'month').format('MM'),
            previousMonth: moment(this.state.year + this.state.previousMonth).add(-1, 'month').format('MM'),
            nextMonth: moment(this.state.year + this.state.nextMonth).add(-1, 'month').format('MM'),
            previousYear: moment(this.state.previousYear + this.state.previousMonth).add(-1, 'month').format('YYYY'),
            nextYear: moment(this.state.nextYear + this.state.nextMonth).add(-1, 'month').format('YYYY'),
            holidays: [],
            nextMonthHolidays: [],
            previousMonthHolidays: []
        }, () => {
            const queryString = '?year=' + this.state.year + '&month=' + this.state.month;
            const nextQuery = '?year=' + this.state.nextYear + '&month=' + this.state.nextMonth;
            const prevQuery = '?year=' + this.state.previousYear + '&month=' + this.state.previousMonth;
            //여기서 휴일 받아오기
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + queryString, 'holidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + queryString, 'holidays');
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + prevQuery, 'previousMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + prevQuery, 'previousMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + nextQuery, 'nextMonthHolidays');
            this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + nextQuery, 'nextMonthHolidays');
        })
    }

    isRezValidDay(todayDate, date) {
        if (todayDate <= date && moment(todayDate).add(this.props.rezValidDate, "days").format("YYYYMMDD") > date) {
            return true;
        }
        return false;
    }

    isHoliday(month, date) {

        // console.log(this.state.holidays)

        if (this.state.holidays.includes(parseInt(date)) && month === this.state.month) {
            return true;
        }
        else if (this.state.nextMonthHolidays.includes(parseInt(date)) && month === this.state.nextMonth) {
            return true;
        }
        else if (this.state.previousMonthHolidays.includes(parseInt(date)) && month === this.state.previousMonth) {
            return true;
        }
        return false;
    }

    render() {

        if (this.props.reRender !== this.state.reRender) {
            this.setState({ reRender: !this.state.reRender })

            const queryString = '?year=' + this.state.year + '&month=' + this.state.month;
            const nextQuery = '?year=' + this.state.nextYear + '&month=' + this.state.nextMonth;
            const prevQuery = '?year=' + this.state.previousYear + '&month=' + this.state.previousMonth;
            this.setState({ holidays: [] }, () => {
                this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + queryString, 'holidays');
                this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + queryString, 'holidays');
                this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + prevQuery, 'previousMonthHolidays');
                this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + prevQuery, 'previousMonthHolidays');
                this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + nextQuery, 'nextMonthHolidays');
                this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + nextQuery, 'nextMonthHolidays');
            });
        }

        //요일 이름
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const tableHead = week.map(day => <TH>{day}</TH>);
        //날짜 출력
        const selectedMonthDays = this.getCalendarDayList(this.state.year, this.state.month);
        const todayDate = moment().format("YYYYMMDD");

        const selectedDate = {
            year: this.props.selectedDate.year,
            month: this.props.selectedDate.month,
            day: this.props.selectedDate.day,
            dayOfWeek: this.props.selectedDate.dayOfWeek
        }
        const selectedEquipList = selectedMonthDays.map((days, weekIndex) => {
            const week = days.map((date, dayIndex) => {

                const isSelected = Object.entries(selectedDate).toString() === Object.entries(date).toString();

                return <Day keyValue={weekIndex * 7 + dayIndex} onClickDate={this.props.onClickDate} year={date.year}
                    month={date.month} day={date.day} dayOfWeek={date.dayOfWeek} selectedMonth={this.state.month} isSelected={isSelected}
                    isRezDay={this.isRezValidDay(todayDate, date.year + date.month + date.day)} isHoliday={this.isHoliday(date.month, date.day)} ></Day>
            })
            return <tr>{week}</tr>
        });

        return <CalendarStyle>
            <div>
                <span style={{ cursor: "pointer" }} onClick={this.clickPreviousMonth.bind(this)}>{`< `}  </span>
                {this.state.year}.{this.state.month}
                <span style={{ cursor: "pointer" }} onClick={this.clickNextMonth.bind(this)}>  {` >`}</span>
            </div>
            <table>
                <thead>
                    {tableHead}
                </thead>
                <tbody style={{ cursor: "pointer" }}>
                    {selectedEquipList}
                </tbody>
            </table>
        </CalendarStyle>
    }

}


var TH = styled.th`
    padding-bottom:3px;
    padding-top:3px;
    width:90px;
    background-color:#404040;
    color:white;
    
    font-size:16px;
    font-weight:590;
`;


var TD = styled.td`
    width:90px;
    height:80px;
    vertical-align : top;
    text-align:left;
    /* border:1px #909090 solid; */
    border: ${props => props.isRezDay ? '2px tomato solid' : '0px #909090 solid'};
    /* border-color : ${props => props.isRezDay ? 'tomato' : 'rgba(255,255,255,0.3)'}; */

    /* border-right:${props => props.isRezDay && '1px #909090 solid'};
    border-left:${props => props.isRezDay && '1px #909090 solid'}; */
    &:hover {
        background-color: #909090;
    }
`

var DateStyle = styled.div`
    background-color:${props => props.isSelected ? 'tomato' : 'white'}; 
    border-radius: 50%;
    display: inline-block;
    width:22px;
    height:22px;
`;

var DateTextStyle = styled.div`
    color:${props => props.isHoliday ? 'red' : 'black'};
    
    display: inline-block;
    border-radius: 50%;
    opacity:${props => props.isCurrentMonth ? 1 : 0.3};

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
