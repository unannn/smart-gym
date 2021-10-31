import React from 'react';
import styled from "styled-components";

let StyledBox = styled.div`
    background-color:#F2F2F2;
    border-radius: 10px;
    padding:20px;
    min-width:350px;
    max-width: 500px;
    width:98%;
    text-align:center;
    margin:0 auto;
    margin-bottom:10px;
    
`;

function Box(props) {
    return <StyledBox>{props.children}</StyledBox>;
}

export default Box;

