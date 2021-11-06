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

const approvalAuthority = (UserId, UserName, UserAuthority, e) => {
    let aut = "";
    let autText = "";
    console.log(UserAuthority);
    console.log("approvalAuthority");
    if (UserAuthority === "O") {
        aut = "X";
        autText = "예약불가";
    }
    else {
        aut = "O";
        autText = "예약가능";
    }
    if (window.confirm("ID: " + UserId +
        "\nName: " + UserName + "\n해당 사용자의 예약 권한을 " + autText + " 상태로 변경하시겠습니까?")) {
        axios.post('http://localhost:8080/allowedUser/reservationAuthorityUpdate',
            {
                userID: UserId,
                allowedUserReservationAuthority: aut
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
                alert("예약 권한이 변경되었습니다.");
                window.location.reload();
            })
            .catch((response) => {
                console.log('Error!');
                alert("error! 예약 권한을 변경할 수 없습니다.");
            });
    }
    else {
        alert("예약 권한 변경이 취소되었습니다.");
    }
}

const deleteUser = (UserId, e) => {
    console.log(UserId);
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
function UserItem({ key, UserId, UserName, UserAuthority }) {
    let aut = "";
    console.log(UserAuthority);
    if (UserAuthority === "O") {
        aut = "가능";
    }
    else {
        aut = "불가";
    }
    return (
        <div>
            <div>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={UserId} />
                    <label style={{ float: 'left', fontSize: '23px' }} id="nameE">{UserId} {UserName}</label>
                    <div style={{ float: 'right' }}>
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { approvalAuthority(UserId, UserName, UserAuthority, e) }}>예약{aut}</Button>&nbsp;&nbsp;
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { deleteUser(UserId, e) }}>회원탈퇴</Button>
                    </div>
                </ InfoBox >
            </div >
        </div>
    );
}
export default UserItem;