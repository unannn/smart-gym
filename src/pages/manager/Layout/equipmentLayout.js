import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
//import Listpage from "./Equipment/lpL";
import EquipmentItemL from "./Equipment/equipmentItemL";
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
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
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 60px;
   `;
let LayoutBox = styled.div`
   position: absolute;
   width: 710px;
   height: 460px;
   top: -15px;
   left: 450px;
   background: gray;
   border-radius: 2px;
   padding:5px;
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
let RowLineBox = styled.div`
    position: absolute;
    top: -52px;
    left: 10px;
    width: 280px;
    height: 1.5px;
    background: black;
   `;
let ButtonBox = styled.div`
   position: absolute;
   width: 300px;
   height: 50px;
   top: -80px;
   left: 455px;
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
class LayoutE extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.layoutUpload = this.layoutUpload.bind(this);
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
        console.log($("input-file").val());
        axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
            .then((data) => {
                console.log(data.data)
                this.setState({
                    loading: true,
                    ItemList: data.data,
                    flog: "전체"
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
        //배치도 조회
        axios.get('http://localhost:8080/gymInfo/equipmentLayout/read')
            .then((data) => {
                console.log(data);
                //서버 실행이 안되서 빈 값이 들어오는 경우 디폴트 이미지 띄우기
                if (data.data == " " || data.data == "" || data.data == null) {
                    $("#layoutImg").attr("src", "image/ImageNotFound_Layout.png");
                }
                else {
                    $("#layoutImg").attr("src", (data.data));
                }
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                $("#layoutImg").attr("src", "image/ImageNotFound_Layout.png");
                alert("error! 배치도 조회에 실패했습니다.");
            });

    };
    layoutUpload = function () {
        console.log("Layout Upload");
        var fileInput = document.querySelector("#input-file");
        const formData = new FormData();
        formData.append('gymInfoEquipmentLayout', fileInput.files[0]);
        /*for (var key of formData.keys()) {
            console.log(key);
        }

        for (var value of formData.values()) {
            console.log(value);
        }*/
        if (fileInput.files[0] == null) {
            alert("새로운 배치도가 선택되지 않았습니다.\n등록을 원할 경우 새로운 배치도를 선택해 주세요.");
        }
        else {
            if (window.confirm("해당 파일로 배치로를 등록하시겠습니까?")) {
                axios.post('http://localhost:8080/gymInfo/equipmentLayout/update', formData,
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                    .then((response) => {
                        console.log(response.data);
                        if (response.data) {
                            alert("배치도가 성공적으로 등록되었습니다.");
                        }
                        else {
                            alert("error! 배치도 등록에 실패하였습니다.");
                        }

                    })
                    .catch((response) => {
                        console.log('Error!');
                        console.log(response);
                        alert("error! 배치도 등록에 실패하였습니다.");
                    });
            }
            else {
                //alert("배치도 등록 요청이 취소되었습니다.");
                window.location.reload();
            }
        }
    }

    layoutCancel = function () {
        console.log("Layout Cancel");
        if (window.confirm("배치도 등록을 취소하시겠습니까?")) {
            alert("해당 이미지에 대해 새로운 등록 요청이 취소되었습니다.\n이미지 재선택 후, 등록 요청을 해주세요.");
            window.location.reload();
        }
    }
    rePrintImage = function (e) {
        console.log("rePrint");
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        $("#layoutImg").attr("src", imageUrl);

    }
    componentDidMount() {
        this.loadItem();
    }
    render() {

        const { ItemList } = this.state;
        return (
            <div>
                <ManagerBar></ManagerBar><br />
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-84px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 배치도</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "0px" }}>
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
                                                        apiNumber={0}
                                                    />
                                                );
                                            })}
                                    </ul>
                                </EquiList>
                            </div>
                            <LayoutBox>
                                <img src="image/ImageNotFound_Layout.png" id="layoutImg" name="layoutImg" width="700px" height="450px" />
                            </LayoutBox>
                            <ButtonBox>
                                <label className="btn btn-secondary" for="input-file">
                                    새 배치도 불러오기
                                </label>
                                <input type="file" id="input-file" style={{ display: "none" }} onChange={(e) => { this.rePrintImage(e) }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="btn btn-secondary" onClick={this.layoutUpload}>등록</Button>&nbsp;&nbsp;
                                <Button variant="btn btn-secondary" onClick={this.layoutCancel}>취소</Button>&nbsp;&nbsp;
                            </ButtonBox>
                        </div>
                    </BodyBox>
                    <div style={{ position: 'relative', bottom: '-600px' }}>
                        <br />
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}

export default LayoutE