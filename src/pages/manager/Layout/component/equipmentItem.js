import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let InfoBox = styled.div`
&:hover {                
    background: gray;
  }
  left: -5%;
   position: relative;
   width: 630px;
   height: 40px;
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
            console.log(response.data);
            /*for (var key in (response.data[0])) {
                console.log(key);//이름
                console.log((response.data[0])[key]);//값
            }*/
            let i = -1;
            for (var key in (response.data[0])) {
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
            //$("#Eimg").val((response.data[0]).equipmentCategoryID.equipmentImage);
            $("#ES3").val((response.data[0]).equipmentCategoryID.equipmentImage);
            $("#Eimg").attr("src", (response.data[0]).equipmentCategoryID.equipmentImage);
            if ((response.data[0]).equipmentCategoryID.equipmentAvailable === 1) {
                $("input:radio[name='EquiState']:radio[value='on']").prop('checked', true);
                $("input:radio[name='EquiState']:radio[value='off']").prop('checked', false);
            }
            else {
                $("input:radio[name='EquiState']:radio[value='on']").prop('checked', false);
                $("input:radio[name='EquiState']:radio[value='off']").prop('checked', true);
            }
        })
        .catch((response) => {
            console.log('Error!')
        });
}
function EquipmentItem({ key, EquipmentId, EquipmentName, Category, EnthNumber }) {
    return (
        <div>
            <div onClick={(e) => { detailedRead(EquipmentId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={EquipmentId} />
                    <label style={{ float: 'left', fontSize: '20px' }} id="nameE">{EquipmentName} {EnthNumber}</label>
                    <label style={{ float: 'right', fontSize: '20px' }}>{Category}</label>
                </ InfoBox >
            </div >
        </div>
    );
}
export default EquipmentItem;