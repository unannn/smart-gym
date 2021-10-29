import React, { Component } from 'react';
import TopBar from '../../../components/user/TopBar';
import Modal from '../../../components/user/Modal';
import styled from 'styled-components';

class TimeSelectionModal extends Component {
    render() {
        return (
            <Modal onClick={this.props.closeModal}>
                {this.props.children}
                <StyledTimeGraph>
                    시간표 그래프 출력될 것
                </StyledTimeGraph>
                <StyledStartTime>
                    시간 선택
                </StyledStartTime>
                <StyledButtonArea>
                    <StyledMenuText>
                        예약
                    </StyledMenuText>
                </StyledButtonArea>
            </Modal>
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

let StyledTimeGraph = styled.div`
height: 300px;
width: 100 %;
border: 1px solid black;
`;

let StyledStartTime = styled.div`
height: 100px;
width: 100 %;
border: 1px solid black;
`;



export default TimeSelectionModal;