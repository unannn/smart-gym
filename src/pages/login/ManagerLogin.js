import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/InputText';

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
                <InputText type='password' placeholder=" 관리자 패스워드 입력" ></InputText>
                <br />
                <InputText type='button' value='확인'></InputText>
            </ModalContent>
        );
    }
}

export default ManagerLogin;
