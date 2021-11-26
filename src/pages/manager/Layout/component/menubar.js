import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
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
   font-size: 13pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
   `;

class ManagerBar extends React.Component {
    loadItem = async () => {
        axios.get('http://localhost:8080/manager/isLogin')
            .then((data) => {
                console.log(data.data)
                if (data.data == false) {
                    alert("권한이 없습니다.\n로그인을 먼저해주세요.");
                    window.location.href = "/";
                }
            })
            .catch(e => {
                console.error(e);
                alert("error! 로그인 정보를 불러올 수 없습니다.");
            });

    };
    logOut = function () {
        console.log("logOUt");
        if (window.confirm("로그아웃하면 다시 돌아올 수 없습니다.\n로그아웃 하시겠습니까?")) {
            axios.post('http://localhost:8080/manager/saveLoginStatus',
                {
                    managerLoginStatus: "false"
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            )
                .then((response) => {
                    console.log("response");
                    alert("로그아웃 되었습니다.\n다시 관리자 화면으로 돌아오시려면 재로그인 해주세요.");
                    window.location.href = "/";
                })
                .catch((response) => {
                    alert("error! 로그아웃을 할 수 없습니다.");
                });
        }
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        return (
            <div>
                <center>
                    <br />
                    <Link to="/manager" style={{ color: "black" }}>
                        <img src="./image/Logo.png" width="200px" height="50px" /><br />
                    </Link>
                    <div style={{ position: 'relative', width: '100px', left: "-940px", top: "-70px", background: 'pink' }}>
                        <div style={{ position: 'absolute', width: '200px', left: "1450px", top: "5px" }}>
                            <label style={{ display: "inline", listStyleYype: "none" }}>관리자 님 &nbsp;</label>
                            <Button variant="btn btn-secondary" onClick={this.logOut}>Logout</Button>
                        </div>
                    </div>
                    <div style={{ position: "relative", top: "0px", overflow: 'visible' }}>
                        <hr width="100*vw" />
                    </div>
                    <div style={{ width: '1300px', position: "relative", top: "-17px" }}>
                        <Link to="/manager" style={{ color: "black" }}>
                            <MenuBar>
                                <img src="icon/icon_home_simple.png" width="38%" height="150%" />
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
                        <Link to="reservationLog" style={{ color: "black" }}>
                            <MenuBar>
                                이력조회
                            </MenuBar>
                        </Link>
                        <Link to="/statistic" style={{ color: "black" }}>
                            <MenuBar>
                                통계
                            </MenuBar>
                        </Link>
                        <Link to="esl" style={{ color: "black" }}>
                            <MenuBar>
                                ESL 장치관리
                            </MenuBar>
                        </Link><br />
                    </div>
                    <div style={{ position: "relative", top: "-18px" }}>
                        <hr width="100%" />
                    </div>
                </center >
            </div >
        )
    }
}

export default ManagerBar