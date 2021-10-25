/* eslint-disable no-duplicate-case */
import React from 'react';
import InputText from '../../components/InputText';
import Box from '../../components/Box';
import styled from "styled-components";
import FindAccountModal from '../../components/Modal';
import FindId from './FindId';
import FindPwd from './FindPwd';
import SignUp from './SignUp';
import ManagerLogin from './ManagerLogin';
import InputButton from '../../components/InputButton'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {
                userID: '',
                userPassword: ''
            },
            findId: false,
            findPwd: false,
            signUp: false,
            managerLogin: false
        }
    }

    closeFindId() {
        this.setState({ findId: !this.state.findId })
    }

    closeFindPwd() {
        this.setState({ findPwd: !this.state.findPwd })
    }

    closeSignUp() {
        this.setState({ signUp: !this.state.signUp })
    }

    closeManagerLogin() {
        this.setState({ managerLogin: !this.state.managerLogin })
    }

    getCurrenOpenModal() {
        if (this.state.findId) return <FindAccountModal onClick={this.closeFindId.bind(this)}><FindId></FindId></FindAccountModal>
        else if (this.state.findPwd) return <FindAccountModal onClick={this.closeFindPwd.bind(this)}><FindPwd></FindPwd></FindAccountModal>
        else if (this.state.signUp) return <FindAccountModal onClick={this.closeSignUp.bind(this)}><SignUp></SignUp></FindAccountModal>
        else if (this.state.managerLogin) return <FindAccountModal onClick={this.closeManagerLogin.bind(this)}><ManagerLogin></ManagerLogin></FindAccountModal>
        return null;
    }

    login() {
        sessionStorage.setItem('login', 'OK');


    }

    handleChange1(event) {
        console.log(event.type + ':' + event.target.value);
        this.setState({
            account: {
                userID: event.target.value,
            }
        });
    }
    handleChange2(event) {
        this.setState({
            account: {
                userPassword: event.target.value
            }
        });
    }
    handleSubmit(event) {
        console.log('A id was submitted: ' + this.state.account.userID);
        console.log('A pwd was submitted: ' + this.state.account.userPassword);
        event.preventDefault();
    }

    render() {

        let modal = null;

        modal = this.getCurrenOpenModal();


        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="login-title">SEJONG<br />GYM</div>
                <div>
                    <Box height="">
                        <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                            <InputText type='text' onChange={this.handleChange1.bind(this)} value={this.state.account.userID} placeholder="아이디 입력"></InputText>
                            <br />
                            <InputText type='password' onChange={this.handleChange2.bind(this)} value={this.state.account.userPassword} placeholder="비밀번호 입력"></InputText>
                            <InputButton type="submit" value="로그인" onClick={this.login} />
                        </form>

                        <LoginMenu>
                            <LoginMenuElement onClick={() => this.setState({ findId: !this.state.findId })}>
                                아이디 찾기
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement onClick={() => this.setState({ findPwd: !this.state.findPwd })}>
                                비밀번호 찾기
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement onClick={() => this.setState({ signUp: !this.state.signUp })}>
                                회원가입
                            </LoginMenuElement>
                        </LoginMenu>
                    </Box>
                    <MangerLoginDiv onClick={() => this.setState({ managerLogin: !this.state.managerLogin })}>
                        관리자 로그인 {'>'}
                    </MangerLoginDiv>
                </div>


                {modal}

            </div>
        )
    }
}


let LoginMenu = styled.ul`
    text-align:center;
    padding-left:0;
    margin:3px;
`
let LoginMenuElement = styled.li`
    position: relative;
    display: inline-block;
    font-size:14px;
`

let MangerLoginDiv = styled.div`
   max-width: 400px;
   margin: 0 auto;
   text-align:left;
   margin-top:10px;
   font-size:14px;
`
let StyledSpan = styled.span`
    display: inline-block;
    width: 1px;
    height: 16px;
    margin: 3px 10px 0 10px;
    background: #d6d6d6;
    text-indent: -9999px;
    vertical-align: top;
`

export default Login;