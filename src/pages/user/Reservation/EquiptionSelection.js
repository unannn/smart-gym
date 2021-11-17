import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TopBar from '../../../components/user/TopBar';
import styled from "styled-components";
import ReservationEquipTray from '../../../components/user/ReservationEquipTray';
import EquipList from '../../../components/user/EquipList';
import TimeSelectionModal from './TimeSelection';
import { CollectionsOutlined } from '@material-ui/icons';

class DateSelection extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.location.state)

        this.state = {
            modal: false,
            data: this.props.location.state,
            selectedEquip: ''
        }
    }

    componentDidMount() {
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
                <ReservationEquipTray canDelete={true} equipList={this.state.data.equipList}></ReservationEquipTray>
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
    background-color: #E0E0E0;
    margin: 0 auto;
    width:100%;
    max-width:600px;
    height:500px;
    max-height:900px;
    margin-top:20px;

`;

const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
`;



export default withRouter(DateSelection);