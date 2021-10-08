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

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <h1>Sejong <br />GYM</h1>
                <div>
                    <Box height="">
                        <form action="submit">
                            <InputText type='text'></InputText>
                            <br />
                            <InputText type='password'></InputText>
                        </form>
                        <InputText type="button" value="로그인" />
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
                </div>

                <div onClick={() => this.setState({ managerLogin: !this.state.managerLogin })}>
                    관리자 로그인 {'>'}
                </div>

                {modal}

            </div>
        )
    }
}


let LoginMenu = styled.ul`
    text-align:center;
    padding-left:0;
`
let LoginMenuElement = styled.li`
    position: relative;
    display: inline-block;
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