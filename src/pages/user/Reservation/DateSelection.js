import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/user/TopBar';
import styled from "styled-components";
import Calendar from '../../../components/user/Calendar';
import ReservationEquipList from '../../../components/user/ReservationEquipList';
import moment from 'moment';

class DateSelection extends Component {
    constructor(props) {
        super(props);
        const currentDate = moment();
        this.state = {
            year: currentDate.format('YYYY'),
            month: currentDate.format('MM'),
            day: currentDate.format('DD'),
            rezValidDate: 0
        }
    }

    componentDidMount() {
        //예약 가능 날짜 설정
        // this.selectDate({
        //     rezValidDate: 4
        // })
    }

    selectDate = (data) => {
        this.setState({
            year: data.year,
            month: data.month,
            day: data.day
        })
    }


    render() {
        const rezValidDate = 4;
        let holidays = ["20211106", "20211113", "20211120"];
        return (
            <div>
                <TopBar>기구 예약 - 날짜 선택</TopBar>
                <br />
                {/* 
                [예약가능 날짜 면수] 
                rezValidDate 정수로 몇일인지 주면됨 ex) rezValidDate={4}
                
                [선택 날짜 가져오는 메소드]
                onClickDate 아래와 같은메소드를 통해 사용, setState 아래에 사용하고자 하는 코드 넣어주면 됨 
                    selectDate = (data) => {
                    this.setState({
                        year: data.year,
                        month: data.month,
                        day: data.day
                    })
                }
                [현재 선택 날짜]
                onClickDate를 통해설정한 선택한 날짜를 보내줌 this.state 보내주면 됨

                [휴무일로 선택하고자 하는 날짜 리스트]
                holidays 에 배열로 설정후 넣어주기 ex)["20211106", "20211113", "20211120"]
                */}
                <Calendar onClickDate={this.selectDate} selectedDate={this.state}
                    rezValidDate={rezValidDate} holidays={holidays}></Calendar>
                <br />
                <ReservationEquipList></ReservationEquipList>
                <br />
                <StyledLink to="/user/reservation/equip">
                    <StyledButtonArea>
                        <StyledMenuText>
                            {this.state.year} {this.state.month}/{this.state.day} 예약하기
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