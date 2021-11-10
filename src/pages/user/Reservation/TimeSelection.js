import React, { Component } from 'react';
import TopBar from '../../../components/user/TopBar';
import Modal from '../../../components/user/Modal';
import styled from 'styled-components';
import TimeTable from '../../../components/user/TimeTable';

class TimeSelectionModal extends Component {
    render() {
        // var time = [];
        // for (let i = 0; i < 24; i++) {
        //     time.push((i / 10 < 1 ? '0' + i : i) + ":00");
        // }
        // console.log(time);

        // const timeList = time.map(time => <TR>{time}</TR>);
        // const timeList2 = time.map(time => <TR><Trgraph isUsing={time.includes('1')}></Trgraph></TR>);
        return (


            <Modal onClick={this.props.closeModal}>
                {this.props.children}
                <br />
                <TimeTable></TimeTable>
                {/* <StyledTimeGraph>
                    <table>
                        <td>
                            {timeList}
                        </td>
                        <td>
                            {timeList2}
                        </td>
                    </table>
                </StyledTimeGraph> */}
                <MessageStyle>
                    14:40 - 15:20
                </MessageStyle>

                <StyledStartTime>
                    <SelectStyle name="시" id="hour">
                        <OptionStyle value="0">10</OptionStyle>
                    </SelectStyle>
                    시
                    <SelectStyle name="시" id="hour">
                        <OptionStyle value="0">30</OptionStyle>
                    </SelectStyle>
                    분 부터
                </StyledStartTime>
                <StyledEndTime>
                    <SelectStyle name="시" id="hour">
                        <OptionStyle value="0">11</OptionStyle>
                    </SelectStyle>
                    시
                    <SelectStyle name="시" id="hour">
                        <OptionStyle value="0">00</OptionStyle>
                    </SelectStyle>
                    분 까지
                </StyledEndTime>
                <StyledButtonArea>
                    <StyledMenuText>
                        예약
                    </StyledMenuText>
                </StyledButtonArea>
            </Modal>
        );
    }
}

var MessageStyle = styled.div`
    margin:0 auto;
    text-align:center;
    width:200px;
    font-size:20px;
    border-radius:4px;
    background-color: blueviolet;
    color:white;
    margin-top:20px;
    margin-bottom:20px;

`;

var SelectStyle = styled.select`
    border: 0px solid #999;
    background: url('arrow.jpg') no-repeat 95% 50%;
    font-size:40px;

`;

let StyledStartTime = styled.div`
padding-left:40px;
text-align:left;
height: 60px;
width: 100%;
`;

let StyledEndTime = styled.div`
padding-right:40px;
text-align:right;
height: 60px;
width: 100%;
`;

var OptionStyle = styled.option`

`;

var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    vertical-align:middle;
    text-align: center;

`;


var StyledButtonArea = styled.div`
    height:50px;
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
overflow:scroll;
height:400px;
list-style:none;
width: 100%;
white-space:nowrap;
    background-color:rgba(255,255,255,0);
    ::-webkit-scrollbar{
        display:none;
    }
`;

var TR = styled.tr`
    height:50px;
    font-size:13px;
`;

var Trgraph = styled.div`
    display:static;
    height:50px;
    width:300px;
    font-size:13px;
    background-color:${props => props.isUsing ? '#909090' : '#FFFFFF'}
`;



export default TimeSelectionModal;