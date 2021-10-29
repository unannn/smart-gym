import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'

let ModalContent = styled.div`
    display: table-row;
`

class ManagerLogin extends Component {
    render() {
        return (
            <ModalContent>
                관리자 로그인
                <br />
                <br />
                <InputText type='password' placeholder=" 관리자 패스워드 입력" backgroundColor="#F2F2F2" ></InputText>
                <br />
                <InputButton type='button' value='확인'></InputButton>

            </ModalContent>
        );
    }
}

export default ManagerLogin;
