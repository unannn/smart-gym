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
   width: 680px;
   height: 40px;
   font-size: 10pt;
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
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
let AButtonCus = styled.button`
&:hover {
    background: #4B7552;
  }
  background: #4EA45C;
   border-radius: 5px;
   padding:5px;
   border: 0px;
   margin:0 auto;
   color: white;
   margin-bottom:10px;
   font-size: 16px;
   width: 85px;
   `;
let BButtonCus = styled.button`
&:hover {
    background: #A54048;
  }
  background: #BD4751;
   border-radius: 5px;
   padding:5px;
   border: 0px;
   margin:0 auto;
   color: white;
   margin-bottom:10px;
   font-size: 16px;
   width: 85px;
   `;
function UserItem({ key, UserId, UserName, UserAuthority, reloadF }) {
    const detailedRead = (UserId, e) => {
        console.log(UserId)
        console.log("detailed Read");
        axios.post('http://localhost:8080/allowedUser/readUserInfo',
            {
                userID: UserId
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                let tmp = "";
                if ((response.data.data).allowedUserReservationAuthority == "O") {
                    tmp = "가능";
                }
                else {
                    tmp = "불가능";
                }
                console.log(response.data.data);
                console.log((response.data.data).userName);
                $("#userNameV").val(" " + (response.data.data).userName);
                $("#userSexV").val(" " + (response.data.data).userSex);
                $("#userIdV").val(" " + (response.data.data).userID);
                $("#userPWV").val(" " + (response.data.data).userPW);
                $("#userStateV").val(" " + tmp);
                $("#userPhoneV").val(" " + (response.data.data).userPhone);
                $("#userEMailV").val(" " + (response.data.data).userEmail);
                $("#userSignUpV").val(" " + (response.data.data).userRegisterDate);
                $("#userApprovalV").val(" " + (response.data.data).allowedUserApprovalDate);
            })
            .catch((response) => {
                console.log('Error!');
                alert("error! 해당 운동기구에 대한 조회를 할 수 없습니다.\n페이지를 새로고침합니다.");
                window.location.reload();
            });
    }
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
                    { reloadF() };
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

    const deleteUser = (UserId, UserName, e) => {
        console.log(UserId);
        console.log("deleteUser");
        if (window.confirm("해당 유저를 탈퇴시겠습니까?\nID: " + UserId +
            "\nName: " + UserName)) {
            axios.post('http://localhost:8080/allowedUser/deleteUser',
                {
                    userID: UserId
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
                    alert("탈퇴 되었습니다.");
                    { reloadF() }
                })
                .catch((response) => {
                    console.log('Error!')
                });
        }
        else {
        }
    }
    let aut = "";
    let buttonText = "";
    console.log(UserAuthority);
    let approvalButton = null;
    if (UserAuthority === "O") {
        aut = "가능";
        buttonText = 'btn btn-success';
        approvalButton = <AButtonCus variant={buttonText} style={{ height: '40px' }} onClick={(e) => { approvalAuthority(UserId, UserName, UserAuthority, e) }}>예약{aut}</AButtonCus>;
    }
    else {
        aut = "불가";
        buttonText = 'btn btn-danger';
        approvalButton = <BButtonCus variant={buttonText} style={{ height: '40px' }} onClick={(e) => { approvalAuthority(UserId, UserName, UserAuthority, e) }}>예약{aut}</BButtonCus>;
    }
    return (
        <div>
            <div style={{ cursor: 'pointer' }} onClick={(e) => { detailedRead(UserId, e) }}>
                <InfoBox className="component component--item_card" key={key}>
                    <input type="hidden" id="Eid" value={UserId} />
                    <Cell style={{ fontSize: '17px', width: '300px' }} id="userid">&nbsp;{UserId}</Cell>
                    <Cell style={{ fontSize: '17px', width: '200px' }} id="username">{UserName}</Cell>
                    <div style={{ float: 'left' }}>
                        {approvalButton}&nbsp;&nbsp;
                        <Button variant="btn btn-secondary" style={{ height: '40px' }} onClick={(e) => { deleteUser(UserId, UserName, e) }}>회원탈퇴</Button>
                    </div>
                </ InfoBox >
            </div >
        </div>
    );
}
export default UserItem;