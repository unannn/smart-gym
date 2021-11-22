import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
let EquiInfo = styled.div`
   position: absolute;
   top: 5px;
   left: 780px;
   border: 5px solid gray;
   width: 380px;
   height: 490px;
   font-size: 10pt;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
//background: #B5D7FF;
let InfoBox = styled.div`
 position: relative;
   margin: 0.5px;
   width: 350px;
   height: 240x;
   font-size: 10pt;
   top: -22px;
   left: -5px;
   float: left;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   height: 25px;
   line-height: 33px;
   text-align: left;
   list-style-type: none;
   font-size: 16px; 
   `;
let InfoCell = styled.input`
   position: relative;
   top:0px;
   height: 30px;
   line-height: 35px;
   text-align: left;
   list-style-type: none;
   background: #F2F2F2;
   font-size: 15px;
   border: 1px solid gray;
   border-radius: 7px;
   padding: 0px;
   margin:0 auto;
   margin-bottom:0px;
   color: black;
   font-weight: bold;
   `;
class DetailU extends React.Component {
    aa = function () {
        console.log($("#userName").val());
    }
    render() {
        return (
            <div>
                <EquiInfo>
                    <img src="./icon/icon_user.png" style={{ width: "80px", heigth: "80px", cursor: "pointer" }} /><br /><br />
                    <InfoBox>
                        <Cell style={{ float: 'left', width: '200px' }}>Name</Cell>
                        <Cell style={{ float: 'left', width: '115px' }} id="userSex">Sex</Cell><br />
                        <InfoCell style={{ float: 'left', width: '180px' }} id="userNameV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '20px' }} id="space"></Cell>
                        <InfoCell style={{ float: 'left', width: '120px' }} id="userSexV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '300px' }} id="userId">ID</Cell><br />
                        <InfoCell style={{ float: 'left', width: '300px' }} id="userIdV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '300px' }} id="userPW">PW</Cell><br />
                        <InfoCell style={{ float: 'left', width: '300px' }} id="userPWV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '300px' }} id="userState">State</Cell><br />
                        <InfoCell style={{ float: 'left', width: '300px' }} id="userStateV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '300px' }} id="userPhone">Phone</Cell><br />
                        <InfoCell style={{ float: 'left', width: '300px' }} id="userPhoneV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '300px' }} id="userEMail">E-Mail</Cell><br />
                        <InfoCell style={{ float: 'left', width: '300px' }} id="userEMailV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '180px' }} id="userSignUp">SignUp</Cell><br />
                        <Cell style={{ float: 'left', width: '130px' }} id="userApproval">Approval</Cell><br />
                        <InfoCell style={{ float: 'left', width: '165px' }} id="userSignUpV" disabled></InfoCell>
                        <Cell style={{ float: 'left', width: '15px' }} id="space">&nbsp;</Cell>
                        <InfoCell style={{ float: 'left', width: '165px' }} id="userApprovalV" disabled></InfoCell>
                    </InfoBox>
                </EquiInfo>
            </div>
        )
    }
}
export default DetailU;