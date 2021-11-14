import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
//import Listpage from '../Layout/Equipment/lpL';
import EquipmentItemL from '../Layout/Equipment/equipmentItemL';
import RListpage from "./Reservation/reservationlp";
import ManagerBar from './component/menubar.js';
//require("bootstrap/less/bootstrap.less");
//background - color:"#F2F2F2";
let EquiList = styled.div`
 position: absolute;
 left: -60px;
 top: -50px;
   margin: 0.3px;
   width: 307px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ReservationList = styled.div`
    position: absolute;
    left: 235px;
    top: -53px;
   margin: 0.3px;
   width: 1100 px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
 position: relative;
   text-align: center;
   border-radius: 5px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 60px;
   `;
let RowLineBox = styled.div`
    position: absolute;
    height: 1.5px;
    background: black;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
class ReservationLog extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체",
            RItemList: [],
        };
    }

    loadItem = async () => {
        // Json Data 불러오기
        axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: data.data,
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
                localStorage.setItem("reservation", 0);
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 운동기구 목록 조회에 실패했습니다.");
            });
    };
    parentFunction = (data) => {
        console.log(data);
        console.log("check!");
        this.setState({
            RItemList: data // 이때는 load 가 false 유지
        });
        console.log(this.state.RItemList);
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        //console.log(ItemList);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-84px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 배치도</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "0px" }}>
                            <ListKey style={{ left: '-515px', top: '-85px', width: '300px', height: '30px' }}>
                                <div >
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "200px" }}>Equipment</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "50px" }}>Nth</Cell>
                                </div>
                            </ListKey>
                            <div>
                                <RowLineBox style={{ top: '-50px', left: '-55px', width: '280px' }} />
                                <EquiList>
                                    <ul className="list__itemview">
                                        {ItemList &&
                                            ItemList.map((itemdata, insertIndex) => {
                                                return (
                                                    <EquipmentItemL
                                                        key={insertIndex}
                                                        EquipmentId={itemdata.equipmentID}
                                                        EquipmentName={itemdata.equipmentName}
                                                        Category={itemdata.equipmentCategoryList}
                                                        EnthNumber={itemdata.equipmentNameNth}
                                                        apiNumber={1}
                                                        setState={this.parentFunction}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </EquiList>
                            </div>
                            <div>
                                <ListKey style={{ left: '200px', top: '-135px', width: '1080px', height: '20px' }}>
                                    <div >
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "150px" }}>ReservationID</Cell>
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "150px" }}>UserID</Cell>
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "250px" }}>Equipment/Nth</Cell>
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "190px" }}>StartTime</Cell>
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "200px" }}>EndTime</Cell>
                                        <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "80px" }}> Cancel</Cell>
                                    </div>
                                </ListKey>
                                <div>
                                    <RowLineBox style={{ top: '-50px', left: '270px', width: '1030px' }} />
                                    <ReservationList>
                                        <RListpage Itemcard={this.state.RItemList} />
                                    </ReservationList>
                                </div>
                            </div>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}
export default ReservationLog;