import React from 'react';
import { Redirect } from 'react-router';
import styled from "styled-components";

let StyledLogOut = styled.div`
    display:flex;
    width:100px;
    justify-content:space-between;    
    /* font-size:16px; */
    /* margin-right:10px; */
`;

function Logout(props) {

    return <StyledLogOut onClick={(e) => {
        sessionStorage.removeItem('id');
        window.location.reload();
    }}>Log out {'>'}</StyledLogOut>;
}

export default Logout;

