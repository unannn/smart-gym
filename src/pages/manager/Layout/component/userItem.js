import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let InfoBox = styled.div`
&:hover {                
    background: skyblue;
  }
   position: relative;
   display: block;
   float: left;
   width: 630px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;

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
            console.log('Error!')
        });
}
function UserItem({ key, EquipmentId, EquipmentName, Category, EnthNumber }) {
    return (
        <div>
            <div onClick={(e) => { detailedRead(EquipmentId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={EquipmentId} />
                    <label style={{ float: 'left', fontSize: '23px' }} id="nameE">id name</label>
                    <button>상세조회</button>
                    <button>예약권한</button>
                    <button>회원탈퇴</button>
                </ InfoBox >
            </div >
        </div>
    );
}
export default UserItem;