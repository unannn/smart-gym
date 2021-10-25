import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/InputText';
import InputButton from '../../components/InputButton'

let ModalContent = styled.div`
    display: table-row;
`

class FindId extends Component {
    render() {
        return (
            <ModalContent>
                아이디 찾기
                <br />
                <br />
                <InputText type='text' placeholder="이름 입력" backgroundColor="#F2F2F2"></InputText>
                <InputText type='text' placeholder="이메일 주소 입력" backgroundColor="#F2F2F2"></InputText>
                <br />
                <InputButton type='button' value='확인'></InputButton>
            </ModalContent>
        );
    }
}



export default FindId;