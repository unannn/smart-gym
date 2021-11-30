import React from 'react';
import styled from 'styled-components';
import ManagerBar from './Layout/component/menubar.js';
import EquipmentM from './Layout/equipment.js';
import Footer from './Layout/component/footer';
import { Link } from 'react-router-dom';
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   height: 750px;
   top: -25px;
   margin: 0.5px;
   `;
let Icons = styled.div`
   position: relative;
   height: 150px;
   top: 40px;
   margin: 0.5px;
   `;
let Space = styled.div`
   position: relative;
   width: 120px;
   height: 100px;
   top: 40px;
   margin: 0.5px;
   background: pink;
   display: inline;
   `;
let MenuLabel = styled.label`
&:hover {
    background: darkgray;
  }
   cursor: pointer;
   border: 5px solid gray;
   font-size: 18px;
   border-radius: 10px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
class ManagerMain extends React.Component {
    render() {
        return (
            <div>
                <ManagerBar />
                <br />
                <center>
                    <BodyBox>
                        <div>
                            <img src="./icon/icon_menu.png" width="145px" />
                            <Icons style={{ width: '800px' }}>
                                <Link to="/userApproval" style={{ color: "black" }}>
                                    <img src="./icon/icon_userApproval.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/userManage" style={{ color: "black" }}>
                                    <img src="./icon/icon_user.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/equipmentLayout" style={{ color: "black" }}>
                                    <img src="./icon/icon_Layout_noLabel.png" width="130px" /><br />
                                </Link>
                                <Link to="/userApproval" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '-115px' }}>회원가입 승인</MenuLabel>
                                </Link>
                                <Link to="/userManage" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '-15px' }}>회원 관리</MenuLabel>
                                </Link>
                                <Link to="/equipmentLayout" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '95px' }}>배치도 등록</MenuLabel>
                                </Link>
                            </Icons>
                            <br /><br /><br />
                            <Icons style={{ width: '800px' }}>
                                <Link to="/equipment" style={{ color: "black" }}>
                                    <img src="./icon/icon_equipment.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/cEquipment" style={{ color: "black" }}>
                                    <img src="./icon/icon_equipmentCreate.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/operPolicy" style={{ color: "black" }}>
                                    <img src="./icon/icon_operpolicy.png" width="120px" /><br />
                                </Link>
                                <Link to="/equipment" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '-70px', top: "15px" }}>운동기구 관리</MenuLabel>
                                </Link>
                                <Link to="/cEquipment" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '10px', top: "15px" }}>운동기구 등록</MenuLabel>
                                </Link>
                                <Link to="/operPolicy" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '80px', top: "15px" }}>헬스장 운영정책</MenuLabel>
                                </Link>
                            </Icons>
                            <br /><br /><br />
                            <Icons style={{ width: '800px' }}>
                                <Link to="/reservationLog" style={{ color: "black" }}>
                                    <img src="./icon/icon_log.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/statistic" style={{ color: "black" }}>
                                    <img src="./icon/icon_chart.png" width="120px" />
                                </Link>
                                <img src="./image/space.png" width="80px" />
                                <Link to="/esl" style={{ color: "black" }}>
                                    <img src="./icon/icon_esl.png" width="120px" /><br />
                                </Link >
                                <Link to="/reservationLog" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '-90px', top: "15px" }}>예약 이력</MenuLabel>
                                </Link >
                                <Link to="/statistic" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '10px', top: "15px" }}>헬스장 통계</MenuLabel>
                                </Link >
                                <Link to="/esl" style={{ color: "black" }}>
                                    <MenuLabel style={{ position: "relative", left: '100px', top: "15px" }}>ESL 장치관리</MenuLabel>
                                </Link >
                            </Icons>
                        </div>
                    </BodyBox>
                    <div>
                        <br />
                        <br />
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}

export default ManagerMain;