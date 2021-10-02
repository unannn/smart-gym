import React from 'react';
import InputText from '../../components/InputText';
import Box from '../../components/Box';
import TextButton from '../../components/TextButton';
import styled from "styled-components";

let LoginMenu = styled.ul`
    text-align:center;
    padding-left:0;
`
let LoginMenuElement = styled.li`
    position: relative;
    display: inline-block;
`

let StyledA = styled.a`
    display: inline-block;
    font-size: 16px;
    line-height: 18px;
    text-decoration: none;
    color: #888;
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

class Login extends React.Component {
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
                <h1>Sejong GYM</h1>
                <div>
                    <Box height="">
                        <form action="submit">
                            <InputText type='text'></InputText>
                            <br />
                            <InputText type='password'></InputText>
                        </form>
                        <InputText type="button" value="로그인" />
                        <LoginMenu>
                            <LoginMenuElement>
                                <StyledA href="">아이디 찾기</StyledA>
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement>
                                <StyledA href="">비밀번호 찾기</StyledA>
                            </LoginMenuElement>
                            <StyledSpan>|</StyledSpan>
                            <LoginMenuElement>
                                <StyledA href="">회원가입</StyledA>
                            </LoginMenuElement>
                        </LoginMenu>
                    </Box>
                </div>

                <div>
                    관리자 로그인 {'>'}
                </div>



            </div>
        )
    }
}

export default Login;