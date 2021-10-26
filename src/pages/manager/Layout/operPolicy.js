import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
let Gyminfo = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: 20px;
   top: 100px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let GymOperinfo = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: 20px;
   top: 220px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let GymHoliyDay = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: 20px;
   top: 340px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
let GymReHoliyDay = styled.div`
   position: absolute;
   display: block;
   float: left;
   left: 20px;
   top: 460px;
   width: 400px;
   height: 100px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;
class OperPolicy extends React.Component {
    render() {
        return (
            <div>
                <ManagerBar></ManagerBar>
                <br />
                <div>
                    <Gyminfo>
                        <label>Gym-Name: </label>
                        <input type="text" id="Gname" name="Gname" /><br />
                        <label>Gym-Address: </label>
                        <input type="text" id="Gadd" name="Gadd" /><br />
                        <label>Gym-Number: </label>
                        <input type="text" id="Gnum" name="Gnum" /><br />
                    </Gyminfo>
                    <GymOperinfo>
                        <label>Gym-Open: </label>
                        <input type="text" id="StartTime" name="StartTime" /><br />
                        <label>Gym-Close: </label>
                        <input type="text" id="EndTime" name="EndTime" /><br />
                        <label>Reservation-time: </label>
                        <input type="text" id="ReTime" name="ReTime" /><br />
                        <div>
                            <label>월<input type="checkbox" id="mon" name="mon" /></label>
                            <label>화<input type="checkbox" id="Tue" name="Tue" /></label>
                            <label>수<input type="checkbox" id="Wed" name="Wed" /></label>
                            <label>목<input type="checkbox" id="Thu" name="Thu" /></label>
                            <label>금<input type="checkbox" id="Fri" name="Fri" /></label>
                            <label>토<input type="checkbox" id="Sat" name="Sat" /></label>
                            <label>일<input type="checkbox" id="Sun" name="Sun" /></label>
                        </div>
                    </GymOperinfo>
                    <GymHoliyDay>
                        <label>휴무일 등록</label>
                        <input tpye="text" id="Holiy" name="Holiy" />
                    </GymHoliyDay>
                    <div><lable>달력</lable></div>
                </div>
            </div >
        )
    }
}

export default OperPolicy;