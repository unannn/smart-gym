import React from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Listpage from "./Equipment/lp";
import ManagerBar from './component/menubar.js';
import DetailE from './Equipment/detailedEquipment';
import CenteredTabs from './component/menubar_cus'
let EquiList = styled.div`
 position: absolute;
 left: -30px;
 top: -50px;
   width: 770px;
   height: 540px;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
 position: absolute;
 left: 15px;
 top: -40px;
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
   left: 0px;
   top: -70px;
   margin: 0.5px;
   width: 700px;
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
    top: 10px;
    left: 20px;
    width: 615px;
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
let Num = 0;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
let aaa = "equipmentCategoryAerobic";
class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.categoryRead = this.categoryRead.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
            activePage: 15,
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

                for (let i = 0; i < data.data.length; i++) {
                    (data.data[i]).id = i;
                }
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
    detailedRead = function (EquipmentId, e) {
        console.log(e.row.equipmentID);
        console.log("detailed Read");
        axios.post('http://localhost:8080/equipment/detailedRead',
            {
                equipmentID: e.row.equipmentID
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
                /*for (var key in (response.data[0])) {
                    console.log(key);//이름
                    console.log((response.data[0])[key]);//값
                }*/
                let i = -1;
                for (var key in (response.data[0])) {
                    if ((response.data[0])[key] === 1) {
                        $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', true);
                    }
                    else {
                        $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', false);
                    }
                    i = i + 1;
                }
                localStorage.setItem("detilID", (response.data[0]).equipmentCategoryID.equipmentID);
                $("#Eid").val((response.data[0]).equipmentCategoryID.equipmentID);
                $("#Ename").val((response.data[0]).equipmentCategoryID.equipmentName);
                $("#ENth").val((response.data[0]).equipmentCategoryID.equipmentNameNth);
                //$("#imageFileOpenInput").val((response.data[0]).equipmentCategoryID.equipmentImage);
                $("#ES3").val((response.data[0]).equipmentCategoryID.equipmentImage);
                $("#Eimg").attr("src", (response.data[0]).equipmentCategoryID.equipmentImage);
                if ((response.data[0]).equipmentCategoryID.equipmentAvailable === 1) {
                    $("input:radio[name='EquiState']:radio[value='on']").prop('checked', true);
                    $("input:radio[name='EquiState']:radio[value='off']").prop('checked', false);
                }
                else {
                    $("input:radio[name='EquiState']:radio[value='on']").prop('checked', false);
                    $("input:radio[name='EquiState']:radio[value='off']").prop('checked', true);
                }
            })
            .catch((response) => {
                console.log('Error!');
                alert("error! 해당 운동기구에 대한 조회를 할 수 없습니다.\n페이지를 새로고침합니다.");
                //window.location.reload();
            });
    }
    categoryRead = function () {
        console.log("categoryRead");
        const CR = $('input[name="equiPartR"]:checked').val();
        console.log(CR);
        axios.post('http://localhost:8080/equipment/readByCategory',
            {
                equipmentCategorySelect: $('input[name="equiPartR"]:checked').val()
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
                    flog: CR
                }));
                for (let i = 0; i < response.data.length; i++) {
                    (response.data[i]).id = i;
                }
                console.log(CR + " done")
            })
            .catch((response) => {
                this.setState({
                    flog: CR
                });
                console.log('Error!');
                console.log(response);
                alert("error! 해당 카테고리 조회에 실패했습니다.");
            });
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        const columns = [
            { field: 'equipmentName', headerName: 'equipmentName', width: 200 },
            { field: 'equipmentNameNth', headerName: 'Nth', width: 120, },
            {
                field: 'equipmentCategoryList', headerName: 'Category', width: 400
            },
        ];

        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <EquiCheck>
                            <label>전체<input type="radio" name="equiPartR" value="전체" checked={(this.state).flog === "전체" ? true : false} onClick={this.loadItem} /></label>&nbsp; &nbsp;
                            <label>가슴<input type="radio" name="equiPartR" value="가슴" checked={(this.state).flog === "가슴" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>등<input type="radio" name="equiPartR" value="등" checked={(this.state).flog === "등" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp; &nbsp;
                            <label>목<input type="radio" name="equiPartR" value="목" checked={(this.state).flog === "목" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>복부<input type="radio" name="equiPartR" value="복부" checked={(this.state).flog === "복부" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>삼두<input type="radio" name="equiPartR" value="삼두" checked={(this.state).flog === "삼두" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>승모근<input type="radio" name="equiPartR" value="승모근" checked={(this.state).flog === "승모근" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>어깨<input type="radio" name="equiPartR" value="어깨" checked={(this.state).flog === "어깨" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>유산소<input type="radio" name="equiPartR" value="유산소" checked={(this.state).flog === "유산소" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>이두<input type="radio" name="equiPartR" value="이두" checked={(this.state).flog === "이두" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>하체<input type="radio" name="equiPartR" value="하체" checked={(this.state).flog === "하체" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>허리<input type="radio" name="equiPartR" value="허리" checked={(this.state).flog === "허리" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                            <label>기타<input type="radio" name="equiPartR" value="기타" checked={(this.state).flog === "기타" ? true : false} onClick={this.categoryRead} /></label>&nbsp; &nbsp;
                        </EquiCheck>
                        <div>
                            <center>
                                <EquiList>
                                    <DataGrid
                                        rows={ItemList}
                                        columns={columns}
                                        pageSize={7}
                                        rowsPerPageOptions={[5]}
                                        onCellClick={(e) => { this.detailedRead(ItemList[Num].equipmentID, e) }}
                                    />
                                </EquiList>
                            </center>
                            <DetailE />
                        </div>
                        <div style={{ position: "absolute", top: "400px" }}>
                        </div>
                    </BodyBox>
                </center>
            </div>
        )
    }
}
export default DataTable;