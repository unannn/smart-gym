import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { display } from '@mui/system';
import { Label } from '@material-ui/icons';
import ReactPlayer from 'react-player';
let BodyBox = styled.div`
   width: 900px;
   `;
let ESLOutBox = styled.div`
   position: absolute;
   top:0px;
   top: 30px;
   left: 400px;
   float: left;
   width: 850px;
   height: 400px;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   border: 3px solid black;
   border-radius: 10px;
   padding: 16px;
   margin:0 auto;
   margin-bottom:10px;
   background: #EDEDED;
`;
let BInnerBox = styled.div`
   position: absolute;
   top:0px;
   top: 80px;
   left: 410px;
   float: left;
   width: 60px;
   height: 300px;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   border: 3px solid black;
   border-radius: 10px;
   padding: 16px;
   margin:0 auto;
   margin-bottom:10px;
   background: white;
`;
let ESLInnerBox = styled.div`
   position: absolute;
   top:0px;
   top: 55px;
   left: 475px;
   float: left;
   width: 750px;
   height: 350px;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   border: 3px solid black;
   border-radius: 10px;
   padding: 16px;
   margin:0 auto;
   margin-bottom:10px;
   background: white;
`;

let Cell = styled.input`
   position: relative;
   top:0px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
   border: 0px;
   font-weight: bold;
   background: white
   `;
//background: 'pink',
let RowLineBox = styled.div`
    position: absolute;
    top: 260px;
    left: 480px;
    width: 740px;
    height: 2.5px;
    background: black;
   `;
let QRdiv = styled.div`
&:hover {
     transform: scale(1.05);
  transition: transform 1s;
  filter: brightness(93%);
  }
   position: absolute;
   top: 215px;
   width: 170px;
   height: 170px;
   overflow: hidden;
   `;
let UnderBox = styled.div`
   position: absolute;
   top: 300px;
   left: 160px;
   width: 600px;
   height: 170px;
   `;
class ESLInfo extends React.Component {
    // 제일 common한 state값 초기 셋팅
    constructor(props) {
        super(props);
        this.qrCheck = this.qrCheck.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "",
            urlLink: "",
            Hvalue: "90px"
        };
    }


    qrCheck = function (e) {
        console.log("qrCheck" + $("#QrValue").val());
        this.props.parentFunction($("#QrValue").val());
        this.setState({
            urlLink: $("#QrValue").val(),
            Hvalue: "400px"
        });
    }
    render() {
        const { urlLink } = this.state;
        const { Hvalue } = this.state;
        return (
            <BodyBox>
                <Cell id="ESLNo" style={{ position: "relative", left: "-30px", width: '150px', textAlign: 'left' }} disabled />
                <ESLOutBox />
                <BInnerBox>
                    <img src="./image/barcode.png" width="40px" height="250px" style={{ position: 'relative', top: "5px", left: '-10px' }} />
                </BInnerBox>
                <ESLInnerBox>
                    <div>
                        <Cell id="GymNameInfo" style={{ textAlign: 'right', float: "right", position: 'relative', fontSize: '20px', top: '-10px', left: '0px', width: '230px' }} disabled />
                        <Cell id="userName" style={{ textAlign: 'center', position: 'relative', fontSize: '30px', top: '50px', left: '35%', width: '250px' }} disabled />
                        <Cell id="Times" style={{ textAlign: 'center', position: 'relative', fontSize: '50px', top: '50px', left: '20%', width: '450px' }} disabled />
                    </div>
                    <div>
                        <QRdiv>
                            <img id="QRESL" src="./icon/icon_qr.png" style={{ width: '120px', height: '120px', cursor: "pointer" }} onClick={this.qrCheck} />
                            <input type="hidden" id="QrValue" />
                        </QRdiv>
                        <UnderBox>
                            <label style={{ float: 'left', fontSize: '20px', width: '250px' }}>QR코드 스캔</label>
                            <Cell id="equipESL" style={{ position: 'relative', top: '-10px', left: '5%', textAlign: 'right', border: '0px', fontSize: '30px', width: '300px', height: '50px' }} disabled />
                        </UnderBox>
                    </div>
                </ESLInnerBox>
                <RowLineBox />
            </BodyBox >
        )
    }
}
export default ESLInfo;