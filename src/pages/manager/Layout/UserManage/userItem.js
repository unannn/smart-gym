import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let InfoBox = styled.div`
&:hover {                
    background: #B5D7FF;
  }
   position: relative;
   display: block;
   float: left;
   left: -5%;
   width: 550px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;

const approvalAuthority = (EquipmentId, e) => {
    console.log(EquipmentId)
    console.log("approvalAuthority");
    /*
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
        });*/
}

const deleteUser = (EquipmentId, e) => {
    console.log(EquipmentId);
    console.log("deleteUser");
    /*
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
        });*/
}
function UserItem({ key, UserId, UserName }) {
    return (
        <div>
            <div>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={UserId} />
                    <label style={{ float: 'left', fontSize: '23px' }} id="nameE">{UserId} {UserName}</label>
                    <div style={{ float: 'right' }}>
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { approvalAuthority(UserId, e) }}>예약권한</Button>&nbsp;&nbsp;
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { deleteUser(UserId, e) }}>회원탈퇴</Button>
                    </div>
                </ InfoBox >
            </div >
        </div>
    );
}
export default UserItem;