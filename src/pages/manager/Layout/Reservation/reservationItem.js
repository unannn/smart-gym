import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import moment from 'moment';
// 안써도 자동으로 한국 시간을 불러온다. 명확하게 하기 위해 import
import 'moment/locale/ko';
let InfoBox = styled.div`
&:hover {
    background: #FFD2D5;
  }
  left: -0.5%;
   position: relative;
   width: 1005px;
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
const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(nowTime);
let cancelButton = "";
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
        })
        .catch((response) => {
            console.log('Error!');
            alert("error! 해당 운동기구에 대한 조회를 할 수 없습니다.\n페이지를 새로고침합니다.");
            window.location.reload();
        });
}
function ReservationItem({ key, ReservatopmId, EquipmentName, EquipmentNameNth, UserID, StartTime, EndTime }) {
    console.log(nowTime + " " + EndTime);
    if (nowTime > EndTime) {
        cancelButton = false;
    }
    else {
        cancelButton = true;
    }

    console.log(cancelButton);
    return (
        <div>
            <div>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={ReservatopmId} />
                    <Cell style={{ float: 'left', fontSize: '17px', width: "150px" }} id="RID" >&nbsp;{ReservatopmId}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "150px" }} id="UID">{UserID}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "250px" }} id="EID" >{EquipmentName}/{EquipmentNameNth}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "190px" }} id="StatT" >{StartTime}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "185px" }} id="EndT">{EndTime}</Cell>
                    {cancelButton ? <Button variant="btn btn-secondary" style={{ float: 'left', fontSize: '17px', width: "80px" }} id="Cancel">Cancel</Button>
                        : <Button variant="btn btn-secondary" disabled style={{ float: 'left', fontSize: '17px', width: "80px" }} id="Cancel">Cancel</Button>}
                </ InfoBox >
            </div >
        </div>
    );
}
export default ReservationItem;