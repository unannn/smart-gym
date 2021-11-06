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
   width: 650px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;

const approvalUser = (UserApprovalId, UserApprovalName, e) => {
    console.log(UserApprovalId);
    console.log("approvalUser");
    if (window.confirm("ID: " + UserApprovalId +
        "\nName: " + UserApprovalName + "\n해당 대기자의 가입을 승인하시겠습니까?")) {
        axios.post('http://localhost:8080/unAllowedUser/approve',
            {
                userID: UserApprovalId
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
                alert("가입이 승인되었습니다.");
                window.location.reload();
            })
            .catch((response) => {
                console.log('Error!');
                alert("error! 가입 승인에 실패하였습니다.");
            });
    }
    else {
        alert("가입승인 요청을 취소하였습니다.");
    }
}

const notApprovalUser = (UserApprovalId, UserApprovalName, e) => {
    console.log(UserApprovalId);
    console.log("notApprovalUser");
    if (window.confirm("ID: " + UserApprovalId +
        "\nName: " + UserApprovalName + "\n해당 대기자의 가입을 승인불가하시겠습니까?")) {
        axios.post('http://localhost:8080/unAllowedUser/unApprove',
            {
                userID: UserApprovalId
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
                alert("가입승인이 불가되었습니다.");
                window.location.reload();
            })
            .catch((response) => {
                console.log('Error!');
                alert("error! 가입승인 불가에 실패하였습니다.");
            });
    }
    else {
        alert("가입승인 불가 요청을 취소하였습니다.");
    }
}
function UserApprovalItem({ key, UserApprovalId, UserApprovalName }) {
    return (
        <div>
            <div>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={UserApprovalId} />
                    <label style={{ float: 'left', fontSize: '23px' }} id="nameE">{UserApprovalId}  {UserApprovalName}</label>
                    <div style={{ float: 'right' }}>
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { approvalUser(UserApprovalId, UserApprovalName, e) }}>승인허가</Button>&nbsp;&nbsp;
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { notApprovalUser(UserApprovalId, UserApprovalName, e) }}>승인불가</Button>
                    </div>
                </ InfoBox >
            </div >
        </div>
    );
}
export default UserApprovalItem;