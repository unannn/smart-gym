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
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
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

        axios.post('http://localhost:8080/equipment/create',
            {
                equipmentName: $("#Ename").val(),
                equipmentNameNth: $("#ENth").val(),
                equipmentCategoryList: ECList,
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
                            <label>가슴<input type="checkbox" name="equiPart" value="chest" /> </label>
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
                        <button onClick={this.createEquipment}>등록</button>
                    </EquiInfo>
                </center>
            </div >
        )
    }
}

export default CreateEqui