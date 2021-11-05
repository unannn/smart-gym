import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Listpage from "./Equipment/lpL";
import ManagerBar from './component/menubar.js';
let EquiList = styled.div`
 position: relative;
 left: -400px;
   margin: 0.3px;
   width: 300px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   background: #F2F2F2;
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
   top: 50px;
   left: 450px;
   background: gray;
   border-radius: 2px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ButtonBox = styled.div`
   position: absolute;
   width: 300px;
   height: 50px;
   top: 0px;
   left: 650px;
   `;
let InputButton = styled.input`
    background-color:#404040;
	padding-top:5px;
	font-family:tahoma;
	font-size:18px;
	color:white;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    width:80px;
    height:30px;
    font-size:16px;
`;
let FileButton = styled.input`
    background-color:#404040;
	padding-top:5px;
	font-family:tahoma;
	font-size:18px;
	color:white;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size:16px;
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
                if (data.data == " " || data.data == null) {
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
            if (window.confirm("정말로 등록하시겠습니까?")) {
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
                alert("배치도 등록 요청이 취소되었습니다.");
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
                        <div>
                            <EquiList>
                                <Listpage Itemcard={ItemList} />
                            </EquiList>
                        </div>
                        <ButtonBox>
                            <label className="btn btn-secondary" for="input-file">
                                새 배치도 불러오기
                            </label>
                            <input type="file" id="input-file" style={{ display: "none" }} onChange={(e) => { this.rePrintImage(e) }} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="btn btn-secondary" onClick={this.layoutUpload}>등록</Button>&nbsp;&nbsp;
                            <Button variant="btn btn-secondary" onClick={this.layoutCancel}>취소</Button>&nbsp;&nbsp;
                        </ButtonBox>
                        <LayoutBox>
                            <img src="image/ImageNotFound_Layout.png" id="layoutImg" name="layoutImg" width="700px" height="450px" />
                        </LayoutBox>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default LayoutE