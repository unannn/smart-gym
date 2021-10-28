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
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
let Ccategory = "";
class DetailE extends React.Component {
    updateEquipment = function () {
        console.log("update");//axios
        for (let i = 0; i < 12; i++) {
            if ($("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").is(":checked") == true) {
                Ccategory = Ccategory + " " + KorCList[i];
                console.log(Ccategory);
            }
        }
        axios.post('http://localhost:8080/equipment/update',
            {
                equipmentID: $("#Eid").val(),
                equipmentName: $("#Ename").val(),
                equipmentNameNth: $("#ENth").val(),
                equipmentCategoryList: Ccategory,
                equipmentImage: $("#Eimg").val(),//일단 값이 잘 드렁가는 짐난 확인
                equipmentAvailable: $("#Estate").val()
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
                window.location.reload()
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
                    <img id="Eimg" name="Eimg" src="https://png.pngtree.com/png-clipart/20190904/original/pngtree-flat-fitness-machine-png-image_4491374.jpg" height="300" width="300" alt="EquiIcon" /><br />
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