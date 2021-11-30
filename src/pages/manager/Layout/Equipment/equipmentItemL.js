import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
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
   top: -5px;
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

function EquipmentItemL({ key, EquipmentId, EquipmentName, Category, EnthNumber, apiNumber, setState, ESL }) {
    //apiNumber 0: Layout/1:Reservation/2:ESL
    const apiKind = (EquipmentId, ESL, apiNumber, e) => {
        localStorage.setItem("reservation", EquipmentId);
        console.log(apiNumber);
        console.log(ESL);
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
                    window.sessionStorage.setItem('reservation', EquipmentId);
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 해당 예약 이력을 조회할 수 없습니다.");
                });
        }
        //ESL
        else if (apiNumber == 2) {
            let ESLState = -1;
            console.log(ESL);
            //ESL
            axios.post('http://localhost:8080/esl/detailedRead',
                {
                    eslID: ESL
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
                    ESLState = response.data.equipmentAvailable;

                    if (response.data.gymInfoName == "" || response.data.gymInfoName == " " || response.data.gymInfoName == null) {
                        $("#GymNameInfo").val("Gym Name unregistered");
                    }
                    else {
                        $("#GymNameInfo").val(response.data.gymInfoName);
                    }
                    $("#ESLNo").val("ESL ID:  " + response.data.eslID);
                    $("#userName").val(response.data.userName + "회원님");
                    $("#equipESL").val(response.data.equipmentName + " " + response.data.equipmentNameNth);
                    $("#QrValue").val(response.data.equipmentQRCode);
                    //els state
                    //사용불가(고장)
                    if (ESLState == 0) {
                        $("#Times").val("운동기구 고장");
                        //$("#ESLNo").val(response.data.);
                    }
                    //예약 중
                    else if (ESLState == 1) {
                        console.log("1번상태");
                        $("#Times").val(response.data.startTime + "~" + response.data.endTime);
                    }
                    //누구나 사용가능
                    else if (ESLState == 2) {
                        console.log("2번상태");
                        $("#userName").val("모든 회원 사용 가능");
                        if (response.data.startTime == "") {
                            $("#Times").val("다음 예약 생성까지");
                        }
                        else {
                            $("#Times").val(response.data.startTime + "까지");
                        }
                    }
                    //Not Matched
                    else if (ESLState == 4) {
                        console.log("4번상태");
                        $("#Times").val("ESL Not Matched");
                        $("#ESLNo").val("");
                        $("#userName").val("");
                        $("#equipESL").val("");
                        $("#QrValue").val("");
                        $("#GymNameInfo").val("");
                    }
                    //error code -1
                    else {
                        alert("error! ESL정보를 조회할 수 없습니다.");
                    }
                })
                .catch((response) => {
                    console.log(response);
                    alert("error! ESL정보를 조회할 수 없습니다.");
                });

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
            <div style={{ cursor: 'pointer' }} onClick={(e) => { apiKind(EquipmentId, ESL, apiNumber, e) }}>
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