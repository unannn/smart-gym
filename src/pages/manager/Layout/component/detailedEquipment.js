import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let EquiInfo = styled.div`
   position: absolute;
   margin: 0.5px;
   top: 50px;
   left: 750px;
   width: 450px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let ImgBox = styled.div`
   position: relative;
   margin: 0.5px;
   width: 320px;
   height: 320px;
   font-size: 10pt;
   text-align: center;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
let Ccategory = "";
class DetailE extends React.Component {
    updateEquipment = function () {
        var fileInput = document.querySelector("#imageFileOpenInput");
        const formData = new FormData();
        let flag = 0;
        let ECList = "";
        if ($('input[name="EquiState"]:checked').val() === "on") {
            flag = 1;
        }
        else {
            flag = 2;
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
        for (var key of formData.keys()) {

            console.log(key);

        }

        for (var value of formData.values()) {

            console.log(value);

        }
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
                window.location.reload()
                //window.location.reload()
            })
            .catch((response) => {
                console.log('Error!')
            });
    }
    deleteEquipment = function () {
        console.log("delete" + $("#Eid").val());
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
                localStorage.setItem("detilID", "");
                window.location.reload()
            })
            .catch((response) => {
                console.log('Error!')
            });
    }
    render() {
        return (
            <div>
                <EquiInfo>
                    <center>
                        <ImgBox>
                            <img id="Eimg" name="Eimg" src="image/FoundNotImage.png" height="320" width="320" alt="EquiIcon" /><br />
                        </ImgBox>
                    </center>
                    <input type="file" name="file" id="imageFileOpenInput" accept="image/*" /><br />
                    <label>name: </label>
                    <input type="text" name="Ename" id="Ename" />
                    <label>nth: </label>
                    <input type="text" name="ENth" id="ENth" style={{ width: "40px" }} /><br />
                    <label>State:
                        <label>On
                            <input type="radio" name="EquiState" value="on" />
                        </label>
                        <label>Off
                            <input type="radio" name="EquiState" value="off" />
                        </label>
                    </label>
                    <div>
                        <label>가슴<input type="checkbox" name="equiPart" value="chest" /></label>
                        <label>등<input type="checkbox" name="equiPart" value="back" /></label>
                        <label>목<input type="checkbox" name="equiPart" value="neck" /></label>
                        <label>복부<input type="checkbox" name="equiPart" value="stomach" /></label>
                        <label>삼두<input type="checkbox" name="equiPart" value="triceps" /></label>
                        <label>승모근<input type="checkbox" name="equiPart" value="trapezius" /></label><br />
                        <label>어께<input type="checkbox" name="equiPart" value="shoulder" /></label>
                        <label>유산소<input type="checkbox" name="equiPart" value="aerobic" /></label>
                        <label>이두<input type="checkbox" name="equiPart" value="biceps" /></label>
                        <label>하체<input type="checkbox" name="equiPart" value="lower_body" /></label>
                        <label>허리<input type="checkbox" name="equiPart" value="waist" /></label>
                        <label>기타<input type="checkbox" name="equiPart" value="etc" /></label>
                    </div>
                    <input type="hidden" id="Eid" name="Eid" />
                    <input type="hidden" id="Ecategory" name="Ecategory" />
                    <button onClick={this.updateEquipment}>수정</button>
                    <button onClick={this.deleteEquipment}>삭제</button>
                </EquiInfo>
            </div>
        )
    }
}
export default DetailE;