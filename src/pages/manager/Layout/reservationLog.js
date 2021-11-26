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
import ReservationItem from "./Reservation/reservationItem";
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
//require("bootstrap/less/bootstrap.less");
//background - color:"#F2F2F2";
let EquiList = styled.div`
 position: absolute;
 left: -120px;
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
    left: 175px;
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
   top: 100px;
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
let EEid;
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
        axios.post('http://localhost:8080/equipment/readAll',
            {
                select: 1
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
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: response.data,
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
            })
            .catch((response) => {
                console.error(response); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 운동기구 목록 조회에 실패했습니다.");
            });
    };
    parentFunction = (data) => {
        console.log("pare");
        console.log(data);
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
        const { RItemList } = this.state;
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-84px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-28px", float: "left" }} />
                            <label style={{ position: "relative", top: "-30px", float: "left", fontSize: "17px" }}>&nbsp;운동기구 이력 조회</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "0px" }}>
                            <ListKey style={{ left: '-575px', top: '-85px', width: '300px', height: '30px' }}>
                                <div >
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "200px" }}>Equipment</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "50px" }}>Nth</Cell>
                                </div>
                            </ListKey>
                            <div>
                                <RowLineBox style={{ top: '-50px', left: '-105px', width: '280px' }} />
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
                                <ListKey style={{ float: "left", left: '205px', top: '-184px', width: '1200px', height: "80px" }}>
                                    <Cell style={{ fontSize: '17px', width: "150px" }}>ReservationID</Cell>
                                    <Cell style={{ fontSize: '17px', width: "270px" }}>UserID</Cell>
                                    <Cell style={{ fontSize: '17px', width: "200px" }}>Equipment/Nth</Cell>
                                    <Cell style={{ fontSize: '17px', width: "190px" }}>StartTime</Cell>
                                    <Cell style={{ fontSize: '17px', width: "195px" }}>EndTime</Cell>
                                    <Cell style={{ fontSize: '17px', width: "80px" }}> Cancel</Cell>
                                </ListKey>
                                <div>
                                    <RowLineBox style={{ top: '-50px', left: '210px', width: '1105px' }} />
                                    <ReservationList>
                                        <ul className="list__itemview">
                                            {RItemList &&
                                                RItemList.map((itemdata, insertIndex) => {
                                                    return (
                                                        <ReservationItem
                                                            key={insertIndex}
                                                            ReservatopmId={itemdata.reservationID}
                                                            EquipmentName={itemdata.equipmentName}
                                                            EquipmentNameNth={itemdata.equipmentNameNth}
                                                            UserID={itemdata.userID}
                                                            StartTime={itemdata.startTime}
                                                            EndTime={itemdata.endTime}
                                                            setState={this.parentFunction}
                                                        />
                                                    );
                                                })}
                                        </ul>
                                    </ReservationList>
                                </div>
                            </div>
                        </div>
                    </BodyBox>
                    <div style={{ position: 'relative', bottom: '-600px' }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}
export default ReservationLog;