import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'

let ModalContent = styled.div`
    display: table-row;
`

class FindPwd extends Component {
    render() {
        return (
            <ModalContent>
                비밀번호 찾기
                <br />
                <br />
                <InputText type='text' placeholder="아이디 입력" backgroundColor="#F2F2F2"></InputText>
                <InputText type='text' placeholder="이메일 주소 입력" backgroundColor="#F2F2F2"></InputText>
                <br />
                <InputButton type='button' value='확인'></InputButton>
            </ModalContent>
        );
    }
}

export default FindPwd;