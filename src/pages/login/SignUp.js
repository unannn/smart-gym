import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import Box from '../../components/user/Box'
import axios from "axios";
import $ from "jquery";

let ModalContent = styled.div`
    display: table-row;
`
class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userID: '',
            userPW: '',
            userPWCheck: '',
            userName: '',
            userSex: '',
            userPhone: '',
            userEmail: '',
            //asdf
            isValidID: true,
            isValidPhone: true,
            isValidEmail: true
        }
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    handleIDChange(e) {
        this.setState({ userID: e.target.value });
    }

    handlePWChange(e) {
        this.setState({ userPW: e.target.value })
    }

    handlePWCheckChange(e) {
        this.setState({ userPWCheck: e.target.value })
    }

    handleNameChange(e) {
        this.setState({ userName: e.target.value })
    }

    handleSexChange(e) {
        this.setState({ userSex: e.target.value })
    }

    handlePhoneNumberChange(e) {
        this.setState({ userPhone: e.target.value })
    }

    handleEmailChange(e) {
        this.setState({ userEmail: e.target.value })
    }

    //아이디, 폰, 이메일 체크
    handleIDBlur(e) {
        console.log("id blur")
        axios.post('http://localhost:8080/unAllowedUser/idDuplicateCheck',
            {
                userID: this.state.userID,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    handlePhoneBlur(e) {
        console.log("phone blur");
        axios.post('http://localhost:8080/unAllowedUser/phoneDuplicateCheck',
            {
                userPhone: this.state.userPhone,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
                this.setState({ isValidPhone: response.data });
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }

    handleEmailBlur(e) {
        console.log("email blur")
        axios.post('http://localhost:8080/unAllowedUser/emailDuplicateCheck',
            {
                userEmail: this.state.userEmail,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data)
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }

    render() {

        let IDErrorMessage = "이미 존재하는 아이디 입니다.";
        let phoneErrorMessage = "이미 존재하는 휴대번호 입니다.";
        let emailErrorMessage = "이미 존재하는 이메일 입니다.";


        return (
            <ModalContent>
                회원가입
                <br />
                <br />
                <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                    <Box>
                        <InputTitle>아이디</InputTitle>
                        <InputText type='text' id="userID" onBlur={this.handleIDBlur.bind(this)} onChange={this.handleIDChange.bind(this)} value={this.state.userID || ''}></InputText>
                        {this.state.isValidID ? '' : <ErrorMessageStyle>{IDErrorMessage}</ErrorMessageStyle>}
                        <InputTitle>비밀번호</InputTitle>
                        <InputText type='password' id="userPW" onChange={this.handlePWChange.bind(this)} value={this.state.userPW || ''}></InputText>
                        <InputTitle>비밀번호 확인</InputTitle>
                        <InputText type='password' id="userPWCheck" onChange={this.handlePWCheckChange.bind(this)} value={this.state.userPWCheck || ''}></InputText>
                    </Box>
                    <Box>
                        <InputTitle>이름</InputTitle>
                        <InputText type='text' id="userName" onChange={this.handleNameChange.bind(this)} value={this.state.userName || ''}></InputText>
                        <InputTitle>성별</InputTitle>
                        <InputText type='text' id="userSex" onChange={this.handleSexChange.bind(this)} value={this.state.userSex || ''}></InputText>

                        {/* <label><input type="checkbox" name="sex" value="남자" onChange={this.handleMaleChange.bind(this)} />남자</label>
                        <label><input type="checkbox" name="sex" value="여자" defaultChecked />여자</label> */}
                        <InputTitle>휴대번호</InputTitle>
                        <InputText type='text' id="userPhone" onBlur={this.handlePhoneBlur.bind(this)} onChange={this.handlePhoneNumberChange.bind(this)} value={this.state.userPhone || ''} ></InputText>
                        {this.state.isValidPhone ? '' : <ErrorMessageStyle>{phoneErrorMessage}</ErrorMessageStyle>}
                        <InputTitle>이메일</InputTitle>
                        <InputText type='text' id="userEmail" onBlur={this.handleEmailBlur.bind(this)} onChange={this.handleEmailChange.bind(this)} value={this.state.userEmail || ''} ></InputText>
                        {this.state.isValidEmail ? '' : <ErrorMessageStyle>{emailErrorMessage}</ErrorMessageStyle>}

                    </Box>
                    <br />
                    <InputButton type='submit' value='확인'></InputButton>
                </form>
            </ModalContent >
        );
    }
}

let InputTitle = styled.div`
    text-align:left;
    margin: 0 auto;
    width:225px;
`

let ErrorMessageStyle = styled.div`
    color:red;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;

`;

export default SignUp;