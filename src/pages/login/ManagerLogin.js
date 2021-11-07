import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'

let ModalContent = styled.div`
    display: table-row;
`
let StyledInputText = styled.input`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : `#FFFFFF`};;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#000000;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:225px;
    height:30px;
`;
class ManagerLogin extends Component {
    managerLoginSystem = function () {
        console.log("Manager Login");
        console.log($("#MPassword").val());
        //true전송되면 관리자 메인으로 가도록
        //빈 문자열이면 요청x
        axios.post('http://localhost:8080/manager/login',
            {
                managerPassword: $("#MPassword").val()
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
                alert("관리자 로그인 성공!\n 관리자 페이지로 이동합니다.");
                window.location.href = "/manager";
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }
    render() {
        return (
            <ModalContent>
                관리자 로그인
                <br />
                <br />
                <StyledInputText id="MPassword" name="MPassword" type='password' placeholder=" 관리자 패스워드 입력" backgroundColor="#F2F2F2" ></StyledInputText>
                <br />
                <InputButton type='button' value='확인' onClick={this.managerLoginSystem}></InputButton>

            </ModalContent>
        );
    }
}

export default ManagerLogin;
