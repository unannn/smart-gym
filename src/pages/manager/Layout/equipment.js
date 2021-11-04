import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Listpage from "./component/lp";
import ManagerBar from './component/menubar.js';
import DetailE from './component/detailedEquipment';
let EquiList = styled.div`
 position: relative;
 left: -250px;
   width: 670px;
   height: 500px;
   text-align: center;
   background-color:#F2F2F2;
   overflow:auto;
   border-radius: 10px;
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
   top: 15px;
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
            });
    };
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
                })

                );
                console.log(CR + " done")
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
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
                        <EquiCheck>
                            <label>전체<input type="radio" name="equiPartR" value="전체" checked={(this.state).flog === "전체" ? true : false} onClick={this.loadItem} /></label>&nbsp;&nbsp;
                            <label>가슴<input type="radio" name="equiPartR" value="가슴" checked={(this.state).flog === "가슴" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>등<input type="radio" name="equiPartR" value="등" checked={(this.state).flog === "등" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;&nbsp;
                            <label>목<input type="radio" name="equiPartR" value="목" checked={(this.state).flog === "목" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>복부<input type="radio" name="equiPartR" value="복부" checked={(this.state).flog === "복부" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>삼두<input type="radio" name="equiPartR" value="삼두" checked={(this.state).flog === "삼두" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>승모근<input type="radio" name="equiPartR" value="승모근" checked={(this.state).flog === "승모근" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>어깨<input type="radio" name="equiPartR" value="어깨" checked={(this.state).flog === "어깨" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>유산소<input type="radio" name="equiPartR" value="유산소" checked={(this.state).flog === "유산소" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>이두<input type="radio" name="equiPartR" value="이두" checked={(this.state).flog === "이두" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>하체<input type="radio" name="equiPartR" value="하체" checked={(this.state).flog === "하체" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>허리<input type="radio" name="equiPartR" value="허리" checked={(this.state).flog === "허리" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                            <label>기타<input type="radio" name="equiPartR" value="기타" checked={(this.state).flog === "기타" ? true : false} onClick={this.categoryRead} /></label>&nbsp;&nbsp;
                        </EquiCheck>
                        <div>
                            <center>
                                <EquiList>
                                    <Listpage Itemcard={ItemList} />
                                </EquiList>
                            </center>
                            <DetailE></DetailE>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}
export default EquipmentM;