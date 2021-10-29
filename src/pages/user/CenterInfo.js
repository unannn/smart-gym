import React, { Component } from 'react';
import TopBar from '../../components/user/TopBar';
import Box from '../../components/user/Box';
import styled from "styled-components";
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'

class CenterInfo extends Component {
    render() {
        return (
            <div>
                <TopBar>센터 정보</TopBar>
                <br />
                <StyledMyInfo>
                    SEJONG GYM
                </StyledMyInfo>
                <br />
                <Box>
                    여러 정보들
                </Box>
                <Box>
                    여러 정보들
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
    font-size:24px;
    width:400px;
    height:100px;
    display: table-cell;
    text-align:center;
    vertical-align:middle;
`;

let InputTitle = styled.div`
    text-align:left;
    margin: 0 auto;
    width:225px;
`

export default CenterInfo;