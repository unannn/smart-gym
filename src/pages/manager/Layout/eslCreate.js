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
import ESLItem from "./ESL/eslItem";
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
import ESLMatchBox from './ESL/eslMatch';
import EEItem from './ESL/eEItem';
import { Link } from 'react-router-dom';
//background - color:"#F2F2F2";
let ESLList = styled.div`
 position: absolute;
 left: -80px;
 top: -50px;
   margin: 0.3px;
   width: 460px;
   height: 520px;
   font-size: 10pt;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let EELList = styled.div`
 position: absolute;
 left: 400px;
 top: -50px;
   margin: 0.3px;
   width: 460px;
   height: 520px;
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
let RowLineBox = styled.div`
    position: absolute;
    top: -52px;
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
let SearchBox = styled.input`
 position: relative;
 background-color: #F8F8F8;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:black;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:100px;
    height:38px;
    top: -130px;
    left: 18px;
    border: 3px solid gray;
   `;
class ESLCreate extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.ESLItemCreate = this.ESLItemCreate.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            ESLItemList: [],
        };
    }

    loadItem = async () => {
        //ESL목록 조회
        axios.get('http://localhost:8080/esl/read') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ESLItemList: data.data,
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 운동기구 목록 조회에 실패했습니다.");
            });
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

    ESLItemCreate = function () {
        console.log("Create");
        console.log($("#ESLCreateID").val());

        axios.post('http://localhost:8080/esl/create',
            {
                eslID: $("#ESLCreateID").val()
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
                if (response.data == 0) {
                    alert("ESL이 추가되었습니다.");
                    this.loadItem();
                }
                else if (response.data == 1) {
                    alert("ESL ID를 입력 후, 생성해주세요.");
                }
                else if (response.data == 2) {
                    alert("이미 존재하는 ESL ID입니다.");
                }
                //3
                else {
                    alert("error! ESL 추가에 실패했습니다.");
                }
            })
            .catch((response) => {
                console.error(response); // 에러표시
                alert("error! ESL 추가에 실패했습니다.");
            });
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        const { ESLItemList } = this.state;
        //console.log(ItemList);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-80px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "7px", float: "left" }} />
                            <label style={{ position: "relative", top: "5px", float: "left", fontSize: "17px" }}>&nbsp;{"ESL 장치관리 > ESL 등록"}</label><br /><br />
                        </div>
                        <Link to='esl' style={{ color: "black" }}>
                            <Button variant="btn btn-secondary" style={{ position: "relative", top: "-50px", left: "570px" }}>ESL 조회하러 가기</Button>
                        </Link>
                        <div style={{ position: "relative", top: "64px", left: "0px" }}>
                            <ListKey style={{ width: "730px", left: "-300px", top: "-85px" }}>
                                <div >
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "80px" }}>ESLID</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "120px" }}>EquipmentID</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "140px" }}>ReservationID</Cell>
                                    <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "80px" }}>Delete</Cell>
                                </div>
                            </ListKey>
                            <div>
                                <RowLineBox style={{ left: '-55px', width: '418px' }} />
                                <ESLList>
                                    <ul className="list__itemview">
                                        {ESLItemList &&
                                            ESLItemList.map((itemdata, insertIndex) => {
                                                return (
                                                    <ESLItem
                                                        key={insertIndex}
                                                        ESLId={itemdata.eslID}
                                                        EquipmentId={itemdata.equipmentID}
                                                        ReservationId={itemdata.reservationID}
                                                        reloadF={this.loadItem}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </ESLList>

                                <div style={{ position: "relative", top: "64px", left: "10px" }}>
                                    <ListKey style={{ width: "600px", left: "85px", top: "-200px" }}>
                                        <div>
                                            <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "120px" }}>EquipmentID</Cell>
                                            <Cell style={{ position: "relative", top: "-30px", float: 'left', fontSize: '17px', width: "200px" }}>Equipment/Nth</Cell>
                                        </div>
                                    </ListKey>
                                </div>
                                <RowLineBox style={{ left: '400px', width: '420px' }} />
                                <EELList>
                                    <ul className="list__itemview">
                                        {ItemList &&
                                            ItemList.map((itemdata, insertIndex) => {
                                                return (
                                                    <EEItem
                                                        key={insertIndex}
                                                        ESLId={itemdata.eslid}
                                                        EquipmentId={itemdata.equipmentID}
                                                        EquipmentName={itemdata.equipmentName}
                                                        EquipmentNth={itemdata.equipmentNameNth}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </EELList>
                            </div>
                        </div>
                        <ESLMatchBox />
                        <SearchBox id="ESLCreateID" name="ESLCreateID" style={{ position: "relative", top: '-165.5px', left: '-660px' }} />
                        <Button variant="btn btn-secondary" onClick={this.ESLItemCreate} style={{ position: "relative", top: '-170px', left: '-655px' }}>ESL생성</Button>
                    </BodyBox >
                    <div style={{ position: 'relative', bottom: '-650px' }}>
                        <br />
                        <Footer />
                    </div>
                </center >
            </div >
        )
    }
}
export default ESLCreate;