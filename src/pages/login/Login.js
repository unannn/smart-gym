/* eslint-disable no-duplicate-case */
import React from 'react';
import InputText from '../../components/InputText';
import Box from '../../components/Box';
import TextButton from '../../components/TextButton';
import styled from "styled-components";
import MyModal from '../../components/Modal';
import FindAccontModal from '../../components/Modal';


class Login extends React.Component {

    state = {
        findId: false,
        findPwd: false,
        signUp: false,
        ManagerLogin: false
    }

    select = (request) => {
        console.log(request)
        switch (request) {
            case "findId":
                this.setState({ findId: !this.state[request] })
                break;
            case "findPwd":
                this.setState({ findPwd: !this.state[request] })
                break;
            case "signUp":
                this.setState({ signUp: !this.state[request] })
                break;
            case "managerLogin":
                this.setState({ ManagerLogin: !this.state[request] })
                break;
            default:
                break;
        }
    }


    render() {
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
                            <LoginMenuElement onClick={() => this.select("findId")}>
                                아이디 찾기
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement onClick={() => this.select("findPwd")}>
                                비밀번호 찾기
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement onClick={() => this.select("signUp")}>
                                회원가입
                            </LoginMenuElement>
                        </LoginMenu>
                    </Box>
                </div>

                <div onClick={() => this.select("managerLogin")}>
                    관리자 로그인 {'>'}
                </div>

                {this.state.findId && <h1><FindAccontModal></FindAccontModal></h1>}

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