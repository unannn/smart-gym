import React from 'react';
import { Redirect } from 'react-router';
import styled from "styled-components";

let StyledLogOut = styled.div`
    font-size:13px;
    float:right;
    display:flex;
`;

function Logout(props) {


    return <StyledLogOut onClick={(e) => {
        sessionStorage.removeItem('id');
        window.location.reload();
    }}>Log out</StyledLogOut>;
}

export default Logout;

