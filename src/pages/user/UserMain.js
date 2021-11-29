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
import { scheduleJob } from 'node-schedule';

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
            usingEquipmentImage: '',
            reservationID: '',

            //다음 사용할 기구가 있을 때
            nextEqiupmentName: 'Default',
            nextEqiupmentStartTime: '11:00',
            nextEqiupmentEndTime: '11:15',
            nextEquipmentImage: '',
            nextReservationID: '',
            congestion: 0
        }
    }

    componentDidMount() {

        this.getCurrentEquipUsingInfo();

        this.setState({ pageWidth: document.getElementById('main').clientWidth });

        this.getCenterCongestion();

        this.job = scheduleJob('0,5,10,15,20,25,30,35,40,45,50,55 * * * *', () => {
            this.getCenterCongestion();
            this.getCurrentEquipUsingInfo();
        })
    }

    getCurrentEquipUsingInfo() {
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
    }

    getCenterCongestion() {
        axios.get('http://localhost:8080/gymInfo/readCongestion',

            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const congestion = response.data.data;
                this.setState({ congestion: congestion });

            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    findUsingEquipment(equipList) {
        let currentTime = moment().format('HH:mm');
        let i;
        console.log(currentTime)
        console.log('10:02' < '20:01')

        for (i = 0; i < equipList.length; i++) {

            let startTime = String(equipList[i].startTime.split('T')[1]).substring(0, 5);
            let endTime = String(equipList[i].endTime.split('T')[1]).substring(0, 5);
            console.log(endTime)

            if (currentTime >= startTime && currentTime < endTime) {
                this.setState({
                    existUsingEquipment: true,
                    usingEqiupmentName: equipList[i].equipmentName + equipList[i].equipmentNameNth,
                    usingEqiupmentStartTime: startTime,
                    usingEqiupmentEndTime: endTime,
                    usingEquipmentImage: equipList[i].equipmentImage,
                    reservationID: equipList[i].reservationID,

                }, () => console.log(endTime))
            }
            else if (currentTime < startTime) { //다음기구 설정

                this.setState({
                    existNextUsingEquipment: true,
                    nextEqiupmentName: equipList[i].equipmentName + ' ' + equipList[i].equipmentNameNth,
                    nextEqiupmentStartTime: startTime,
                    nextEqiupmentEndTime: endTime,
                    nextEquipmentImage: equipList[i].equipmentImage
                })

                break;
            }
            else {
                this.setState({
                    existUsingEquipment: false,
                    existNextUsingEquipment: false
                })
            }
        }
    }

    findNextUsingEquipment() {

    }

    EndReservation() {
        console.log(this.state.reservationID)
        axios.post('http://localhost:8080/reservation/terminateReservation',
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
                    this.setState({ existUsingEquipment: false });
                    this.getCenterCongestion();
                    this.getCurrentEquipUsingInfo();
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
            <div>
                <UserMainStyle id="main">
                    <StyledTodayRezBoard>
                        <RedirectButtonStyle onClick={(e) => {
                            this.getCenterCongestion();
                            this.getCurrentEquipUsingInfo();
                            console.log("새로고침!")
                        }

                        } style={{ cursor: 'pointer' }}>
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
                                            <img src={this.state.usingEquipmentImage} alt="" width="150px" onerror="this.src='https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg'" />
                                        </RecentEquipImage>
                                        <RecentEquipRightBottmStyle>
                                            <RemainingTimeText>남은 시간</RemainingTimeText>
                                            <Timer endTime={this.state.usingEqiupmentEndTime}></Timer>
                                            <EndButton onClick={this.EndReservation.bind(this)}>사용 종료</EndButton>
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
                                        <img src={this.state.nextEquipmentImage} alt="" width="90px" />
                                    </NextEquipImage>
                                </NextEquipStyle>
                                : <div>
                                    <NextEquipNameStyle>다음에 사용할 기구가 <br /> 없습니다.</NextEquipNameStyle></div>}


                        </ContentBox>
                        {/* 혼잡도, 타이머 */}
                        <AddInfoStyle>

                            <Congestion percentage={this.state.congestion}></Congestion>
                            <ContentBox width={this.state.pageWidth / 2 - 15 + "px"} height='130px' margin={'0 0 0 4px'}
                                backgroundColor={'white'} border={' 1px #000000 solid'}>
                                준비 중 입니다.
                            </ContentBox>
                        </AddInfoStyle>

                    </StyledTodayRezBoard>
                    <br />
                </UserMainStyle>
                <TrayAlign>
                    <ReservationEquipTray equipList={this.state.equipList}></ReservationEquipTray>
                </TrayAlign>
            </div>
        )
    }
}

const TrayAlign = styled.div`
    text-align:left;
    max-width:768px;
`;

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
    margin-left:4px;

    height: 100%;
    min-height:222px;
`;

const RecentEquipFrame = styled.div`
    position: relative;
    display:flex;

`;
const EquipTextStyle = styled.div`
`;
const EquipNameStyle = styled.div`
    font-size:28px;
`;
const EquipTimeStyle = styled.div`
    text-align:center;

`;
const UsingText = styled.div`
    margin:18px 0 0 4px;
`;



const RecentEquipImage = styled.div`
    display:inline-block;
    margin-left:4px;
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
    margin: 12px 12px 12px 0;
    float:right;
`;

const NextEquipNameStyle = styled.div`
    font-size:24px;
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
    justify-content:space-between;
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
    margin-left:4px;
`;
var StyledDate = styled.div`
    font-size:20px;
    margin-left:4px;
`;

var StyledTodayRezBoard = styled.div`
    text-align:left;
    font-size:20px;
    margin: 0 auto;
    padding-top:20px;
`;

const UserMainStyle = styled.div`
    margin: 0 auto;
    padding: 0 10px;
    max-width:768px;
`;



export default UserMain;