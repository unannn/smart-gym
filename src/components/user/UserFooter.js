import React, { Component } from 'react';
import styled from 'styled-components';

class UserFooter extends Component {
    render() {
        return (
            <UserFooterStyle>
                <hr />
                <LabelBox>Copyright @sejong Capstone 2021</LabelBox>&nbsp;
                <LabelBox>Team. Nine</LabelBox><br />
                <LabelBox>FrontEnd: 김혜연/이윤환</LabelBox>&nbsp;
                <LabelBox>BackEnd: 김현솔/문혜린</LabelBox><br />

                <div>
                    <div style={{ position: 'relative', left: '-75px' }}>
                        <img src="icon/icon_email.png" width="10px" />
                        <LabelBox >&nbsp;General directory E-Mail:&nbsp;</LabelBox>
                    </div>
                    <EmailBox style={{ position: 'relative', top: '-25px', left: '80px' }} onClick={this.copy}>rnfmaquf12@naver.com</EmailBox><br />
                </div>
            </UserFooterStyle >
        );
    }
}

let LabelBox = styled.label`  
    color: #5C5C5C;
    font-size: 13px;
`;
let EmailBox = styled.div`  
    color: #5C5C5C;
    font-size: 13px;
    cursor: pointer;
    line-height: 2;
    color: blue;
    width: 150px;
`;

let UserFooterStyle = styled.div`
position: absolute;
bottom: 0;
left: 0;
right: 0;
color: white;
background-color: #333333;
`;

export default UserFooter;