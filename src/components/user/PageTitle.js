import React from 'react';
import { Children } from 'react';
import styled from "styled-components";

let StyledTitle = styled.div`
    font-size:15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

function PageTitle(props) {
    return <StyledTitle>{props.children}</StyledTitle>;
}

export default PageTitle;

