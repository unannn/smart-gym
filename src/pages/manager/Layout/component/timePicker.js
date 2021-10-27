import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";

const RDList = ["Mon", "Tue", "neck", "Wed", "Thu", "Fri", "Sat", "Sun"];
const operationUpdate = (start, end, RD, RH, e) => {
    console.log("OperUpdate");
    console.log(start);
    axios.post('http://localhost:8080/gymOperationInfo/update',
        {
            gymOperationInfoReservationDuration: RD,
            gymOperationInfoRegularHoliday: RH,
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
            < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                <TextField id="OpenTime" label="Opne" type="time" key={start} defaultValue={start} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
            </Stack >
            < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                <TextField id="CloseTime" label="Close" type="time" key={end} defaultValue={end} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
            </Stack >

            <div>
                <label>월<input type="checkbox" id="mon" name="mon" /></label>
                <label>화<input type="checkbox" id="Tue" name="Tue" /></label>
                <label>수<input type="checkbox" id="Wed" name="Wed" /></label>
                <label>목<input type="checkbox" id="Thu" name="Thu" /></label>
                <label>금<input type="checkbox" id="Fri" name="Fri" /></label>
                <label>토<input type="checkbox" id="Sat" name="Sat" /></label>
                <label>일<input type="checkbox" id="Sun" name="Sun" /></label>
            </div>
            <button onClick={(e) => { operationUpdate($("#OpenTime").val(), $("#CloseTime").val(), "5", "월수목", e) }}>수정</button>
            <button onClick={""}>운영정보 조회</button>
        </div>
    );
}
export default StaticTimePickerLandscape;