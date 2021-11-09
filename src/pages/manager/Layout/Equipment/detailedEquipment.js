import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let EquiInfo = styled.div`
   position: absolute;
   top: -70px;
   left: 750px;
   width: 450px;
   height: 540px;
   font-size: 10pt;
   text-align: center;
   border: 2.5px solid gray;
   border-radius: 3px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let InfoInput = styled.input`
    background-color: #F2F2F2;
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
let ButtonBox = styled.div`
   position: relative;
   margin: 0.5px;
   top: -5px;
   left: -10px;
   width: 430px;
   height: 45px;
   font-size: 10pt;
   text-align: center;
   `;
let ImgBox = styled.div`
    position: relative;
   top: -10px;
   width: 310px;
   height: 310px;
   background: gray;
   border-radius: 2px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
let textFlag = "none";
let Ccategory = "";
class DetailE extends React.Component {
    updateEquipment = function () {
        var fileInput = document.querySelector("#imageFileOpenInput");
        const formData = new FormData();
        let flag = -1;
        textFlag = "none";
        Ccategory = "";
        if (fileInput.files[0] == null) {
            console.log(fileInput.files[0]);
            console.log($("#Eimg").val());
        }
        if ($('input[name="EquiState"]:checked').val() === "on") {
            flag = 2;
            textFlag = "on";
        }
        else if ($('input[name="EquiState"]:checked').val() === "off") {
            flag = 0;
            textFlag = "off";
        }
        var chk_arr = [];
        $("input[name=equiPart]:checked").each(function () {
            var chk = $(this).val();
            chk_arr.push(chk);
        })
        formData.append('equipmentInfoUpdateDTO.equipmentID', $("#Eid").val());
        formData.append('equipmentInfoUpdateDTO.equipmentName', $("#Ename").val());
        formData.append('equipmentInfoUpdateDTO.equipmentNameNth', $("#ENth").val());
        formData.append('equipmentImage', fileInput.files[0]);
        formData.append('equipmentInfoUpdateDTO.equipmentAvailable', flag);
        console.log("update");//axios
        for (let i = 0; i < 12; i++) {
            if ($("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").is(":checked") == true) {
                Ccategory = Ccategory + " " + KorCList[i];
                console.log(Ccategory);
            }
        }
        formData.append('equipmentInfoUpdateDTO.equipmentCategoryList', Ccategory);
        /*for (var key of formData.keys()) {

            console.log(key);

        }

        for (var value of formData.values()) {

            console.log(value);

        }*/
        if (window.confirm("해당 운동기구 정보를 수정하시겠습니까?\nName: " + $("#Ename").val() +
            "\nNth: " + $("#ENth").val() +
            "\nAvailable: " + textFlag +
            "\nCategory: " + Ccategory)) {
            axios.post('http://localhost:8080/equipment/update', formData,
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
                        alert("error! 운동기구 등록에 실패했습니다.")
                    }
                    else {
                        alert("운동기구 정보가 수정되었습니다.");
                        window.location.reload();
                    }

                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 운동기구 등록에 실패했습니다.")
                });
        }
        else {
            //alert("운동기구 수정요청을 취소하셨습니다.");
        }

    }
    deleteEquipment = function () {
        console.log("delete" + $("#Eid").val());
        Ccategory = "";
        for (let i = 0; i < 12; i++) {
            if ($("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").is(":checked") == true) {
                Ccategory = Ccategory + " " + KorCList[i];
                console.log(Ccategory);
            }
        }
        if ($('input[name="EquiState"]:checked').val() === "on") {
            textFlag = "on";
        }
        else if ($('input[name="EquiState"]:checked').val() === "off") {
            textFlag = "off";
        }
        if (window.confirm("해당 운동기구 정보를 삭제하시겠습니까?\nName: " + $("#Ename").val() +
            "\nNth: " + $("#ENth").val() +
            "\nAvailable: " + textFlag +
            "\nCategory: " + Ccategory)) {
            axios.post('http://localhost:8080/equipment/delete',
                {
                    equipmentID: $("#Eid").val()
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
                    alert("운동기구 정보가 삭제되었습니다.");
                    localStorage.setItem("detilID", "");
                    window.location.reload()
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 운동기구 정보 삭제에 실패했습니다.");
                });
        }
        else {
            //alert("운동기구 정보 삭제요청이 취소되었습니다.");
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
                <EquiInfo>
                    <center>
                        <ImgBox>
                            <img id="Eimg" name="Eimg" src="image/ImageNotFound.png" height="300" width="300" alt="EquiIcon" /><br />
                        </ImgBox>
                    </center>
                    <label className="btn btn-secondary" for="imageFileOpenInput">
                        아이콘 불러오기
                    </label>
                    <input type="file" id="imageFileOpenInput" style={{ display: "none" }} accept="image/*" onChange={(e) => { this.rePrintImage(e) }} />&nbsp;&nbsp;<br /><br />
                    <label>name: </label>
                    <InfoInput type="text" name="Ename" id="Ename" />&nbsp;&nbsp;&nbsp;
                    <label>nth: </label>
                    <InfoInput type="text" name="ENth" id="ENth" style={{ width: "40px" }} /><br />
                    <label>State:
                        <label>On
                            <input type="radio" name="EquiState" value="on" />
                        </label>
                        <label>Off
                            <input type="radio" name="EquiState" value="off" />
                        </label>
                    </label><br />
                    <div>
                        <label>가슴<input type="checkbox" name="equiPart" value="chest" /></label>&nbsp;&nbsp;
                        <label>등<input type="checkbox" name="equiPart" value="back" /></label>&nbsp;&nbsp;
                        <label>목<input type="checkbox" name="equiPart" value="neck" /></label>&nbsp;&nbsp;
                        <label>복부<input type="checkbox" name="equiPart" value="stomach" /></label>&nbsp;&nbsp;
                        <label>삼두<input type="checkbox" name="equiPart" value="triceps" /></label>&nbsp;&nbsp;
                        <label>승모근<input type="checkbox" name="equiPart" value="trapezius" /></label><br />
                        <label>어깨<input type="checkbox" name="equiPart" value="shoulder" /></label>&nbsp;&nbsp;
                        <label>유산소<input type="checkbox" name="equiPart" value="aerobic" /></label>&nbsp;&nbsp;
                        <label>이두<input type="checkbox" name="equiPart" value="biceps" /></label>&nbsp;&nbsp;
                        <label>하체<input type="checkbox" name="equiPart" value="lower_body" /></label>&nbsp;&nbsp;
                        <label>허리<input type="checkbox" name="equiPart" value="waist" /></label>&nbsp;&nbsp;
                        <label>기타<input type="checkbox" name="equiPart" value="etc" /></label>&nbsp;&nbsp;
                    </div>
                    <input type="hidden" id="Eid" name="Eid" />
                    <input type="hidden" id="Ecategory" name="Ecategory" />
                    <ButtonBox>
                        <Button variant="btn btn-secondary" onClick={this.updateEquipment} style={{ float: 'right' }}>수정</Button>
                        <Button variant="btn btn-secondary" onClick={this.deleteEquipment} style={{ float: 'left' }}>삭제</Button>
                    </ButtonBox>
                </EquiInfo>
            </div>
        )
    }
}
export default DetailE;