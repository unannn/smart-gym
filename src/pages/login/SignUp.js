import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import Box from '../../components/user/Box'
import axios from "axios";

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
            userSex: '남자',
            userPhone: '',
            userEmail: '',

            //입력 유효성 정보
            isValidID: false,
            IDMessage: '',
            isValidPW: false,
            PWMessage: '',
            isValidPWCheck: false,
            PWCheckMessage: '',
            isValidName: false,
            nameMessage: '',
            isValidPhone: false,
            phoneMessage: '',
            isValidEmail: false,
            emailMessage: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.isValidSignUp()) {
            alert('정보를 올바르게 입력해주세요.');
            return;
        }

        axios.post('http://localhost:8080/unAllowedUser/register',
            {
                userID: this.state.userID,
                userPW: this.state.userPW,
                userName: this.state.userName,
                userSex: this.state.userSex,
                userPhone: this.state.userPhone,
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
                const content = response.data;
                if (content.data) { //회원가입 성공
                    alert('회원가입 성공헀습니다.');
                    window.location.reload();
                }
                else {
                    alert('회원가입에 실패했습니다.');
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
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

        if (this.state.userID.length === 0 || this.state.userID.includes(' ')) {
            this.setState({
                isValidID: false,
                IDMessage: '사용 불가능한 아이디 입니다.'
            })
            return;
        }

        axios.post('http://localhost:8080/user/idDuplicateCheck',
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
                const content = response.data;

                if (content.data) { //사용가능한 아이디
                    console.log("idCheck")
                    this.setState({
                        isValidID: true,
                        IDMessage: '사용 가능한 아이디 입니다.'
                    })
                }
                else {
                    this.setState({
                        isValidID: false,
                        IDMessage: '이미 사용 중인 아이디 입니다.'
                    })
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    handlePhoneBlur(e) {
        //숫자 인지, 길이가 13 인지 검사
        if (this.state.userPhone.length !== 11 || !/\d/.test(this.state.userPhone)) {
            this.setState({
                isValidPhone: false,
                phoneMessage: '사용 불가능한 휴대번호 입니다.'
            })
            return;
        }

        axios.post('http://localhost:8080/user/phoneDuplicateCheck',
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
                const content = response.data;

                if (content.data) { //사용가능한 휴대번호                    
                    this.setState({
                        isValidPhone: true,
                        phoneMessage: '사용 가능한 휴대번호 입니다.'
                    })
                }
                else {
                    this.setState({
                        isValidPhone: false,
                        phoneMessage: '이미 사용 중인 휴대번호 입니다.'
                    })
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

    }

    handleEmailBlur(e) {

        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;


        if (this.state.userEmail === '' || !emailRegex.test(this.state.userEmail)) {
            this.setState({
                isValidEmail: false,
                emailMessage: '사용 불가능한 이메일 입니다.'
            })
            return;
        }

        axios.post('http://localhost:8080/user/emailDuplicateCheck',
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
                const content = response.data;

                if (content.data) { //사용가능한 이메일
                    this.setState({
                        isValidEmail: true,
                        emailMessage: '사용 가능한 이메일 입니다.'
                    })
                }
                else {
                    this.setState({
                        isValidEmail: false,
                        emailMessage: '이미 사용 중인 이메일 입니다.'
                    })
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    //비밀번호, 비밀번호 확인, 이름 체크
    handlePWBlur(e) {
        if (this.state.userPW.length === 0 || this.state.userPW.includes(' ')) {
            this.setState({
                isValidPW: false,
                PWMessage: '사용 불가능한 비밀번호 입니다.'
            })
        }
        else {
            this.setState({
                isValidPW: true,
                PWMessage: '사용 가능한 비밀번호 입니다.'
            })
        }
    }

    handlePWCheckBlur(e) {
        if (this.state.userPW !== this.state.userPWCheck) {
            this.setState({
                isValidPWCheck: false,
                PWCheckMessage: '비밀번호가 일치하지 않습니다.'
            })
        }
        else {
            this.setState({
                isValidPWCheck: true,
                PWCheckMessage: ''
            })
        }

    }

    handleNameBlur(e) {
        if (this.state.userName.length === 0 || this.state.userName.includes(' ')) {
            this.setState({
                isValidName: false,
                nameMessage: '사용 불가능한 이름 입니다.'
            })
        }
        else {
            this.setState({
                isValidName: true,
                nameMessage: ''
            })
        }
    }

    //회원가입 가능 조사
    isValidSignUp() {
        if (this.state.isValidID && this.state.isValidPW && this.state.isValidPWCheck && this.state.isValidName
            && this.state.isValidPhone && this.state.isValidEmail) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <ModalContent>
                회원가입
                <br />
                <br />
                <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                    <Box>
                        <InputTitle>아이디 <InputGuideStyle>(공백없이 영문 소문자, 숫자만 가능)</InputGuideStyle></InputTitle>
                        <InputText type='text' id="userID" onBlur={this.handleIDBlur.bind(this)} onChange={this.handleIDChange.bind(this)} value={this.state.userID || ''}></InputText>
                        {this.state.isValidID ? <ValidMessageStyle>{this.state.IDMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.IDMessage}</ErrorMessageStyle>}
                        <InputTitle>비밀번호</InputTitle>
                        <InputText type='password' id="userPW" onBlur={this.handlePWBlur.bind(this)} onChange={this.handlePWChange.bind(this)} value={this.state.userPW || ''}></InputText>
                        {this.state.isValidPW ? <ValidMessageStyle>{this.state.PWMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.PWMessage}</ErrorMessageStyle>}
                        <InputTitle>비밀번호 확인</InputTitle>
                        <InputText type='password' id="userPWCheck" onBlur={this.handlePWCheckBlur.bind(this)} onChange={this.handlePWCheckChange.bind(this)} value={this.state.userPWCheck || ''}></InputText>
                        {this.state.isValidPWCheck ? <ValidMessageStyle>{this.state.PWCheckMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.PWCheckMessage}</ErrorMessageStyle>}
                    </Box>
                    <Box>
                        <InputTitle>이름</InputTitle>
                        <InputText type='text' id="userName" onBlur={this.handleNameBlur.bind(this)} onChange={this.handleNameChange.bind(this)} value={this.state.userName || ''}></InputText>
                        {this.state.isValidName ? <ValidMessageStyle>{this.state.nameMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.nameMessage}</ErrorMessageStyle>}

                        <InputTitle>성별</InputTitle>
                        <InputText type='text' id="userSex" onChange={this.handleSexChange.bind(this)} value={this.state.userSex || ''}></InputText>

                        {/* <label><input type="checkbox" name="sex" value="남자" onChange={this.handleMaleChange.bind(this)} />남자</label>
                        <label><input type="checkbox" name="sex" value="여자" defaultChecked />여자</label> */}
                        <InputTitle>휴대번호 <InputGuideStyle>('-' 없이 11자리)</InputGuideStyle></InputTitle>
                        <InputText type='text' id="userPhone" onBlur={this.handlePhoneBlur.bind(this)} onChange={this.handlePhoneNumberChange.bind(this)} value={this.state.userPhone || ''} ></InputText>
                        {this.state.isValidPhone ? <ValidMessageStyle>{this.state.phoneMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.phoneMessage}</ErrorMessageStyle>}
                        <InputTitle>이메일 <InputGuideStyle>(xxx@xxx.xx 혁식으로 입력)</InputGuideStyle></InputTitle>
                        <InputText type='text' id="userEmail" onBlur={this.handleEmailBlur.bind(this)} onChange={this.handleEmailChange.bind(this)} value={this.state.userEmail || ''} ></InputText>
                        {this.state.isValidEmail ? <ValidMessageStyle>{this.state.emailMessage}</ValidMessageStyle> : <ErrorMessageStyle>{this.state.emailMessage}</ErrorMessageStyle>}
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

let InputGuideStyle = styled.span`

    text-align:left;
    margin: 0 auto;
    width:225px;
    font-size:11px;
`;

export default SignUp;