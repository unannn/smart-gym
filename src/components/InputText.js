import React from 'react';
import styled from "styled-components";

let StyledInputText = styled.input`
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

function InputText(props) {
    return <StyledInputText type={props.type} value={props.value}></StyledInputText>;
}

export default InputText;

