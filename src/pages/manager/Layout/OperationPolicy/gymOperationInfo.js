import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
//정기휴무 제외하고 빈 상태면 날라가지 않게 알럿창 띄우고 서버요청 안하기
const RDList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KorRDList = ["월", "화", "수", "목", "금", "토", "일"];
const operationUpdate = (start, end, e) => {
    console.log("OperUpdate");
    console.log($('input[name="Redu"]').val());
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
            gymOperationInfoReservationDuration: $('input[name="Redu"]').val(),
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
            if (response.data == 1) {
                alert("빈 값이 있습니다. 확인 후 다시 등록해 주세요.");
            }
            else if (response.data == 2) {
                alert("Open Time과 Close Time을 다시 확인해 주세요.");
            }
            else if (response.data == 3) {
                alert("정기휴무를 일주일 내내로 선택할 수 없습니다. 다시 선택해주세요.");
            }
            else if (response.data == 4) {
                alert("error! 헬스장 운영정보를 등록할 수 없습니다.");
            }
            else {
                alert("헬스장 운영정보가 정상적으로 등록되었습니다.");
            }
        })
        .catch((response) => {
            console.log('Error!')
        });
}
function StaticTimePickerLandscape({ id, start, end, RholiyD, reserveD }) {
    const [value, setValue] = React.useState(new Date());
    console.log(reserveD);
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
            <Button variant="btn btn-secondary" onClick={(e) => { operationUpdate($("#OpenTime").val(), $("#CloseTime").val(), e) }}>수정</Button>
        </div>
    );
}
export default StaticTimePickerLandscape;