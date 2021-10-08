import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/InputText';

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
                <InputText type='text' placeholder="이메일 주소 입력" ></InputText>
                <br />
                <InputText type='button' value='확인'></InputText>
            </ModalContent>
        );
    }
}



export default FindId;