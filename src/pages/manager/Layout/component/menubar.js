import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

let MenuBar = styled.li`
&:hover {                
    background: #545454;
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
   background: #949494;
   `;

class ManagerBar extends React.Component {
    render() {
        return (
            <div>
                <center>
                    <div style={{ width: '1100px', }}>
                        <Link to="/manager">
                            <MenuBar>
                                Home
                            </MenuBar>
                        </Link>

                        <MenuBar>
                            가입승인
                        </MenuBar>
                        <Link to="/userManage">
                            <MenuBar>
                                회원관리
                            </MenuBar>
                        </Link>
                        <Link to="/equipmentLayout">
                            <MenuBar>
                                배치도 등록
                            </MenuBar>
                        </Link>
                        <Link to='equipment'>
                            <MenuBar>
                                운동기구 관리
                            </MenuBar>
                        </Link>

                        <Link to="cEquipment">
                            <MenuBar>
                                운동기구 등록
                            </MenuBar>
                        </Link>

                        <Link to="operPolicy">
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
                        <Link to="prac">
                            <MenuBar>
                                ESL장치 관리
                            </MenuBar>
                        </Link>
                    </div>
                </center >
            </div >
        )
    }
}

export default ManagerBar