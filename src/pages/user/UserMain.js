import React from 'react';
import styled from "styled-components";
import TopBar from '../../components/user/TopBar';
import { Link } from 'react-router-dom';
import ReservationEquipTray from '../../components/user/ReservationEquipTray';
import moment from 'moment';
import axios from "axios";
import ContentBox from '../../components/user/ContentBox';
import Congestion from '../../components/user/Congestion';
import Timer from '../../components/user/Timer';

class UserMain extends React.Component {

    constructor(props) {
        super(props);

        const currentDate = moment();
        this.state = {
            year: currentDate.format('YYYY'),
            month: currentDate.format('MM'),
            day: currentDate.format('DD'),
            equipList: [],
            pageWidth: null,

            existUsingEquipment: false,
            existNextUsingEquipment: false,

            //현재 사용중인 기구가 있을 때
            usingEqiupmentName: 'Default',
            usingEqiupmentStartTime: '',
            usingEqiupmentEndTime: '',
            reservationID: '',

            //다음 사용할 기구가 있을 때
            nextEqiupmentName: 'Default',
            nextEqiupmentStartTime: '11:00',
            nextEqiupmentEndTime: '11:15',
            nextReservationID: ''
        }
    }

    componentDidMount() {
        axios.post('http://localhost:8080/reservation/readMyReservationOfSelectedDay',
            {
                year: this.state.year,
                month: this.state.month,
                day: this.state.day,
                userID: window.sessionStorage.getItem('id'),
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const equipList = response.data.data;
                console.log(equipList)
                this.setState({ equipList: equipList });
                this.findUsingEquipment(equipList)
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

        this.setState({ pageWidth: document.getElementById('main').clientWidth })
    }

    findUsingEquipment(equipList) {
        let currentTime = moment().format('HH:mm');
        let i;
        console.log(currentTime)
        console.log('10:02' < '20:01')

        for (i = 0; i < equipList.length; i++) {

            let startTime = String(equipList[i].startTime.split('T')[1]).substring(0, 5);
            let endTime = String(equipList[i].endTime.split('T')[1]).substring(0, 5);

            console.log(startTime);
            console.log(endTime);

            if (currentTime >= startTime && currentTime <= endTime) {

                this.setState({
                    existUsingEquipment: true,
                    usingEqiupmentName: equipList[i].equipmentName + equipList[i].equipmentNameNth,
                    usingEqiupmentStartTime: startTime,
                    usingEqiupmentEndTime: endTime,
                    reservationID: equipList[i].reservationID
                })
            }
            // else if (currentTime <= startTime) {

            //     this.setState({
            //         existUsingEquipment: true,
            //         usingEqiupmentName: equipList[i].equipmentName + ' ' + equipList[i].equipmentNameNth,
            //         usingEqiupmentStartTime: startTime,
            //         usingEqiupmentEndTime: endTime,
            //         reservationID: equipList[i].reservationID
            //     })
            //     break;
            // }
        }
    }

    findNextUsingEquipment() {

    }

    EndReservation() {
        axios.post('http://localhost:8080/reservation/cancleReservation',
            {
                reservationID: this.state.reservationID
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const isSucess = response.data.data;
                if (isSucess) {
                    this.setState({ existUsingEquipment: false })
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    render() {
        const today = this.state.year + "년 " + this.state.month + "월 " + this.state.day + "일 현재";
        return (
            <UserMainStyle id="main">
                <StyledTodayRezBoard>
                    <RedirectButtonStyle onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
                        새로고침
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                        </svg>
                    </RedirectButtonStyle>

                    <StyledUserName>이윤환 님,</StyledUserName>
                    <StyledDate>{today}</StyledDate>

                    <RecentEquipStyle>
                        {this.state.existUsingEquipment ?
                            <div>
                                <RecentEquipFrame>
                                    <EquipTextStyle>
                                        <EquipNameStyle>{this.state.usingEqiupmentName}</EquipNameStyle>
                                        <EquipTimeStyle>{this.state.usingEqiupmentStartTime + '-' + this.state.usingEqiupmentEndTime}</EquipTimeStyle>
                                    </EquipTextStyle>
                                    <UsingText>사용 중 입니다.</UsingText>
                                </RecentEquipFrame>
                                <RecentEquipIOStyle>
                                    <RecentEquipImage>
                                        <img src="\image\equip-test-image.png" alt="" width="150px" />
                                    </RecentEquipImage>
                                    <RecentEquipRightBottmStyle>
                                        <RemainingTimeText>남은 시간</RemainingTimeText>
                                        <Timer endTime={this.state.usingEqiupmentEndTime}></Timer>
                                        <EndButton >사용 종료</EndButton>
                                    </RecentEquipRightBottmStyle>
                                </RecentEquipIOStyle>
                            </div>
                            : <EquipNameStyle>사용 중인 기구가 <br /> 없습니다.</EquipNameStyle>}


                    </RecentEquipStyle>
                    {/* 다음 운동기구 */}
                    <ContentBox width={this.state.pageWidth + "px"} height='130px'
                        backgroundColor={'#81D4FD'} border={' 1px #81D4FD solid'}>
                        {this.state.existNextUsingEquipment ?
                            <NextEquipStyle>
                                <NextEquipTextStyle>
                                    <NextEquipMessageStyle>다음에 사용할 기구</NextEquipMessageStyle>
                                    <NextEquipNameStyle>{this.state.nextEqiupmentName}</NextEquipNameStyle>
                                    <NextEquipTimeStyle>{this.state.nextEqiupmentStartTime + '-' + this.state.nextEqiupmentEndTime}</NextEquipTimeStyle>
                                </NextEquipTextStyle>

                                <NextEquipImage>
                                    <img src="\image\equip-test-image.png" alt="" width="90px" />
                                </NextEquipImage>
                            </NextEquipStyle>
                            : <div>
                                <NextEquipNameStyle>다음에 사용할 기구가 <br /> 없습니다.</NextEquipNameStyle></div>}


                    </ContentBox>
                    {/* 혼잡도, 타이머 */}
                    <AddInfoStyle>
                        <ContentBox width={this.state.pageWidth / 2 - 15 + "px"} height='130px' margin='0 4px 0 0'
                            backgroundColor={'red'} border={' 2px red solid'}>
                            <Congestion percentage={72}></Congestion>
                        </ContentBox>
                        <ContentBox width={this.state.pageWidth / 2 - 15 + "px"} height='130px' margin={'0 0 0 4px'}
                            backgroundColor={'white'} border={' 1px #000000 solid'}>
                            준비 중 입니다.
                        </ContentBox>
                    </AddInfoStyle>

                    <ReservationEquipTray equipList={this.state.equipList}></ReservationEquipTray>
                </StyledTodayRezBoard>
                <br />
            </UserMainStyle>
        )
    }
}

var RedirectButtonStyle = styled.div`
    
    display:block;
    float:right;
    margin-bottom:12px;
    margin-right:12px;
`
// 현재 운동중인 기구
var RecentEquipStyle = styled.div`
    font-size:20px;
    margin-top:15px;
    margin-bottom:15px;
    margin-left:15px;

    height: 250px;
`;

const RecentEquipFrame = styled.div`
    position: relative;
    display:flex;

`;
const EquipTextStyle = styled.div`
`;
const EquipNameStyle = styled.div`
    font-size:35px;
`;
const EquipTimeStyle = styled.div`
    text-align:center;

`;
const UsingText = styled.div`
    margin:18px 0 0 10px;
`;



const RecentEquipImage = styled.div`
    display:inline-block;
    margin-left:10px;
`;



const RecentEquipIOStyle = styled.div`
    position: relative;
    display:flex;
    max-width:355px;
`;

const RecentEquipRightBottmStyle = styled.div`
    text-align:center;
    margin-left:50px;
    margin-top:10px;
`;

const RemainingTimeText = styled.div`
font-size:16px;
`;
const RemainingTime = styled.div`
    font-size:28px;
    font-weight:610;
    margin-bottom:20px;
`;
const EndButton = styled.div`
    background-color:orange;
    border-radius:4px;
    padding:10px;
    font-size:20px;
    &:hover,
    &:focus {
        background-color: red;
        color:white;
    }
`;


// 디음 운동 할 기구

const NextEquipImage = styled.div`
    margin: 12px 12px 12px 40px;
    float:right;
`;

const NextEquipNameStyle = styled.div`
    font-size:30px;
    text-align:center;
    padding-top:12px;
`;
const NextEquipMessageStyle = styled.div`
    text-align:center;
    font-size:16px;
`;

const NextEquipTimeStyle = styled.div`
    text-align:center;
    font-size:16px;

`;

const NextEquipStyle = styled.div`
    display:flex;
    padding:10px;
    width:100%;
    min-width:355px;
    margin:0 auto;
`;

const NextEquipTextStyle = styled.div`
    display:inline-block;
    padding-left:10px;
`;


//

const AddInfoStyle = styled.div`
    margin-top:10px;

    display:flex;
    justify-content: space-between;

`;

var StyledUserName = styled.div`
    font-size:24px;
    margin-bottom:12px;
    margin-left:12px;
`;
var StyledDate = styled.div`
    font-size:20px;
    margin-left:12px;
`;

var StyledTodayRezBoard = styled.div`
    text-align:left;
    font-size:20px;
    margin: 0 auto;
`;

const UserMainStyle = styled.div`
    margin: 0 auto;
    padding: 0 10px;
    max-width:768px;
`;



export default UserMain;