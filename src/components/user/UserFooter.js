import React, { Component } from 'react';
import styled from 'styled-components';

class UserFooter extends Component {
    render() {
        return (
            <FooterWrap>

                <UserFooterStyle isLoginPage={this.props.isLoginPage}>
                    <HrStyle />
                    <LabelBox>Copyright @sejong Capstone 2021</LabelBox>&nbsp;
                    <LabelBox>Team. Nine</LabelBox><br />
                    <LabelBox>FrontEnd: 김혜연/이윤환</LabelBox>&nbsp;
                    <LabelBox>BackEnd: 김현솔/문혜린</LabelBox><br />

                    <div>
                        <div style={{ position: 'relative' }}>
                            <img src="icon/icon_email.png" width="10px" />
                            <LabelBox >&nbsp;General directory E-Mail:&nbsp;</LabelBox>
                            <EmailBox onClick={this.copy}>rnfmaquf12@naver.com</EmailBox><br />

                        </div>
                    </div>
                </UserFooterStyle >
            </FooterWrap>

        );
    }
}

let LabelBox = styled.label`  
    color: #5C5C5C;
    font-size: 13px;
`;
let EmailBox = styled.div`
    display:inline-block;
    color: #5C5C5C;
    font-size: 13px;
    cursor: pointer;
    line-height: 2;
    color: blue;
`;

let UserFooterStyle = styled.div`
    width: 100%;
    height: 2.5rem;
`;

let HrStyle = styled.hr`

`

let FooterWrap = styled.div`
    padding-bottom: 2.5rem;
`;

export default UserFooter;