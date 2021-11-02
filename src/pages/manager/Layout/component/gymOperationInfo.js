import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";

const RDList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KorRDList = ["월", "화", "수", "목", "금", "토", "일"];
const operationUpdate = (start, end, e) => {
    console.log("OperUpdate");
    console.log(start);
    let RHD = "";
    for (let i = 0; i < 7; i++) {
        console.log($("input:checkbox[name='ReHoliyDay']:checkbox[value=" + RDList[i] + "]").is(":checked"));
        if ($("input:checkbox[name='ReHoliyDay']:checkbox[value=" + RDList[i] + "]").is(":checked") === true) {
            RHD = RHD + KorRDList[i];
            console.log(RHD);
        }
    }
    axios.post('http://localhost:8080/gymOperationInfo/update',
        {
            gymOperationInfoReservationDuration: $('#ReDu').val(),
            gymOperationInfoRegularHoliday: RHD,
            gymOperationInfoOperatingStartTime: start,
            gymOperationInfoOperatingEndTime: end
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
function StaticTimePickerLandscape({ id, start, end, RholiyD, reserveD }) {
    const [value, setValue] = React.useState(new Date());
    console.log(start);
    return (
        <div>
            <br />
            < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                <TextField color="secondary" variant="standard" id="OpenTime" label="Opne" type="time" key={start} defaultValue={start} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
            </Stack >
            &nbsp;&nbsp;&nbsp;
            < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                <TextField color="secondary" variant="standard" id="CloseTime" label="Close" type="time" key={end} defaultValue={end} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
            </Stack ><br /><br />
            <TextField required id="standard-required" label="Reservation Duration(day)" variant="standard" key={reserveD} defaultValue={reserveD} name="Redu" color="secondary" /><br /><br />
            <div>
                <label>월<input type="checkbox" name="ReHoliyDay" value="Mon" /></label>
                <label>화<input type="checkbox" name="ReHoliyDay" value="Tue" /></label>
                <label>수<input type="checkbox" name="ReHoliyDay" value="Wed" /></label>
                <label>목<input type="checkbox" name="ReHoliyDay" value="Thu" /></label>
                <label>금<input type="checkbox" name="ReHoliyDay" value="Fri" /></label>
                <label>토<input type="checkbox" name="ReHoliyDay" value="Sat" /></label>
                <label>일<input type="checkbox" name="ReHoliyDay" value="Sun" /></label>
            </div>
            <button onClick={(e) => { operationUpdate($("#OpenTime").val(), $("#CloseTime").val(), e) }}>수정</button>
            <button onClick={""}>운영정보 조회</button>
        </div>
    );
}
export default StaticTimePickerLandscape;