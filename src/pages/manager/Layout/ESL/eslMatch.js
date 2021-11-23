import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
let ESLMatchBox = styled.div`
   position: absolute;
   top: 50px;
   left: 900px;
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
class ESLMatch extends React.Component {
    matchTheItem = function () {
        console.log("아직 안됨");
    }
    render() {
        return (
            <div>
                <ESLMatchBox>
                    <InfoBox>
                        <img src="./icon/icon_esl.png" style={{ width: "150px", heigth: "80px", cursor: "Default" }} /><br />
                        <InfoCell style={{ width: '100px' }} id="ESLMatchID"></InfoCell><br /><br />
                        <img src="./icon/icon_matching.png" style={{ width: "50px", heigth: "80px", cursor: "pointer" }} onClick={this.matchTheItem} /><br /><br />
                        <InfoCell style={{ width: '100px' }} id="EquipmentMatchID"></InfoCell><br />
                        <img src="./icon/icon_equipment.png" style={{ width: "150px", heigth: "80px", cursor: "Default" }} /><br /><br />
                    </InfoBox>
                </ESLMatchBox>
            </div >
        )
    }
}
export default ESLMatch;