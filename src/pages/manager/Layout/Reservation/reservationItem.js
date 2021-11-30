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
  left: -5%;
   position: relative;
   width: 1080px;
   height: 40px;

   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
let Cell = styled.li`
   position: relative;
   top:-5px;
   float: left;
   width: 220px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(nowTime);
let cancelButton = "";

function ReservationItem({ key, ReservatopmId, EquipmentName, EquipmentNameNth, UserID, StartTime, EndTime, setState }) {
    const deleteReservation = (ReservatopmId, UserID, e) => {
        console.log(ReservatopmId)
        console.log("detailed Read");
        if (window.confirm("해당 예약을 취소하시겠습니까?\n" +
            "예약 번호: " + ReservatopmId +
            "\n예약자: " + UserID)) {
            axios.post('http://localhost:8080/reservation/cancleReservation',
                {
                    reservationID: ReservatopmId
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
                    alert("예약이 취소되었습니다.");
                    axios.post('http://localhost:8080/reservation/readByEquipment',
                        {
                            equipmentID: window.sessionStorage.getItem('reservation')
                        },
                        {
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            }
                        }
                    )
                        .then((response) => {
                            console.log("다시");
                            console.log("id" + window.sessionStorage.getItem('reservation'));
                            console.log(response.data);
                            { setState(response.data) };
                        })
                        .catch((response) => {
                            console.log('Error!');
                            alert("error! 해당 예약 이력을 조회할 수 없습니다.");
                        });
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 해당 예약을 취소할 수 없습니다.\n페이지를 새로고침합니다.");
                    window.location.reload();
                });
        }
    }
    if (nowTime > EndTime) {
        cancelButton = false;
    }
    else {
        cancelButton = true;
    }
    return (
        <div>
            <div style={{ cursor: "pointer" }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={ReservatopmId} />
                    <Cell style={{ float: 'left', fontSize: '17px', width: "150px" }} id="RID" >&nbsp;&nbsp;{ReservatopmId}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "270px" }} id="UID">{UserID}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "200px" }} id="EID" >{EquipmentName}/{EquipmentNameNth}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "190px" }} id="StatT" >{StartTime}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "185px" }} id="EndT">{EndTime}</Cell>
                    {cancelButton ? <Button variant="btn btn-secondary" style={{ float: 'left', fontSize: '17px', width: "80px" }} id="Cancel" onClick={(e) => { deleteReservation(ReservatopmId, UserID, e) }}>Cancel</Button>
                        : <Button variant="btn btn-secondary" disabled style={{ float: 'left', fontSize: '17px', width: "80px" }} id="Cancel" onClick={(e) => { deleteReservation(ReservatopmId, UserID, e) }}>Cancel</Button>}
                </ InfoBox >
            </div >
        </div>
    );
}
export default ReservationItem;