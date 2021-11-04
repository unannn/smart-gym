import React from 'react';
import axios from 'axios';
import $ from "jquery";
import { Button } from 'react-bootstrap';
import jquery from 'jquery';
import styled from 'styled-components';
import ManagerBar from './component/menubar.js';

let EquiInfo = styled.div`
   position: relative;
   margin: 0.5px;
   top: 60px;
   width: 800px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   background: #F2F2F2;
   `;

let InfoInput = styled.input`
   background-color: #FFFFFF;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#000000;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:225px;
    height:30px;
   `;

let ImageBox = styled.div`
   position: relative;
   margin: 0.5px;
   top: 50px;
   left: 100px;
   width: 135px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   `;
let InputInfoBox = styled.div`
   position: relative;
   margin: 0.5px;
   top: -280px;
   left: 380px;
   width: 360px;
   height: 200px;
   font-size: 10pt;
   text-align: center;
   `;
let RegisterBox = styled.div`
   position: relative;
   margin: 0.5px;
   top: -155px;
   left: 700px;
   width: 65px;
   height: 45px;
   font-size: 10pt;
   text-align: center;
   `;
let LayoutBox = styled.div`
   position: relative;
   width: 330px;
   height: 330px;
   top: 10px;
   left: -200px;
   background: gray;
   border-radius: 2px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
class CreateEqui extends React.Component {

    createEquipment = function () {
        let flag = -1;
        let ECList = "";
        if ($('input[name="EquiState"]:checked').val() === "on") {
            flag = 2;
        }
        else if ($('input[name="EquiState"]:checked').val() === "off") {
            flag = 0;
        }
        var chk_arr = [];
        $("input[name=equiPart]:checked").each(function () {
            var chk = $(this).val();
            chk_arr.push(chk);
        })
        console.log(chk_arr);
        for (let i = 0; i < chk_arr.length; i++) {
            for (let j = 0; j < 12; j++) {
                if (chk_arr[i] === CList[j]) {
                    console.log(CList[j])
                    ECList = ECList + KorCList[j] + " ";
                    console.log(ECList);
                }
            }
        }
        var fileInput = document.querySelector("#imageFileOpenInput");
        const formData = new FormData();
        formData.append('equipmentInfoCreateDTO.equipmentName', $("#Ename").val());
        formData.append('equipmentInfoCreateDTO.equipmentNameNth', $("#ENth").val());
        formData.append('equipmentImage', fileInput.files[0]);
        formData.append('equipmentInfoCreateDTO.equipmentAvailable', flag);
        formData.append('equipmentInfoCreateDTO.equipmentCategoryList', ECList);
        //console.log(fileInput.files[0]);

        /*for (var key of formData.keys()) {
            console.log(key);
        }

        for (var value of formData.values()) {
            console.log(value);
        }*/

        if (fileInput.files[0] == null) {
            console.log("null!!");
            alert("이미지가 없습니다. 이미지를 먼저 등록해주세요.")
        }
        else {
            axios.post('http://localhost:8080/equipment/create', formData,
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response.data);

                    if (response.data == 1) {
                        alert("빈 값이 있습니다. 확인 후 다시 등록해 주세요.");
                    }
                    else if (response.data == 2) {
                        alert("nth값이 중복됩니다. 다시 입력해 주세요.")
                    }
                    else if (response.data == 3) {
                        alert("error! 운동기구 정보 등록에 실패했습니다.")
                    }
                    else {
                        alert("운동기구 정보가 등록되었습니다.")
                    }

                })
                .catch((response) => {
                    console.log('Error!')
                });
        }
    }
    rePrintImage = function (e) {
        console.log("rePrint");
        const imageFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(imageFile);
        $("#Eimg").attr("src", imageUrl);
    }
    render() {
        return (
            <div>
                <ManagerBar></ManagerBar><br />
                <center>
                    <EquiInfo>
                        <LayoutBox>
                            <img id="Eimg" name="Eimg" src="image/FoundNotImage.png" height="320" width="320" alt="EquiIcon" /><br /><br />
                        </LayoutBox>
                        <ImageBox>
                            <label className="btn btn-secondary" for="imageFileOpenInput">
                                아이콘 불러오기
                            </label>
                            <input type="file" id="imageFileOpenInput" style={{ display: "none" }} accept="image/*" onChange={(e) => { this.rePrintImage(e) }} />&nbsp;&nbsp;<br /><br />
                        </ImageBox>
                        <InputInfoBox>
                            <label>name: </label>
                            <InfoInput type="text" name="Ename" id="Ename" />&nbsp;&nbsp;
                            <label>nth: </label>
                            <InfoInput type="text" name="ENth" id="ENth" style={{ width: "40px" }} /><br /><br />

                            <label>State:&nbsp;
                                <label>On
                                    <input type="radio" name="EquiState" value="on" />
                                </label>&nbsp;&nbsp;
                                <label>Off
                                    <input type="radio" name="EquiState" value="off" />
                                </label>
                            </label><br /><br />
                            <div>
                                <label>가슴 <input type="checkbox" name="equiPart" value="chest" /> </label>&nbsp;&nbsp;
                                <label>등 <input type="checkbox" name="equiPart" value="back" /></label>&nbsp;&nbsp;
                                <label>목 <input type="checkbox" name="equiPart" value="neck" /></label>&nbsp;&nbsp;
                                <label>복부 <input type="checkbox" name="equiPart" value="stomach" /></label>&nbsp;&nbsp;
                                <label>삼두 <input type="checkbox" name="equiPart" value="triceps" /></label>&nbsp;&nbsp;
                                <label>승모근 <input type="checkbox" name="equiPart" value="trapezius" /></label><br />
                                <label>어께 <input type="checkbox" name="equiPart" value="shoulder" /></label>&nbsp;&nbsp;
                                <label>유산소 <input type="checkbox" name="equiPart" value="aerobic" /></label>&nbsp;&nbsp;
                                <label>이두 <input type="checkbox" name="equiPart" value="biceps" /></label>&nbsp;&nbsp;
                                <label>하체 <input type="checkbox" name="equiPart" value="lower_body" /></label>&nbsp;&nbsp;
                                <label>허리 <input type="checkbox" name="equiPart" value="waist" /></label>&nbsp;&nbsp;
                                <label>기타 <input type="checkbox" name="equiPart" value="etc" /></label>&nbsp;&nbsp;
                            </div><br />
                        </InputInfoBox>
                        <RegisterBox>
                            <Button variant="btn btn-secondary" onClick={this.createEquipment}>등록</Button>
                        </RegisterBox>
                    </EquiInfo>
                </center>
            </div >
        )
    }
}

export default CreateEqui