import React from 'react';
import styled from "styled-components";

let StyledInputButton = styled.input`
    background-color:#404040;
	padding-top:5px;
	font-family:tahoma;
	font-size:18px;
	color:white;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    width:225px;
    height:40px;
    font-size:16px;
`;

function InputButton(props) {
    return <StyledInputButton onClick={props.onClick} type={props.type} value={props.value} placeholder={props.placeholder}></StyledInputButton>;
}

export default InputButton;

