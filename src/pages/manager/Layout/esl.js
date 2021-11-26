import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Button } from 'react-bootstrap';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import EquipmentItemL from "./Equipment/equipmentItemL";
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
import ESLInfo from './ESL/eslInformation';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
//background - color:"#F2F2F2";
let EquiList = styled.div`
 position: absolute;
 left: 15px;
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
let ListKey = styled.div`
 position: relative;
 left: -435px;
 top: -85px;
   width: 300px;
   height: 30px;
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
let VideoBox = styled.div`
   position: absolute;
   top: 100px;
   left: 300px;
   height: 380px;
   width: 660px;
   border: 10px solid gray;
   background: black;
   box-shadow : rgba(0,0,0,0.5) 0 0 0 9999px, rgba(0,0,0,0.5) 2px 2px 3px 3px;
   z-index : 100;
   `;
let RowLineBox = styled.div`
    position: absolute;
    top: -52px;
    left: 10px;
    width: 280px;
    height: 1.5px;
    background: black;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   width: 220px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
class ESLManage extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.modalClose = this.modalClose.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flag: false,
            urlLink: "",
            Hvalue: "90px",
        };
    }

    loadItem = async () => {
        // Json Data 불러오기
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
        console.log(data);
        this.setState({
            urlLink: data,
            Hvalue: "400px",
            flag: true
        });
    }
    modalClose = function () {
        this.setState({
            flag: false
        });
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
                        <div style={{ position: "absolute", top: "-80px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "7px", float: "left" }} />
                            <label style={{ position: "relative", top: "5px", float: "left", fontSize: "17px" }}>&nbsp;ESL 장치관리</label><br /><br />
                        </div>
                        <Link to='eslCreate' style={{ color: "black" }}>
                            <Button variant="btn btn-secondary" style={{ position: "relative", top: "-50px", left: "570px" }}>ESL 등록하러 가기</Button>
                        </Link>
                        <div style={{ position: "relative", top: "64px", left: "0px" }}>
                            <ListKey>
                                <div >
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "200px" }}>Equipment</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "50px" }}>Nth</Cell>
                                </div>
                            </ListKey>
                            <div>
                                <RowLineBox />
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
                                                        apiNumber={2}
                                                        ESL={itemdata.eslid}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </EquiList>
                            </div>
                        </div>
                        <div style={{ position: "relative", top: '-20px' }}>
                            <ESLInfo parentFunction={this.parentFunction} />
                        </div>
                        {this.state.flag ?
                            <div>
                                <VideoBox>
                                    <img src="./icon/icon_power_white.png" width="18px" style={{ position: "relative", top: "-40px", left: '325px', cursor: "pointer" }} onClick={this.modalClose} />
                                    <ReactPlayer style={{ position: "relative", top: "-25px", left: '0px' }} id="urlLink" url={this.state.urlLink} playing controls />
                                </VideoBox>
                            </div> : <div />}
                    </BodyBox>
                    <div style={{ position: 'relative', bottom: '-650px' }}>
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}
export default ESLManage;