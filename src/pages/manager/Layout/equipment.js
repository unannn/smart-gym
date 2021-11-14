import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
//import Listpage from "./Equipment/lp";
import EquipmentItem from "./Equipment/equipmentItem";
import ManagerBar from './component/menubar.js';
import DetailE from './Equipment/detailedEquipment';
//require("bootstrap/less/bootstrap.less");
//background - color:"#F2F2F2";
let EquiList = styled.div`
 position: absolute;
 left: -px;
 top: -0px;
   width: 730px;
   height: 510px;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
 position: absolute;
 left: -10px;
 top: -55px;
   width: 670px;
   height: 100px;
   text-align: center;
   border-radius: 5px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let StyledBox = styled.div`
    background-color:#F2F2F2;
    border-radius: 10px;
    padding:20px;
    margin:0 auto;
    margin-bottom:10px;
    min-width:350px;
    max-width: 500px;
    width:98%;
    text-align:center; 
`;
let EquiCheck = styled.div`
   position: absolute;
   left: 640px;
   top: -80px;
   margin: 0.5px;
   width: 100px;
   height: 40px;
   font-size: 12pt;
   text-align: center;
   `;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 60px;
   `;
let RowLineBox = styled.div`
    position: absolute;
    top: -3px;
    left: -0px;
    width: 710px;
    height: 1.5px;
    background: black;
   `;
let ColLineBox = styled.div`
    position: absolute;
    top: 55px;
    left: 680px;
    width: 1.5px;
    height: 495px;
    background: black;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   list-style-type: none;
   `;
const KorCList = ["전체", "가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
class EquipmentM extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.categoryRead = this.categoryRead.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
        };
    }

    /*state = {
        loading: false,
        ItemList: [], // 처음 Itemlist는 있는 상태로 기획 []
    };*/
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
    categoryRead = function () {
        console.log("categoryRead");
        let data = $("#CateroryID").val();
        console.log(data);
        if (data == "전체") {
            this.loadItem();
        }
        else {
            axios.post('http://localhost:8080/equipment/readByCategory',
                {
                    equipmentCategorySelect: data
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
                    this.setState((prev) => ({
                        ItemList: response.data,
                        flog: data
                    }));
                    console.log(data + " done")
                })
                .catch((response) => {
                    this.setState({
                        flog: data
                    });
                    console.log('Error!');
                    console.log(response);
                    alert("error! 해당 카테고리 조회에 실패했습니다.");
                });
        }
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
                        <div style={{ position: "absolute", top: "-60px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 운동기구 관리</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "0px" }}>
                            <EquiCheck>
                                <Box sx={{ minWidth: 10 }}>
                                    <FormControl style={{ width: "80px" }}>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" color="secondary">
                                            Caterory
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={0}
                                            inputProps={{
                                                name: 'CateroryID',
                                                id: 'CateroryID',
                                            }}
                                            color="secondary"
                                            onChange={this.categoryRead}
                                        >
                                            {KorCList.map((ckl, index) => (
                                                <option key={index} value={ckl}>
                                                    {ckl}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </Box></EquiCheck>
                            <div>
                                <center>
                                    <ListKey>
                                        <div >
                                            <Cell style={{ textAlign: "left", position: "relative", top: "-10px", width: "190px" }}>Name</Cell>
                                            <Cell style={{ textAlign: "left", position: "relative", top: "-10px", width: "50px" }}>Nth</Cell>
                                            <Cell style={{ textAlign: "left", position: "relative", top: "-10px", width: "320px" }}>Category</Cell>
                                        </div>

                                    </ListKey>
                                    <RowLineBox />
                                    <EquiList>
                                        <ul className="list__itemview">
                                            {ItemList &&
                                                ItemList.map((itemdata, insertIndex) => {
                                                    return (
                                                        <EquipmentItem
                                                            key={insertIndex}
                                                            EquipmentId={itemdata.equipmentID}
                                                            EquipmentName={itemdata.equipmentName}
                                                            Category={itemdata.equipmentCategoryList}
                                                            EnthNumber={itemdata.equipmentNameNth}
                                                        />
                                                    );
                                                })}
                                        </ul>
                                    </EquiList>
                                </center>
                                <DetailE />
                            </div>
                            <div style={{ position: "absolute", top: "400px" }}>
                            </div>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}
//<Listpage Itemcard={ItemList} />
export default EquipmentM;