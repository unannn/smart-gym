import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
const RDList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const KorRDList = ["월", "화", "수", "목", "금", "토", "일"];
function StaticTimePickerLandscape({ id, start, end, RholiyD, reserveD, reloadF }) {
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
        if (window.confirm("해당 헬스장 운영 정보를 등록하시겠습니까?\nOpen Time: " + start +
            "\nClose Time: " + end +
            "\nReservation Duration(day): " + $('input[name="Redu"]').val() +
            "\nRegularHoliday: " + RHD)) {
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
                        { reloadF() }
                    }
                })
                .catch((response) => {
                    console.log('Error!')
                });
        }
        else {
            //alert("헬스장 운영정보 등록을 취소하셨습니다.");
        }
    }
    const [value, setValue] = React.useState(new Date());
    console.log(reserveD);
    return (
        <div>
            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 운영정보</label><br /><br />

            <div style={{ position: "relative", top: "-10px", float: "left" }}>
                < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                    <TextField color="secondary" variant="standard" id="OpenTime" label="Opne" type="time" key={start} defaultValue={start} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
                </Stack >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                < Stack component="form" noValidate spacing={3} style={{ display: "inline" }}>
                    <TextField color="secondary" variant="standard" id="CloseTime" label="Close" type="time" key={end} defaultValue={end} InputLabelProps={{ shrink: true, }} inputProps={{ step: 300, /* 5 min*/ }} sx={{ width: 150 }} />
                </Stack ><br /><br />

                <TextField style={{ float: "left", width: "350px" }} required id="standard-required" label="Reservation Duration(day)" variant="standard" key={reserveD} defaultValue={reserveD} name="Redu" color="secondary" /><br /><br /><br />

                <div>
                    <label style={{ float: "left", fontSize: "12px", color: "#666666" }}>Regular Holiday&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <span style={{ lineHeight: "200%" }}><br /></span>
                    <label>월<input type="checkbox" name="ReHoliyDay" value="Mon" /></label>&nbsp;&nbsp;
                    <label>화<input type="checkbox" name="ReHoliyDay" value="Tue" /></label>&nbsp;&nbsp;
                    <label>수<input type="checkbox" name="ReHoliyDay" value="Wed" /></label>&nbsp;&nbsp;
                    <label>목<input type="checkbox" name="ReHoliyDay" value="Thu" /></label>&nbsp;&nbsp;
                    <label>금<input type="checkbox" name="ReHoliyDay" value="Fri" /></label>&nbsp;&nbsp;
                    <label>토<input type="checkbox" name="ReHoliyDay" value="Sat" /></label>&nbsp;&nbsp;
                    <label>일<input type="checkbox" name="ReHoliyDay" value="Sun" /></label>
                </div>
                <hr style={{ border: "0", height: "1.5px", color: "black" }} />
                <Button variant="btn btn-secondary" style={{ position: "relative", top: "-4px", left: "170px" }} onClick={(e) => { operationUpdate($("#OpenTime").val(), $("#CloseTime").val(), e) }}>헬스장 운영정보 등록</Button>
            </div>
        </div>
    );
}
export default StaticTimePickerLandscape;