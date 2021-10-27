import React from 'react';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import StaticTimePickerLandscape from './component/timePicker.js';
let Gyminfo = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: -550px;
   top: 100px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let GymOperinfo = styled.div`
   position: relative;
   margin: 0.3px;
   left: -380px;
   top: 0px;
   width:450px;
   height: 150px;
   font-size: 10pt;
   text-align: center;
   background: pink;
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
   top: 60px;
   margin: 0.5px;
   background: green;
   `;

class OperPolicy extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
        };
    }
    holiyRead = function () {
        console.log("holiyRead");
        axios.post('http://localhost:8080/gymOperationInfo/holiday/read',
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
                gymHolidayDate: "2021-10-27"
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
        // Json Data 불러오기
        axios.get('http://localhost:8080/gymOperationInfo/read') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: (data.data),
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
                let i = -1;
                console.log((data.data).gymOperationInfoRegularHoliday[0]);
                /* for (var key in (data.data[0])) {
                     //console.log(key);//이름
                     //console.log("i=" + i);
                     if ((data.data[0])[key] === 1) {
                         //console.log((response.data[0])[key]);
                         $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', true);
                     }
                     else {
                         $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', false);
                     }
                     i = i + 1;
                 }*/
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
            });
    };

    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = (this.state);
        console.log(ItemList.gymOperationInfoID);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <br />
                <center>
                    <BodyBox>
                        <GymOperinfo>
                            <StaticTimePickerLandscape
                                id={ItemList.gymOperationInfoID}
                                start={ItemList.gymOperationInfoOperatingStartTime}
                                end={ItemList.gymOperationInfoOperatingEndTime}
                                RholiyD={ItemList.gymOperationInfoRegularHoliday}
                                reserveD={ItemList.gymOperationInfoReservationDuration}
                            />
                        </GymOperinfo>
                        <label>휴무일 입력</label><input type="text" id="holiy" name="hoily" />
                        <button onClick={this.holiyCreate}>등록</button>
                        <button onClick={this.holiyRead}>조회</button>
                        <button onClick={this.holiyDelete}>삭제</button>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default OperPolicy;