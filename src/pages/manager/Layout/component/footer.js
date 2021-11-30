import React from 'react';
import styled from 'styled-components';

class Footer extends React.Component {
    copy = function () {
        if (!document.queryCommandSupported("copy")) {
            return alert("복사하기가 지원되지 않는 브라우저입니다.");
        }
        // 흐름 2.
        const textarea = document.createElement("textarea");
        textarea.value = "rnfmaquf12@naver.com";
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.style.position = "fixed";
        // 흐름 3.
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("대표 문의메일 주소가 복사되었습니다.");
    }
    render() {
        return (
            <div>
                <hr />
                <LabelBox>Copyright @sejong Capstone 2021</LabelBox>&nbsp;
                <LabelBox>Team. Nine</LabelBox><br />
                <LabelBox>FrontEnd: 김혜연/이윤환</LabelBox>&nbsp;
                <LabelBox>BackEnd: 김현솔/문혜린</LabelBox><br />

                <div>
                    <div style={{ position: 'relative', left: '-75px' }}>
                        <img src="./icon/icon_email.png" width="10px" />
                        <LabelBox >&nbsp;General directory E-Mail:&nbsp;</LabelBox>
                    </div>
                    <EmailBox style={{ position: 'relative', top: '-25px', left: '80px' }} onClick={this.copy}>rnfmaquf12@naver.com</EmailBox><br />
                </div>
            </div >
        )
    }
}


let FooterBox = styled.div`
    color: #5C5C5C;
    height: 100px;
    position: absolute;
    bottom: 0px; 
    width: 100%;
`;
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
`
export default Footer