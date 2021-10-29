import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/TopBar';
import styled from "styled-components";
import Calendar from '../../../components/Calendar';
import ReservationEquipList from '../../../components/ReservationEquipList';

class DateSelection extends Component {
    render() {
        return (
            <div>
                <TopBar>기구 예약 - 날짜 선택</TopBar>
                <br />
                <StyledCalendarBoard>
                    <Calendar></Calendar>
                </StyledCalendarBoard>
                <br />
                <ReservationEquipList></ReservationEquipList>
                <br />
                <StyledLink to="/user/reservation/equip">
                    <StyledButtonArea>
                        <StyledMenuText>
                            10/30 예약하기
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