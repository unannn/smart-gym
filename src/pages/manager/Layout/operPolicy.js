import React from 'react';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import StaticTimePickerLandscape from './OperationPolicy/gymOperationInfo';
import GymInfo from './OperationPolicy/gymInformation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

let GyminfoBox = styled.div`
   position: relative;
   margin: 0.3px;
   left: -375px;
   top: 0px;
   width:450px;
   height: 270px;
   font-size: 9pt;
   text-align: center;
   background: pink;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let GymOperinfoBox = styled.div`
   position: relative;
   margin: 0.3px;
   left: -375px;
   top: 20px;
   width:450px;
   height: 250px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let GymHoliyDay = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: -550px;
   top: 340px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let GymReHoliyDay = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: -550px;
   top: 460px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 40px;
   margin: 0.5px;
   `;
const RDList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KorRDList = ["월", "화", "수", "목", "금", "토", "일"];
class OperPolicy extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ItemList: [],
            InfoList: [],
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
                console.log(response.data)
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }

    holiyCreate = function () {
        console.log("holiyCreate");
        axios.post('http://localhost:8080/gymOperationInfo/holiday/create',
            {
                gymHolidayDate: "2021-11-27"
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }

    holiyDelete = function () {
        console.log("holiyDelete");
        axios.post('http://localhost:8080/gymOperationInfo/holiday/delete',
            {
                gymHolidayID: 1
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }
    loadItem = async () => {
        //gymOperationInformation Read
        axios.get('http://localhost:8080/gymOperationInfo/read') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: (data.data)
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
            });
    };

    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { InfoList } = this.state;
        console.log(InfoList);
        const { ItemList } = (this.state);
        console.log(ItemList);
        console.log(this.state.InfoList);
        /*
                                <label>휴무일 입력</label><input type="text" id="holiy" name="hoily" />
                        <button onClick={this.holiyCreate}>등록</button>
                        <button onClick={this.holiyRead}>조회</button>
                        <button onClick={this.holiyDelete}>삭제</button>
        */
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
                    </BodyBox>
                </center>
            </div >
        )
    }
}
export default OperPolicy;