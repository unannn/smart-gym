import React from 'react';
import axios from 'axios';
import $ from "jquery";
import jquery from 'jquery';
import styled from 'styled-components';
import ManagerBar from './component/menubar.js';

let EquiInfo = styled.div`
   margin: 0.5px;
   top: 100px;
   width: 450px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   background: lightgreen;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
class CreateEqui extends React.Component {

    createEquipment = function () {
        console.log("suu");//axios
        let flag = 0;
        let ECList = "";
        if ($('input[name="EquiState"]:checked').val() === "on") {
            flag = 1;
        }
        else {
            flag = 2;
        }
        for (let i = 0; i < 12; i++) {
            if ($('input[name="equiPart"]:checked').val() === CList[i]) {
                ECList += CList[i];
            }
        }
        axios.post('http://localhost:8080/equipment/create',
            {
                equipmentName: $("#Ename").val(),
                equipmentNameNth: $("#ENth").val(),
                equipmentCategoryList: '0101',
                equipmentImage: $("#Eimg").val(),//일단 값이 잘 드렁가는 짐난 확인
                equipmentAvailable: flag
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => { console.log(response.data); })
            .catch((response) => {
                console.log('Error!')
            });
    }
    render() {
        return (
            <div>
                <ManagerBar></ManagerBar><br />
                <center>
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
                            <label><input type="checkbox" name="equiPart" value="chest" />가슴</label>
                            <label><input type="checkbox" name="equiPart" value="back" />등</label>
                            <label><input type="checkbox" name="equiPart" value="neck" />목</label>
                            <label><input type="checkbox" name="equiPart" value="stomach" />복부</label>
                            <label><input type="checkbox" name="equiPart" value="triceps" />삼두</label>
                            <label><input type="checkbox" name="equiPart" value="trapezius" />승모근</label><br />
                            <label><input type="checkbox" name="equiPart" value="shoulder" />어께</label>
                            <label><input type="checkbox" name="equiPart" value="aerobic" />유산소</label>
                            <label><input type="checkbox" name="equiPart" value="biceps" />이두</label>
                            <label><input type="checkbox" name="equiPart" value="lower_body" />하체</label>
                            <label><input type="checkbox" name="equiPart" value="waist" />허리</label>
                            <label><input type="checkbox" name="equiPart" value="etc" />기타</label>
                        </div>
                        <button onClick={this.createEquipment}>등록</button>
                    </EquiInfo>
                </center>
            </div >
        )
    }
}

export default CreateEqui