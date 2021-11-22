import React from 'react';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
import StaticTimePickerLandscape from './OperationPolicy/gymOperationInfo';
import GymInfo from './OperationPolicy/gymInformation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Calendar from '../../../components/user/Calendar';
import ReservationEquipList from '../../../components/user/ReservationEquipTray';
import moment from 'moment';
import { ContactlessOutlined } from '@material-ui/icons';
/*   background: #F2F2F2;*/
let GyminfoBox = styled.div`
   position: relative;
   margin: 0.3px;
   left: -375px;
   top: -80px;
   width:450px;
   height: 270px;
   font-size: 9pt;
   text-align: center;
   border-radius: 5px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let GymOperinfoBox = styled.div`
   position: relative;
   margin: 0.3px;
   left: -375px;
   top: -70px;
   width:450px;
   height: 260px;
   font-size: 10pt;
   text-align: center;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let CalendarBox = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: 570px;
   top: -35px;
   width: 630px;
   height: 523px;
   font-size: 10pt;
   text-align: center;
   background: #F2F2F2;
   `;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 40px;
   margin: 0.5px;
   `;
var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    padding-left : 10px;
    margin-bottom:15px;
    margin-top:15px;
    color:${props => props.isValid ? 'white' : 'red'}
`;
const RDList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KorRDList = ["월", "화", "수", "목", "금", "토", "일"];
var rezValidDate = 0;
var holidays = [];
var selectedDay = "";
class OperPolicy extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        const currentDate = moment();
        this.state = {
            loading: false,
            ItemList: [],
            InfoList: [],
            holidays: [],
            year: currentDate.format('YYYY'),
            month: currentDate.format('MM'),
            day: currentDate.format('DD'),
            isHoliday: false,
            isRezValidDay: true,
            rezValidDate: 0,
            buttonText: '',
            isRezValid: true,
            flag: false
        };
    }
    holiyRead = function () {
        console.log("holiyRead");
        axios.get('http://localhost:8080/gymOperationInfo/holiday/read',
            {
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                console.log("length: " + (response.data).length);
                holidays = [];
                for (let i = 0; i < (response.data).length; i++) {
                    console.log((response.data[i]).gymHolidayDate);
                    let st = "";
                    for (let j = 0; j < ((response.data[i]).gymHolidayDate).length; j++) {
                        if (((response.data[i]).gymHolidayDate[j]) == "-") {
                            continue;
                        }
                        st = st + ((response.data[i]).gymHolidayDate[j]);
                        console.log("st: " + st);
                    }
                    holidays.push(st);
                    console.log(holidays);
                }
                console.log("total holidays: " + holidays);
                this.setState({
                    holidays: holidays
                })
                console.log("!!" + this.state.holidays);
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
                alert("error! 휴무일 불러오기에 실패하였습니다.");
            });
    }

    holiyCreate = function () {
        console.log("holiyCreate");
        let year = "";
        let month = "";
        let day = "";
        for (let i = 0; i < selectedDay.length; i++) {
            if (i < 4) {
                year = year + selectedDay[i];
            }
            else if (i < 6) {
                month = month + selectedDay[i];
            }
            else {
                day = day + selectedDay[i];
            }
        }
        if (window.confirm("Selected Date: " + year + "/" + month + "/" + day +
            "\n해당 날짜의 영업일을 휴무일로 바꾸시겠습니까?")) {
            axios.post('http://localhost:8080/gymOperationInfo/holiday/create',
                {
                    gymHolidayDate: selectedDay
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response.data);
                    selectedDay = "";
                    window.location.reload();
                    alert("휴무일로 변경 되었습니다.");
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    selectedDay = "";
                    alert("error! 휴무일로 변경에 실패하였습니다.");
                });
        }
        else {
            //alert("휴무일로 변경 요청을 취소하였습니다.");
        }
    }

    holiyDelete = function () {
        console.log("holiyDelete");
        let year = "";
        let month = "";
        let day = "";
        for (let i = 0; i < selectedDay.length; i++) {
            if (i < 4) {
                year = year + selectedDay[i];
            }
            else if (i < 6) {
                month = month + selectedDay[i];
            }
            else {
                day = day + selectedDay[i];
            }
        }
        if (window.confirm("Selected Date: " + year + "/" + month + "/" + day +
            "\n해당 날짜의 휴무일을 다시 영업일로 바꾸시겠습니까?")) {
            axios.post('http://localhost:8080/gymOperationInfo/holiday/delete',
                {
                    gymHolidayDate: selectedDay
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response.data);
                    selectedDay = "";
                    window.location.reload();
                    alert("영업일로 변경되었습니다.");
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    selectedDay = "";
                    alert("error! 영업일로 변경이 실패하였습니다.");
                });
        }
        else {
            //alert("영업일로 변경 요청을 취소하였습니다.");
        }
    }
    loadItem = async () => {
        //gymOperationInformation Read
        axios.get('http://localhost:8080/gymOperationInfo/read') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data);
                rezValidDate = (data.data).gymOperationInfoReservationDuration;
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: (data.data),
                    rezValidDate: rezValidDate
                });
                let StartI = 0;
                for (let i = 0; i < ((data.data).gymOperationInfoRegularHoliday).length; i++) {
                    for (let j = 0; j < 7; j++) {
                        if ((data.data).gymOperationInfoRegularHoliday[i] === KorRDList[j]) {
                            $("input:checkbox[name='ReHoliyDay']:checkbox[value=" + RDList[j] + "]").prop('checked', true);
                            StartI = j + 1;
                        }
                    }
                    for (let j = StartI; j < 7; j++) {
                        $("input:checkbox[name='ReHoliyDay']:checkbox[value=" + RDList[j] + "]").prop('checked', false);
                    }
                }
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 헬스장 운영정보 조회에 실패했습니다.");
            });
        //gyminformation Read
        axios.get('http://localhost:8080/gymInfo/read') // json을 가져온다음
            .then((data) => {
                console.log(data.data)
                this.setState({
                    loading: true,
                    InfoList: (data.data),
                });
                $("input[name=GName]").val(data.data.gymInfoName);
                $('input[name=GAddress]').val(data.data.gymInfoAddress);
                $('input[name=GPhone]').val(data.data.gymInfoPhoneNumber);
                console.log(this.state);
            })
            .catch(e => {
                console.error(e);
                this.setState({
                    loading: false
                });
                alert("error! 헬스장 정보 조회에 실패했습니다.");
            });
    };
    selectDate = (data) => {
        console.log("select! " + (data.year) + (data.month) + (data.day));
        selectedDay = (data.year) + (data.month) + (data.day);
        this.setState({
            year: data.year,
            month: data.month,
            day: data.day,
            isHoliday: data.isHoliday,
            isRezValidDay: data.isRezValidDay
        }, () => {
            if (this.state.isHoliday) {
                console.log("휴무일");
                this.setState({ isRezValid: false });
                this.setState({ flag: true });
                this.holiyDelete();
            }
            else {
                console.log("영업일");
                this.setState({ isRezValid: true })
                this.setState({ flag: false });
                this.holiyCreate();
            }
        })
    }
    componentDidMount() {
        this.loadItem();
        this.holiyRead();

        const currentDate = moment();
        const isHoliday = holidays.includes(currentDate.format("YYYY-MM-DD"));
        console.log("holidays: " + holidays);

        this.setState({
            holidays: holidays,
            isHoliday: isHoliday,
            buttonText: '',
            isRezValid: !isHoliday
        })
    }

    render() {
        const { InfoList } = this.state;
        console.log(InfoList);
        const { ItemList } = (this.state);
        console.log(ItemList);
        console.log(this.state.InfoList);
        console.log("render: " + rezValidDate);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <br />
                <center>
                    <BodyBox>
                        <GyminfoBox>
                            <GymInfo
                                id={InfoList.gymInfoID}
                                name={InfoList.gymInfoName}
                                add={InfoList.gymInfoAddress}
                                phone={InfoList.gymInfoPhoneNumber}
                            />
                        </GyminfoBox>
                        <GymOperinfoBox>
                            <StaticTimePickerLandscape
                                id={ItemList.gymOperationInfoID}
                                start={ItemList.gymOperationInfoOperatingStartTime}
                                end={ItemList.gymOperationInfoOperatingEndTime}
                                RholiyD={ItemList.gymOperationInfoRegularHoliday}
                                reserveD={ItemList.gymOperationInfoReservationDuration}
                            />
                        </GymOperinfoBox>
                        <div style={{ position: "absolute", left: "570px", top: "-67px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;휴무일 관리</label><br /><br />
                        </div>
                        <CalendarBox>
                            <Calendar onClickDate={this.selectDate} selectedDate={this.state}
                                rezValidDate={rezValidDate} holidays={this.state.holidays}></Calendar>
                            <br />
                            <StyledMenuText isValid={this.state.isRezValid}>
                                {this.state.buttonText}
                            </StyledMenuText>
                        </CalendarBox>
                    </BodyBox>
                    <div>
                        <br />
                        <br />
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}
export default OperPolicy;