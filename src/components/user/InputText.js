import React from 'react';
import styled from "styled-components";

let StyledInputText = styled.input`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : `#FFFFFF`};;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#000000;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:225px;
    height:30px;
`;

function InputText(props) {
    return <StyledInputText type={props.type} value={props.value}
        placeholder={props.placeholder} backgroundColor={props.backgroundColor}>
    </StyledInputText>;
}

export default InputText;

