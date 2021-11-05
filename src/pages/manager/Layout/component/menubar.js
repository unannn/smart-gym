import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//background: #949494; #545454;
let MenuBar = styled.li`
&:hover {                
    background: lightGray;
  }  
   position: relative;
   top:0px;
   float: left;
   width: 10%;
   height: 100%;
   font-size: 10pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
   `;

class ManagerBar extends React.Component {
    render() {
        return (
            <div>
                <center>
                    <br />
                    <img src="./image/Logo.png" width="200px" height="50px" /><br />
                    <div style={{ position: "relative", top: "0px" }}>
                        <hr width="100%" />
                    </div>
                    <div style={{ width: '1100px', position: "relative", top: "-17px" }}>
                        <Link to="/manager" style={{ color: "black" }}>
                            <MenuBar>
                                <img src="icon/icon_home_simple.png" width="42%" height="150%" />
                            </MenuBar>
                        </Link>
                        <Link to="/userApproval" style={{ color: "black" }}>
                            <MenuBar>
                                가입승인
                            </MenuBar>
                        </Link>
                        <Link to="/userManage" style={{ color: "black" }}>
                            <MenuBar>
                                회원관리
                            </MenuBar>
                        </Link>
                        <Link to="/equipmentLayout" style={{ color: "black" }}>
                            <MenuBar>
                                배치도 등록
                            </MenuBar>
                        </Link>
                        <Link to='equipment' style={{ color: "black" }}>
                            <MenuBar>
                                운동기구 관리
                            </MenuBar>
                        </Link>

                        <Link to="cEquipment" style={{ color: "black" }}>
                            <MenuBar>
                                운동기구 등록
                            </MenuBar>
                        </Link>

                        <Link to="operPolicy" style={{ color: "black" }}>
                            <MenuBar>
                                운영정책 관리
                            </MenuBar>
                        </Link>
                        <MenuBar>
                            이력조회
                        </MenuBar>
                        <MenuBar>
                            통계 그래프
                        </MenuBar>
                        <Link to="prac" style={{ color: "black" }}>
                            <MenuBar>
                                ESL장치 관리
                            </MenuBar>
                        </Link><br />
                    </div>
                    <div style={{ position: "relative", top: "-16.5px" }}>
                        <hr width="100%" />
                    </div>
                </center >
            </div >
        )
    }
}

export default ManagerBar