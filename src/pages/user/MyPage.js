import React, { Component } from 'react';
import TopBar from '../../components/user/TopBar';
import Box from '../../components/user/Box';
import styled from "styled-components";
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'

class MyPage extends Component {
    render() {
        return (
            <div>
                <TopBar>내 정보</TopBar>
                <br />
                <StyledMyInfo>
                    이윤환 님
                </StyledMyInfo>
                <br />
                <Box>
                    <InputTitle>아이디</InputTitle>
                    <InputText type='text' value="asdf"></InputText>
                    <InputTitle>이름</InputTitle>
                    <InputText type='text' value="이윤환"></InputText>
                    <InputTitle>성별</InputTitle>
                    <InputText type='text' value="남"></InputText>
                    <InputTitle>휴대번호</InputTitle>
                    <InputText type='text' value="010-4444-4444"></InputText>
                    <InputTitle>이메일</InputTitle>
                    <InputText type='text' value="sejon1234@naver.com" ></InputText>
                    <MangerLoginDiv>
                        내 정보 수정 {'>'}
                    </MangerLoginDiv>
                </Box>
                <Box>
                    <StyledButtonArea>
                        <StyledMenuText>
                            내 정보 수정
                        </StyledMenuText>
                    </StyledButtonArea>
                </Box>
            </div >
        );
    }
}


var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    padding-left : 10px;
    margin-bottom:15px;
    margin-top:15px;
`;


var StyledButtonArea = styled.div`
    width:99%;
    max-width:500px;
    margin: 0 auto;
    padding-top:10px;
    padding-bottom:10px;
    margin-top:10px;
    background-color:red;
    color:white;
    border-radius:6px;
`

let MangerLoginDiv = styled.div`
   max-width: 400px;
   margin: 0 auto;
   text-align:right;
   margin-top:10px;
   font-size:14px;
`

let StyledMyInfo = styled.div`
    margin:0 auto;
    width:400px;
    height:200px;
    display: table-cell;
    text-align:center;
    vertical-align:middle;
`;

let InputTitle = styled.div`
    text-align:left;
    margin: 0 auto;
    width:225px;
`

export default MyPage;