import React from 'react';
import styled from "styled-components";

let StyledLogOut = styled.div`
    font-size:13px;
    float:right;
    display:flex;
`;

function Logout(props) {
    return <StyledLogOut>Log out</StyledLogOut>;
}

export default Logout;

