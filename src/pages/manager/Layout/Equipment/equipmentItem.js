import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let InfoBox = styled.div`
&:hover {                
    background: #FFD2D5;
  }
  left: -5%;
   position: relative;
   width: 700px;
   height: 40px;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
let Cell = styled.li`
   position: relative;
   top: -5px;
   float: left;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
let aaa = "equipmentCategoryAerobic";
const detailedRead = (EquipmentId, e) => {
    console.log(EquipmentId)
    console.log("detailed Read");
    axios.post('http://localhost:8080/equipment/detailedRead',
        {
            equipmentID: EquipmentId
        },
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
        .then((response) => {
            console.log((response.data[0]).equipmentCategoryID.equipmentID);
            /*for (var key in (response.data[0])) {
                console.log(key);//이름
                console.log((response.data[0])[key]);//값
            }*/
            let i = -1;
            for (var key in (response.data[0])) {
                console.log(response.data[0][key]);
                console.log(key + " " + CList[i]);
                if ((response.data[0])[key] === 1) {
                    $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', true);
                }
                else {
                    $("input:checkbox[name='equiPart']:checkbox[value=" + CList[i] + "]").prop('checked', false);
                }
                i = i + 1;
            }
            localStorage.setItem("detilID", (response.data[0]).equipmentCategoryID.equipmentID);
            $("#Eid").val((response.data[0]).equipmentCategoryID.equipmentID);
            $("#Ename").val((response.data[0]).equipmentCategoryID.equipmentName);
            $("#ENth").val((response.data[0]).equipmentCategoryID.equipmentNameNth);
            //$("#imageFileOpenInput").val((response.data[0]).equipmentCategoryID.equipmentImage);
            $("#ES3").val((response.data[0]).equipmentCategoryID.equipmentImage);
            $("#Eimg").attr("src", (response.data[0]).equipmentCategoryID.equipmentImage);
            $("#Eurl").val((response.data[0]).equipmentCategoryID.equipmentQRCode);
            if ((response.data[0]).equipmentCategoryID.equipmentAvailable === 0) {
                $("input:radio[name='EquiState']:radio[value='on']").prop('checked', false);
                $("input:radio[name='EquiState']:radio[value='off']").prop('checked', true);
            }
            else {
                $("input:radio[name='EquiState']:radio[value='on']").prop('checked', true);
                $("input:radio[name='EquiState']:radio[value='off']").prop('checked', false);
            }
        })
        .catch((response) => {
            console.log(response);
            alert("error! 해당 운동기구에 대한 조회를 할 수 없습니다.\n페이지를 새로고침합니다.");
            window.location.reload();
        });
}
function EquipmentItem({ key, EquipmentId, EquipmentName, Category, EnthNumber }) {
    return (
        <div>
            <div style={{ cursor: 'pointer' }} onClick={(e) => { detailedRead(EquipmentId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "200px" }} id="nameE">&nbsp;{EquipmentName}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "50px" }} id="nameE">{EnthNumber}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "420px" }}>{Category}</Cell>
                </ InfoBox >
            </div >
        </div>
    );
}
export default EquipmentItem;