import React, { useState } from "react";
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import { Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const informationUpdate = (Iname, Iadd, Iphone, e) => {
    console.log("infoUpdate");
    console.log(Iname);
    if (window.confirm("해당 헬스장 정보를 등록하시겠습니까?\nGym Name: " + Iname +
        "\nGym Phone Number: " + Iphone +
        "\nGym Address: " + Iadd)) {
        axios.post('http://localhost:8080/gymInfo/update',
            {
                gymInfoName: Iname,
                gymInfoAddress: Iadd,
                gymInfoPhoneNumber: Iphone
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

                if (response.data == 1) {
                    alert("빈 값이 있습니다. 확인 후 다시 등록해 주세요.");
                }
                else if (response.data == 2) {
                    alert("error! 헬스장 정보를 등록할 수 없습니다.");
                }
                else {
                    alert("헬스장 정보가 정상적으로 등록되었습니다.");
                }
            })
            .catch((response) => {
                console.log('Error!')
            });
    }
    else {
        alert("헬스장 정보 등록을 취소하셨습니다.");
    }
}
function GymInfo({ id, name, add, phone }) {
    console.log(id, name, phone, add);
    return (
        <div>
            <img src="./icon/icon_info.png" width="20px" style={{ position: "relative", top: "-12px", float: "left" }} />
            <label style={{ position: "relative", top: "-17px", float: "left", fontSize: "20px" }}>&nbsp;헬스장 정보</label>
            <div style={{ position: "relative", float: "left", top: "-10px" }}>
                <TextField color="secondary" required id="standard-required" label="Gym Name" defaultValue=" " variant="standard" name="GName" size="small" style={{ width: "350px" }} /><br /><br />
                <TextField color="secondary" required id="standard-required" label="Gym Phone Number" defaultValue=" " variant="standard" name="GPhone" size="small" style={{ width: "350px" }} /><br /><br />
                <TextField color="secondary" required id="standard-required" label="Gym Address" defaultValue=" " variant="standard" name="GAddress" size="small" style={{ width: "350px" }} /><br /><br />
                <Button style={{ position: "relative", top: "-5px", left: "180px" }} variant="btn btn-secondary" onClick={(e) => { informationUpdate($("input[name=GName]").val(), $("input[name=GAddress]").val(), $("input[name=GPhone]").val(), e) }}>헬스장 정보 등록</Button>
            </div >
        </div >
    )
}

export default GymInfo