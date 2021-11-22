import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
import La from "../Reservation/lalala";
let InfoBox = styled.div`
&:hover {                
    background: #FFD2D5;
  }
  left: -17%;
   position: relative;
   width: 260px;
   height: 40px;

   text-align: center;
   border-radius: 5px;
   padding:0px;
   margin:0 auto;
   margin-bottom:5px;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   width: 220px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
const CList = ["chest", "back", "neck", "stomach", "triceps", "trapezius", "shoulder", "aerobic", "biceps", "lower_body", "waist", "etc"];
const KorCList = ["가슴", "등", "목", "복부", "삼두", "승모근", "어깨", "유산소", "이두", "하체", "허리", "기타"];
//useState({ endTime: "", equipmentName: "", equipmentNameNth: "", reservationID: 0, startTime: "", userID: "" });

function ESLItem({ key, ESLId }) {
    //apiNumber 0: Layout/1:Reservation/2:ESL
    const deleteESL = (ESLId, e) => {
        console.log("deleteESL");
        /*axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: data.data,
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 운동기구 목록 조회에 실패했습니다.");
            });*/
    }
}
return (
    <div>
        <div onClick={(e) => { deleteESL(ESLId, e) }}>
            <InfoBox className="component component--item_card" key={key}>
                <input type="hidden" id="Eid" value={EquipmentId} />
                <Cell style={{ float: 'left', fontSize: '17px', width: "50px" }} id="numE">{ESLId}</Cell>
                <div style={{ float: 'left' }}>
                    <ButtonCus variant="btn btn-primary" style={{ height: '40px' }} onClick={(e) => { deleteESL(ESLId, e) }}>ESL삭제</ButtonCus>&nbsp;&nbsp;
                </div>
            </ InfoBox >
            <input type='hidden' id="Hob" />
        </div >
    </div>
);
}
export default ESLItem;