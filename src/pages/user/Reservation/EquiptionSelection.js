import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TopBar from '../../../components/user/TopBar';
import styled from "styled-components";
import ReservationEquipTray from '../../../components/user/ReservationEquipTray';
import EquipList from '../../../components/user/EquipList';
import TimeSelectionModal from './TimeSelectionModal';
import { CollectionsOutlined } from '@material-ui/icons';
import axios from "axios";
import $ from "jquery";

class DateSelection extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state)

        this.state = {
            deleteEquipModal: false,
            modal: false,
            data: null,
            equipList: [],
            selectedEquipmentID: ''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("getDerivedStateFromProps");
        console.log(nextProps.location.state.equipList);
        return { data: nextProps.location.state };
    }

    componentDidMount() {
        $('.EquipScroll').scrollLeft(10000)
        this.getEquipListSelectedDay();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.modal === true && this.state.modal === false) {
            console.log(prevState.modal);
            console.log(this.state.modal === false);
            this.getEquipListSelectedDay();
        }
    }

    getEquipListSelectedDay() {
        axios.post('http://localhost:8080/reservation/readMyReservationOfSelectedDay',
            {
                year: this.props.location.state.year,
                month: this.props.location.state.month,
                day: this.props.location.state.day,
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

                this.setState({ equipList: equipList }, () => $('.EquipScroll').scrollLeft(10000));
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    openEquipRezModal(e) {
        console.log(e.target.innerText)
        this.setState({
            modal: true,
            selectedEquip: e.target.innerText,
            selectedEquipmentID: e.target.id
        })
    }

    closeModal(e) {
        this.setState({
            modal: !this.state.modal
        })
    }

    cancelReservation(reservationID) {
        axios.post('http://localhost:8080/reservation/cancleReservation',
            {
                reservationID: reservationID
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const res = response.data;
                if (res.success && res.data) {
                    console.log("success!!!")
                    this.getEquipListSelectedDay();
                }

            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }


    render() {
        return (
            <StyledDateSelection>
                {this.state.data.year + '.' + this.state.data.month + '.' + this.state.data.day}
                <StyledEquipBoard>
                    <EquipList openEquipRezModal={this.openEquipRezModal.bind(this)}></EquipList>
                </StyledEquipBoard>
                <TrayAlign>
                    <ReservationEquipTray canDelete={true} equipList={this.state.equipList} cancelReservation={this.cancelReservation.bind(this)}></ReservationEquipTray>
                </TrayAlign>
                <StyledLink to="/user/reservation/date">
                    <StyledButtonArea>
                        <StyledMenuText>
                            {this.state.data.month + '/' + this.state.data.day} 예약 완료
                        </StyledMenuText>
                    </StyledButtonArea>
                </StyledLink>
                {this.state.modal ? <TimeSelectionModal closeModal={this.closeModal.bind(this)}
                    date={this.state.data} equipmentID={this.state.selectedEquipmentID} userEquipList={this.state.equipList}>
                    {this.state.selectedEquip}
                </TimeSelectionModal> : ''}
            </StyledDateSelection>
        );
    }
}
var StyledDateSelection = styled.div`
    height:100%;

`;


const StyledEquipBoard = styled.div`
    position:relative;
    background-color: #E0E0E0;
    margin: 0 auto;
    width:100%;
    max-width:600px;

    height:100%;
    max-height:900px;

`;

var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    padding-left : 10px;
    margin-bottom:15px;
    margin-top:15px;
`;


var StyledButtonArea = styled.div`
    width:90%;
    max-width:500px;
    margin: 0 auto;
    padding-top:10px;
    padding-bottom:10px;
    margin-top:10px;
    background-color:#404040;
    color:white;
    border-radius:6px;
`


const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
`;

const TrayAlign = styled.div`
    text-align:left;
    margin-top:20px;
`;

export default withRouter(DateSelection);