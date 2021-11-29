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
   height: 520px;
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
let Matchingdiv = styled.div`
&:hover {
     transform: scale(1.05);
  transition: transform 1s;
  filter: brightness(93%);
  background: #FDFDFD;
  }
   width: 55px;
   height: 55px;
   overflow: hidden;
   border-radius: 10px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
class ESLMatch extends React.Component {
    constructor(props) {
        super(props);
        this.matchTheItem = this.matchTheItem.bind(this);
    }
    matchTheItem = function () {
        if ($("#ESLMatchID").val() == "" || $("#ESLMatchID").val() == " " || $("#ESLMatchID").val() == null) {
            alert("ESL을 선택해주세요.");
        }
        else if ($("#EquipmentMatchID").val() == "None" || $("#EquipmentMatchID").val() == "" || $("#EquipmentMatchID").val() == " " || $("#EquipmentMatchID").val() == null) {
            alert("운동기구를 선택해주세요.");
        }
        else if ($("#matchingID").val() == 0) {
            console.log("연결");
            console.log($("#ESLMatchID").val() + " " + $("#EquipmentMatchID").val());
            axios.post('http://localhost:8080/esl/eslEquipmentUpdate',
                {
                    eslID: $("#ESLMatchID").val(),
                    equipmentID: $("#EquipmentMatchID").val()
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
                    if (response.data == 0) {
                        alert("매칭되었습니다.");
                        $("#MatchedIMG").attr("src", "./icon/icon_matching.png");
                        $("#matchingID").val(1);
                        this.props.loadItem();
                    }
                    else if (response.data == 1) {
                        alert("ESL ID를 다시 확인해 주세요.");
                    }
                    else if (response.data == 2) {
                        alert("Equipment ID를 다시 확인해 주세요.");
                    }
                    else {
                        alert("error! 매칭할 수 없습니다.");
                    }
                })
                .catch((response) => {
                    console.log(response);
                    alert("error! 매칭할 수 없습니다.");
                });
        }
        else if ($("#matchingID").val() == 1) {
            console.log("해제");
            axios.post('http://localhost:8080/esl/eslEquipmentUnmatch',
                {
                    eslID: $("#ESLMatchID").val()
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
                    alert("매칭이 해제되었습니다.");
                    $("#MatchedIMG").attr("src", "./icon/icon_unmatching.png");
                    $("#matchingID").val(0);
                    this.props.loadItem();
                })
                .catch((response) => {
                    console.log(response);
                    alert("error! 매칭을 해제할 수 없습니다.");
                });
        }
    }

    EquipmentNameRead = function () {
        let Textflag = true;
        let TextValue = $("#EquipmentMatchID").val();
        let SaveText = "";
        for (let i = 0; i < TextValue.length; i++) {
            if (TextValue[i] >= "0" && TextValue[i] <= "9") {
                SaveText = SaveText + TextValue[i];
            }
            else {
                $("#EquipmentMatchID").val(SaveText);
                Textflag = false;
                break;
            }
        }
        if (Textflag) {
            if ($("#ESLMatchID").val())
                axios.post('http://localhost:8080/esl/eslEquipmentMatchCheck',
                    {
                        eslID: $("#ESLMatchID").val(),
                        equipmentID: $("#EquipmentMatchID").val()
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
                        if (response.data == true) {
                            $("#MatchedIMG").attr("src", "./icon/icon_matching.png");
                            $("#matchingID").val(1);
                        }
                        else {
                            $("#MatchedIMG").attr("src", "./icon/icon_unmatching.png");
                            $("#matchingID").val(0);
                        }
                    })
                    .catch((response) => {
                        alert("error! 매칭정보를 확인할 수 없습니다.");
                    });
            axios.post('http://localhost:8080/equipment/detailedReadOnlyName',
                {
                    equipmentID: $("#EquipmentMatchID").val()
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
                    if (response.data.equipmentName == " ") {
                        $("#EquipmentNameMatched").val(" ");
                    }
                    else {
                        $("#EquipmentNameMatched").val(response.data.equipmentName + "/" + response.data.equipmentNameNth);
                    }
                })
                .catch((response) => {
                    alert("error! 운동기구 이름을 불러올 수 없습니다.");
                });
        }
    }
    render() {
        return (
            <div>
                <ESLMatchBox>
                    <InfoBox>
                        <img src="./icon/icon_esl.png" style={{ width: "150px", heigth: "80px", cursor: "Default" }} /><br />
                        <InfoCell style={{ textAlign: 'center', width: '100px' }} id="ESLMatchID"></InfoCell><br /><br />
                        <Matchingdiv>
                            <img id="MatchedIMG" src="./icon/icon_unmatching.png" style={{ hover: 'background: gray', width: "50px", heigth: "80px", cursor: "pointer" }} onClick={this.matchTheItem} /><br /><br />
                        </Matchingdiv>
                        <br />
                        <InfoCell style={{ textAlign: 'center', width: '100px' }} id="EquipmentMatchID" onChange={this.EquipmentNameRead} placeholder={"only numbers"}></InfoCell><br />
                        <img src="./icon/icon_equipment.png" style={{ width: "140px", heigth: "80px", cursor: "Default" }} /><br />
                        <input style={{ textAlign: 'center', width: '220px', background: "white", border: "0", fontWeight: 'bold', fontSize: '16px' }} id="EquipmentNameMatched" disabled></input>
                        <br />
                        <input type="hidden" id="originEquip" />
                        <input type="hidden" id="matchingID" />
                    </InfoBox>
                </ESLMatchBox>
            </div >
        )
    }
}
export default ESLMatch;