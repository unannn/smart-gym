import React, { Component } from 'react';
import Box from '../../components/user/Box';
import styled from "styled-components";
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import Logout from '../../components/user/Logout';
import axios from 'axios'
import Modal from '../../components/user/Modal'

class MyPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            id: null,
            password: null,
            sex: null,
            phoneNumber: null,
            email: null,
            modifyMode: false,

            defaultPhoneNumber: null,
            defaultEmail: null,

            changePasswordModal: false,
            recentPassword: '',
            newPassword: '',
            newPasswordCheck: '',

            deleteAccountModal: false,
            passwordCheck: '',
            isMatchedPssword: true,

            isValidPhone: true,
            isValidEmail: true,
            phoneMessage: '',
            emailMessage: ''
        }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        axios.post('http://localhost:8080/allowedUser/readUserInfo',
            {
                userID: window.sessionStorage.getItem('id')
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const userData = response.data.data;
                console.log(userData);
                this.setState({
                    name: userData.userName,
                    id: userData.userID,
                    password: userData.userPW,
                    sex: userData.userSex,
                    phoneNumber: userData.userPhone,
                    email: userData.userEmail,

                    defaultPhoneNumber: userData.userPhone,
                    defaultEmail: userData.userEmail,
                })
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    handleChange(e, data) {
        this.setState({ [data]: e.target.value }, () => console.log(this.state[data]));
    }

    handleDeleteAccountSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/allowedUser/login',
            {
                userID: window.sessionStorage.getItem('id'),
                userPW: this.state.passwordCheck
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const userData = response.data;
                console.log(userData)
                if (userData.success && userData.data === 0) {
                    axios.post('http://localhost:8080/allowedUser/deleteUser',
                        {
                            userID: window.sessionStorage.getItem('id')
                        },
                        {
                            headers: {
                                'Content-type': 'application/json',
                                'Accept': 'application/json'
                            }
                        })
                        .then((response) => {
                            console.log(response.data);

                        })
                        .catch((response) => {
                            console.log('Error');
                            console.log(response);
                        });
                    alert("계정이 삭제되었습니다.");
                    window.sessionStorage.clear();
                    window.location.reload();
                }
                else {
                    alert("비밀번호가 일치하지 않습니다.");
                }

            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }

    handleChangePasswordSubmit(e) {
        if (this.state.password === this.state.recentPassword) {
            if (this.state.newPassword === this.state.newPasswordCheck) {
                if (!this.state.newPassword.length === 0 && !this.state.newPassword.includes(' ')) {
                    //요청보내는 부분
                }
                else {
                    alert('사용할 수 없는 비밀번호입니다.');
                }
            }
            else {
                alert('새 비밀번호 입력이 일치하지 않습니다.');
            }
        }
        else {
            alert('현재 비밀번호 입력이 틀렸습니다.');
        }
    }

    modifyMyInfo(e) {


        if (this.state.isValidEmail && this.state.isValidPhone) {
            axios.post('http://localhost:8080/allowedUser/updateUser',
                {
                    userID: window.sessionStorage.getItem('id'),
                    userPW: this.state.password,
                    userName: this.state.name,
                    userSex: this.state.sex,
                    userPhone: this.state.phoneNumber,
                    userEmail: this.state.email
                },
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                })
                .then((response) => {
                    const res = response.data;
                    if (res.success) {
                        console.log(res.data);
                    }
                    alert('수정이 완료 되었습니다.')

                    this.getUserInfo();
                    this.setState({ emailMessage: '', phoneMessage: '' });

                })
                .catch((response) => {
                    console.log('Error');
                    console.log(response);
                });
        }


    }

    handlePhoneBlur(e) {
        //숫자 인지, 길이가 13 인지 검사
        if (this.state.phoneNumber.length !== 11 || !/\d/.test(this.state.phoneNumber)) {
            this.setState({
                isValidPhone: false,
                phoneMessage: '사용 불가능한 휴대번호 입니다.'
            })
            return;
        }

        axios.post('http://localhost:8080/user/phoneDuplicateCheck',
            {
                userPhone: this.state.phoneNumber,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                const content = response.data;

                if (content.data) { //사용가능한 휴대번호                    
                    this.setState({
                        isValidPhone: true,
                        phoneMessage: '사용 가능한 휴대번호 입니다.'
                    })
                }
                else {
                    if (this.state.phoneNumber !== this.state.defaultPhoneNumber) {
                        this.setState({
                            isValidPhone: true,
                            phoneMessage: ''
                        })
                    }
                    else {
                        this.setState({
                            isValidPhone: false,
                            phoneMessage: '이미 사용 중인 휴대번호 입니다.'
                        })
                    }
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }

    handleEmailBlur(e) {

        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


        if (this.state.email === '' || !emailRegex.test(this.state.email)) {
            this.setState({
                isValidEmail: false,
                emailMessage: '사용 불가능한 이메일 입니다.'
            })
            return;
        }

        axios.post('http://localhost:8080/user/emailDuplicateCheck',
            {
                userEmail: this.state.email,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                const content = response.data;

                if (content.data) { //사용가능한 이메일
                    this.setState({
                        isValidEmail: true,
                        emailMessage: '사용 가능한 이메일 입니다.'
                    })
                }
                else {
                    if (this.state.email === this.state.defaultEmail) {
                        this.setState({
                            isValidEmail: true,
                            emailMessage: ''
                        })
                    }
                    else {
                        this.setState({
                            isValidEmail: false,
                            emailMessage: '이미 사용 중인 이메일 입니다.'
                        })
                    }
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    render() {
        return (
            <MypageStyle>
                <br />
                <br />
                <MyPageBoxStyle>
                    <InputTitle>아이디</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='text' value={this.state.id}></InputText>
                    </UserDataLineStyle>
                    <InputTitle>비밀번호</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='password' value={this.state.password}></InputText>
                        <ModifyButtonStyle onClick={() => this.setState({ changePasswordModal: true })}>
                            변경
                        </ModifyButtonStyle>
                    </UserDataLineStyle>

                    <Logout />

                </MyPageBoxStyle>
                <MyPageBoxStyle>
                    <InputTitle>이름</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='text' value={this.state.name}></InputText>

                    </UserDataLineStyle>

                    <InputTitle>성별</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='text' value={this.state.sex}></InputText>

                    </UserDataLineStyle>

                    <InputTitle>휴대번호</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='text' onChange={(e) => this.handleChange(e, "phoneNumber")} value={this.state.phoneNumber} onBlur={this.handlePhoneBlur.bind(this)}></InputText>
                        <ModifyButtonStyle onClick={(e) => this.modifyMyInfo(e)}>
                            수정
                        </ModifyButtonStyle>
                    </UserDataLineStyle>
                    {this.state.isValidPhone ? <ValidMessageStyle>{this.state.phoneMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.phoneMessage}</ErrorMessageStyle>}
                    <InputTitle>이메일</InputTitle>
                    <UserDataLineStyle>
                        <InputText type='text' onChange={(e) => this.handleChange(e, "email")} value={this.state.email} onBlur={this.handleEmailBlur.bind(this)} ></InputText>
                        <ModifyButtonStyle onClick={(e) => { this.modifyMyInfo(e) }}>
                            수정
                        </ModifyButtonStyle>
                    </UserDataLineStyle>
                    {this.state.isValidEmail ? <ValidMessageStyle>{this.state.emailMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.emailMessage}</ErrorMessageStyle>}
                </MyPageBoxStyle>
                <MyPageBoxStyle>
                    <StyledButtonArea onClick={() => this.setState({ deleteAccountModal: true })}>
                        <StyledMenuText>
                            회원 탈퇴
                        </StyledMenuText>
                    </StyledButtonArea>
                </MyPageBoxStyle>
                {this.state.deleteAccountModal &&
                    <Modal onClick={() => this.setState({ deleteAccountModal: false })}>
                        정말 탈퇴하시겠습니까?
                        <form onSubmit={this.handleDeleteAccountSubmit.bind(this)} autoComplete={"off"}>
                            <InputText type='password' id="passwordCheck" onChange={(e) => this.handleChange(e, "passwordCheck")} value={this.state.passwordCheck} placeholder="비밀번호 입력" backgroundColor="#F2F2F2"></InputText>
                            {/* {this.state.isValid ? <UserIDStyle>{this.state.userPW}</UserIDStyle> : <ErrorMessageStyle>입력이 옳바르지 않습니다.</ErrorMessageStyle>} */}
                            <InputButton type='submit' value='확인'></InputButton>
                        </form>
                    </Modal>
                }
                {this.state.changePasswordModal &&
                    <Modal onClick={() => this.setState({ changePasswordModal: false })}>
                        비밀번호 변경
                        <br />
                        <br />
                        <form onSubmit={this.handleChangePasswordSubmit.bind(this)} autoComplete={"off"}>
                            <InputText type='password' id="recentPassword" onChange={(e) => this.handleChange(e, "recentPassword")} value={this.state.recentPassword} placeholder="현재 비밀번호 입력" backgroundColor="#F2F2F2"></InputText>
                            <InputText type='password' id="newPassword" onChange={(e) => this.handleChange(e, "newPassword")} value={this.state.newPassword} placeholder="새 비밀번호 입력" backgroundColor="#F2F2F2"></InputText>
                            <InputText type='password' id="passwordnewPasswordCheckCheck" onChange={(e) => this.handleChange(e, "newPasswordCheck")} value={this.state.newPasswordCheck} placeholder="새 비밀번호 확인" backgroundColor="#F2F2F2"></InputText>

                            {/* {this.state.isValid ? <UserIDStyle>{this.state.userPW}</UserIDStyle> : <ErrorMessageStyle>입력이 옳바르지 않습니다.</ErrorMessageStyle>} */}
                            <InputButton type='submit' value='확인'></InputButton>
                        </form>
                    </Modal>
                }
            </MypageStyle >
        );
    }
}

const MypageStyle = styled.div`
    max-width: 768px;
    margin:0 auto;

`;

const UserDataLineStyle = styled.div`
                    display:flex;
                    justify-content:space-between;
                    width:300px;
                    margin: 0 auto;
                    `;

const MyPageBoxStyle = styled.div`
                    background-color:#F5F5F5;
                    padding:20px;
                    min-width:350px;
                    width:100%;
                    text-align:center;
                    margin:0 auto;
                    margin-bottom:4px;
                    border-top:1px #E0E0E0 solid;
                    border-bottom:1px #E0E0E0 solid;

                    `;

var StyledMenuText = styled.div`
                    font-size:15px;
                    display: inline-block;
                    padding-left : 10px;
                    margin-bottom:8px;
                    margin-top:8px;
                    `;


var StyledButtonArea = styled.div`
                    width:99%;
                    max-width:500px;
                    margin: 0 auto;
                    padding-top:10px;
                    padding-bottom:10px;
                    margin-top:10px;
                    background-color:red;
                    color:white;
                    border-radius:6px;
                    `

let ModifyButtonStyle = styled.div`
                    display:inline-block;
                    padding-top: 5px;
                    font-size: 15px;
                    text-align:center;
                    width: 60px;
                    height:30px;
                    padding-top:5px;
                    margin-bottom:10px;
                    margin-left:10px;
                    background-color:#888888;
                    border:1px #777777 solid;
                    color:white;
                    `

let StyledMyInfo = styled.div`
                    margin:0 auto;
                    width:400px;
                    height:200px;
                    display: table-cell;
                    text-align:center;
                    vertical-align:middle;
                    `;

let InputTitle = styled.div`
                    text-align:left;
                    margin: 0 auto;
                    width:300px;
                    `

let ValidMessageStyle = styled.div`
    color:green;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

let ErrorMessageStyle = styled.div`
    color:red;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

export default MyPage;