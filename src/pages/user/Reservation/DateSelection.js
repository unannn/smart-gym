import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/user/TopBar';
import styled from "styled-components";
import Calendar from '../../../components/user/Calendar';
import ReservationEquipTray from '../../../components/user/ReservationEquipTray';
import moment from 'moment';
import axios from "axios";
import { gridColumnsTotalWidthSelector } from '@material-ui/data-grid';

class DateSelection extends Component {
    constructor(props) {
        super(props);

        const currentDate = moment();
        this.state = {
            holidays: [],
            year: currentDate.format('YYYY'),
            month: currentDate.format('MM'),
            day: currentDate.format('DD'),
            dayOfWeek: currentDate.format('ddd'),

            isHoliday: false,
            isRezValidDay: true,
            rezValidDate: 0,
            buttonText: '',
            isRezValid: true,
            equipList: []
        }
    }

    componentDidMount() {
        const queryString = '?year=' + this.state.year + '&month=' + this.state.month;

        //여기서 휴일 받아오기
        this.getHolidays('http://localhost:8080/reservation/calRegularHolidayDate' + queryString);

        this.getHolidays('http://localhost:8080/reservation/calHolidayDate' + queryString);

        // // holidays = regularHolidays[0].concat(specialHolidays[0]);
        // console.log(regularHolidays[0]);
        // console.log(specialHolidays);
        // console.log([[1, 2, 3]]);

        const isHoliday = this.state.holidays.includes(parseInt(this.state.day));

        this.getSelectDateEquipList(this.state.year, this.state.month, this.state.day);

        this.getRezValidDate();


        this.setState({
            isHoliday: isHoliday,
            buttonText: isHoliday ? '휴무일 입니다.' : this.state.year + ' ' + this.state.month + '/' + this.state.day + ' 예약하기',
            isRezValid: !isHoliday
        })
    }

    getHolidays(uri) {

        let processResponse = async function (response) {
            const holidays = response.data.data;
            await this.setState({ holidays: this.state.holidays.concat(holidays) })
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

    getRezValidDate() {
        axios.get('http://localhost:8080/reservation/calAvailableDate',
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const rezValidDate = response.data.data.length;
                this.setState({ rezValidDate: rezValidDate })
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    getSelectDateEquipList(year, month, day) {
        axios.post('http://localhost:8080/reservation/readMyReservationOfSelectedDay',
            {
                year: year,
                month: month,
                day: day,
                userID: window.sessionStorage.getItem('id')
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const equipList = response.data.data;
                this.setState({ equipList: equipList });
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    selectDate = (data) => {

        console.log(data);
        this.setState({
            year: data.year,
            month: data.month,
            day: data.day,
            dayOfWeek: data.dayOfWeek,
            isHoliday: data.isHoliday,
            isRezValidDay: data.isRezValidDay
        }, () => {
            if (!this.state.isRezValidDay) {
                this.setState({ buttonText: '예약이 불가능한 날짜입니다.', isRezValid: false });
                return;
            }
            else if (this.state.isHoliday) {
                this.setState({ buttonText: '휴무일 입니다.', isRezValid: false })
            }
            else {
                this.setState({ buttonText: this.state.year + ' ' + this.state.month + '/' + this.state.day + ' 예약하기', isRezValid: true })
            }
        })
        //기구리스트 가져오기
        this.getSelectDateEquipList(data.year, data.month, data.day);

    }

    onClickReservationButton(e) {
        if (!this.state.isRezValidDay) {
            e.preventDefault();
            this.setState({ buttonText: '예약이 불가능한 날짜입니다.' });
            return;
        }

        if (this.state.isHoliday) {
            e.preventDefault();
            this.setState({ buttonText: '휴무일 입니다.' })
        }
    }

    render() {
        return (
            <div>
                <Calendar onClickDate={this.selectDate} selectedDate={this.state}
                    rezValidDate={this.state.rezValidDate} ></Calendar>
                <br />
                <ReservationEquipTray equipList={this.state.equipList}></ReservationEquipTray>
                <br />
                <StyledLink to={{
                    pathname: "/user/reservation/equip",
                    state: {
                        year: this.state.year,
                        month: this.state.month,
                        day: this.state.day,
                        equipList: this.state.equipList
                    }
                }} onClick={this.onClickReservationButton.bind(this)}>
                    <StyledButtonArea>
                        <StyledMenuText isValid={this.state.isRezValid}>
                            {this.state.buttonText}
                        </StyledMenuText>
                    </StyledButtonArea>
                </StyledLink>
            </div>
        );
    }
}

var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    padding-left : 10px;
    margin-bottom:15px;
    margin-top:15px;
    color:${props => props.isValid ? 'white' : 'red'}
`;


var StyledButtonArea = styled.div`
    width:99%;
    max-width:500px;
    margin: 0 auto;
    padding-top:10px;
    padding-bottom:10px;
    margin-top:10px;
    background-color:#404040;
    color:white;
    border-radius:6px;
`

const StyledCalendarBoard = styled.div`
    position:relative;
    background-color:orange;
    margin: 0 auto;
    width:100%;
    max-width:800px;
    height:500px;
    max-height:900px;
    margin-top:20px;
    margin-bottom:20px;
`;

const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
`;

const StyledReservationButton = styled.button`

`;


export default DateSelection;