import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import La from "../Reservation/lalala";
let InfoBox = styled.div`
&:hover {                
    background: #FFD2D5;
  }
  left: -17%;
   position: relative;
   width: 260px;
   height: 40px;

   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   width: 220px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
//useState({ endTime: "", equipmentName: "", equipmentNameNth: "", reservationID: 0, startTime: "", userID: "" });

function EquipmentItemL({ key, EquipmentId, EquipmentName, Category, EnthNumber, apiNumber, setState }) {
    //apiNumber 0: Layout/1:Reservation/2:ESL
    const apiKind = (EquipmentId, apiNumber, e) => {
        localStorage.setItem("reservation", EquipmentId);
        console.log(apiNumber);
        if (apiNumber == 0) {
            //Layout
        }
        else if (apiNumber == 1) {
            //Reservation
            axios.post('http://localhost:8080/reservation/readByEquipment',
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
                    console.log($("#Hob").val());
                    console.log(response.data);
                    { setState(response.data) };
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 해당 예약 이력을 조회할 수 없습니다.");
                });
        }
        else if (apiNumber == 2) {
            //ESL
        }
        else {
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
                    console.log('Error!');
                    alert("error! 해당 운동기구에 대한 조회를 할 수 없습니다.");
                });
        }
    }
    return (
        <div>
            <div onClick={(e) => { apiKind(EquipmentId, apiNumber, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={EquipmentId} />
                    <Cell style={{ float: 'left', fontSize: '17px', width: "200px" }} id="nameE" >&nbsp;{EquipmentName}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "50px" }} id="numE">{EnthNumber}</Cell>
                </ InfoBox >
                <input type='hidden' id="Hob" />
            </div >
        </div>
    );
}
export default EquipmentItemL;