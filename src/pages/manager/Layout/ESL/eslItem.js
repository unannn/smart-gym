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
  left: 2%;
   position: relative;
   width: 415px;
   height: 40px;
   cursor: pointer;
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
function ESLItem({ key, ESLId, EquipmentId, ReservationId }) {
    //apiNumber 0: Layout/1:Reservation/2:ESL
    const deleteESL = (ESLId, e) => {
        console.log("deleteESL");
        if (window.confirm("ESLID: " + ESLId + "\n해당 ESL 장치를 삭제하시겠습니까?")) {
            axios.post('http://localhost:8080/esl/delete',
                {
                    eslID: ESLId
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log(response);
                    alert("삭제되었습니다.");
                    window.location.reload();
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 해당 ESL장치를 삭제할 수 없습니다.");
                    window.location.reload();
                });
        }
    }
    const selectedESL = (ESLId, e) => {
        $("#ESLMatchID").val(ESLId);
    }
    let equi = EquipmentId;
    let re = ReservationId;
    if (equi == "" || equi == " " || equi == null) {
        equi = "None";
    }
    if (re == "" || re == " " || re == null) {
        re = "None";
    }
    return (
        <div>
            <div onClick={(e) => { selectedESL(ESLId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={ESLId} />
                    <Cell style={{ float: 'left', fontSize: '17px', width: "80px" }} id="eslId">&nbsp;{ESLId}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "120px" }} id="equipId">{equi}</Cell>
                    <Cell style={{ float: 'left', fontSize: '17px', width: "120px" }} id="reserId">{re}</Cell>
                    <div style={{ float: 'left' }}>
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { deleteESL(ESLId, e) }}>ESL삭제</Button>&nbsp;&nbsp;
                    </div>
                </ InfoBox >
                <input type='hidden' id="Hob" />
            </div >
        </div>
    );
}
export default ESLItem;