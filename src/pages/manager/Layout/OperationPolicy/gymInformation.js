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
function GymInfo({ id, name, add, phone }) {
    console.log(id, name, phone, add);
    return (
        <div>
            <TextField color="secondary" required id="standard-required" label="Gym Name" defaultValue=" " variant="standard" name="GName" size="small" style={{ width: "350px" }} /><br /><br />
            <TextField color="secondary" required id="standard-required" label="Gym Phone Number" defaultValue=" " variant="standard" name="GPhone" size="small" style={{ width: "350px" }} /><br /><br />
            <TextField color="secondary" required id="standard-required" label="Gym Address" defaultValue=" " variant="standard" name="GAddress" size="small" style={{ width: "350px" }} /><br /><br />
            <Button variant="btn btn-secondary" onClick={(e) => { informationUpdate($("input[name=GName]").val(), $("input[name=GAddress]").val(), $("input[name=GPhone]").val(), e) }}>등록</Button>
        </div >
    )
}

export default GymInfo