import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let EquiInfo = styled.div`
   position: absolute;
   margin: 0.5px;
   right: 100px;
   top: 100px;
   width: 450px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
class DetailE extends React.Component {
    updateEquipment = function () {
        console.log("update");//axios
        axios.post('http://localhost:8080/equipment/update',
            {
                equipmentID: $("#Eid").val(),
                equipmentName: $("#Ename").val(),
                equipmentCategoryList: $("#Ecategory").val(),
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
            .then((response) => { console.log(response.data); })
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
                    <label>Name: <input type="text" id="Ename" name="Ename" /></label><br />
                    <label>State:
                        <label>On
                            <input type="radio" id="EquiStateOn" name="EquiState" value="on" />
                        </label>
                        <label>Off
                            <input type="radio" id="EquiStateOff" name="EquiState" value="off" />
                        </label>
                    </label>
                    <div>
                        <label><input type="checkbox" id="equiPart1" name="equiPart1" value="upper" />상체</label>
                        <label><input type="checkbox" id="equiPart2" name="equiPart2" value="lower" />하체</label>
                        <label><input type="checkbox" id="equiPart3" name="equiPart3" value="leg" />다리</label>
                        <label><input type="checkbox" id="equiPart4" name="equiPart4" value="etc" />기타</label>
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