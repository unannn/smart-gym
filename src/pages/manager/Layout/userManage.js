import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
let InfoBox = styled.div`
&:hover {                
    background: skyblue;
  }
   position: relative;
   display: block;
   float: left;
   width: 650px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;

let MoreInfo = styled.div`
   position: relative;
   margin: 0.5px;
   right: -800px;
   top: 30px;
   width: 30%;
   height: 450px;
   font-size: 10pt;
   text-align: center;
   background: black;
   `;
let SearchBox = styled.input`
   inline: block;
   width: 400px;
   `;

let ListBox = styled.div`
   position: relative;
   left: 50px;
   top: -420px;
   width: 670px;
   height: 1000px;
   overflow:auto;
   `;
class UserM extends React.Component {
    render() {
        return (
            <div>
                <ManagerBar></ManagerBar>
                <br />
                <SearchBox />
                <Button variant="light">검색</Button>
                <br />
                <MoreInfo />
                <ListBox>
                    <InfoBox>
                        <label style={{ float: 'left', fontSize: '23px' }}>ID</label>
                        <label style={{ float: 'left', fontSize: '23px' }}>Name</label>
                        <Button style={{ float: 'right' }} variant="light">상세보기</Button>
                        <Button style={{ float: 'right' }} variant="light">예약 ON</Button>
                        <Button style={{ float: 'right' }} variant="light">회원탈퇴</Button>
                    </InfoBox>
                    <InfoBox>
                        <label style={{ float: 'left', fontSize: '23px' }}>ID</label>
                        <label style={{ float: 'left', fontSize: '23px' }}>Name</label>
                        <Button style={{ float: 'right' }} variant="light">상세보기</Button>
                        <Button style={{ float: 'right' }} variant="light">예약 ON</Button>
                        <Button style={{ float: 'right' }} variant="light">회원탈퇴</Button>
                    </InfoBox><br />
                </ListBox>
            </div >
        )
    }
}

export default UserM;