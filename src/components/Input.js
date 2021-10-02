import React from 'react';

import styled from "styled-components";

let StyledInput = styled.input`
    background-color:#FFFFFF;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:18px;
	color:#777777;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
`;

function Input(props) {
    return <StyledInput type={props.type}></StyledInput>;
}

export default Input;

