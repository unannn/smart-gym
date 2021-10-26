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
            localStorage.setItem("detilID", response.data.equipmentID);
            $("#Eid").val(response.data.equipmentID);
            $("#Ename").val(response.data.equipmentName);
            $("#Eimg").val(response.data.equipmentImage);
            if (response.data.equipmentAvailable === 1) {
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
function EquipmentItem({ key, EquipmentId, EquipmentName, Category }) {
    return (
        <div>
            <div onClick={(e) => { detailedRead(EquipmentId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={EquipmentId} />
                    <label style={{ float: 'left', fontSize: '23px' }} id="nameE">{EquipmentName}</label>
                    <label style={{ float: 'right', fontSize: '23px' }}>{Category}</label>
                </ InfoBox >
            </div >
        </div>
    );
}
export default EquipmentItem;