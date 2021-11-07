import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../../../components/user/TopBar';
import styled from "styled-components";
import ReservationEquipTray from '../../../components/user/ReservationEquipTray';
import EquipList from '../../../components/user/EquipList';
import TimeSelectionModal from './TimeSelection';

class DateSelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            selectedEquip: ''
        }
    }
    openEquipRezModal(e) {
        console.log(e.target.innerText)
        this.setState({
            modal: true,
            selectedEquip: e.target.innerText
        })
    }

    closeModal(e) {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
        return (
            <StyledDateSelection>
                <TopBar>기구 예약 - 운동기구 선택</TopBar>
                <br />
                <StyledEquipBoard>
                    <EquipList openEquipRezModal={this.openEquipRezModal.bind(this)}></EquipList>
                </StyledEquipBoard>
                <br />
                <ReservationEquipTray canDelete={true}></ReservationEquipTray>
                <br />
                <StyledLink to="/user">
                    <StyledButtonArea>
                        <StyledMenuText>
                            10/30 예약 완료
                        </StyledMenuText>
                    </StyledButtonArea>
                </StyledLink>
                {this.state.modal ? <TimeSelectionModal closeModal={this.closeModal.bind(this)}>
                    {this.state.selectedEquip}
                </TimeSelectionModal> : ''}
            </StyledDateSelection>
        );
    }
}
var StyledDateSelection = styled.div`
`;

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

const StyledEquipBoard = styled.div`
    position:relative;
    background-color: grey;
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