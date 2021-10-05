import React from 'react';
import { Children } from 'react';
import styled from "styled-components";

let StyledTextButton = styled.div`
    float:left;
`;

function TextButton(props) {
    return <StyledTextButton>{props.children}</StyledTextButton>;
}

export default TextButton;

