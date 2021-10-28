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
        })
        .catch((response) => {
            console.log('Error!')
        });
}
function GymInfo({ id, name, add, phone }) {
    console.log(id, name, phone, add);
    return (
        <div>
            <TextField required id="standard-required" label="Gym Name" defaultValue=" " variant="standard" name="GName" size="small" /><br /><br />
            <TextField required id="standard-required" label="Gym Phone Number" defaultValue=" " variant="standard" name="GPhone" size="small" /><br /><br />
            <TextField required id="standard-required" label="Gym Address" defaultValue=" " variant="standard" name="GAddress" size="small" /><br /><br />
            <Button variant="btn btn-outline-secondary" onClick={(e) => { informationUpdate($("input[name=GName]").val(), $("input[name=GAddress]").val(), $("input[name=GPhone]").val(), e) }}>등록</Button>
        </div >
    )
}

export default GymInfo