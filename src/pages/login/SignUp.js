import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import Box from '../../components/user/Box'
let ModalContent = styled.div`
    display: table-row;
`
class SignUp extends Component {
    render() {
        return (
            <ModalContent>
                회원가입
                <br />
                <br />
                <Box>
                    <InputTitle>아이디</InputTitle>
                    <InputText type='text'></InputText>
                    <InputTitle>비밀번호</InputTitle>
                    <InputText type='text' ></InputText>
                    <InputTitle>비밀번호 확인</InputTitle>
                    <InputText type='text' ></InputText>
                </Box>
                <Box>
                    <InputTitle>이름</InputTitle>
                    <InputText type='text' ></InputText>
                    <InputTitle>성별</InputTitle>
                    <InputText type='text' ></InputText>
                    <InputTitle>휴대번호</InputTitle>
                    <InputText type='text' ></InputText>
                    <InputTitle>이메일</InputTitle>
                    <InputText type='text' ></InputText>
                </Box>
                <br />
                <InputButton type='button' value='확인'></InputButton>
            </ModalContent>
        );
    }
}

let InputTitle = styled.div`
    text-align:left;
    margin: 0 auto;
    width:225px;
`

export default SignUp;