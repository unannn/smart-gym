import React from 'react';
import { Children } from 'react';
import styled from "styled-components";
import PageTitle from "./PageTitle";
import Logout from "./Logout";

let StyledTopBar = styled.div`
  text-align: center;
`;

function TopBar(props) {
  return (<StyledTopBar>
    <PageTitle>{props.children}</PageTitle>
    {/* <Logout>Log out</Logout> */}
  </StyledTopBar>);
}

export default TopBar;

