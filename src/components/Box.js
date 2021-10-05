import React from 'react';
import styled from "styled-components";

let StyledBox = styled.div`
    background-color:#F2F2F2;
    border-radius: 10px;
    
    padding:20px;
    max-width: 400px;
    text-align:center;
    margin:0 auto;
    
`;

function Box(props) {
    return <StyledBox>{props.children}</StyledBox>;
}

export default Box;

