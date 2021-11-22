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

let Cell = styled.li`
   position: relative;
   top:0px;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
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
            flog: "", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
            gymName: "",
            urlLink: "",
            Hvalue: "90px"
        };
    }

    loadItem = async () => {
        //gyminformation Read
        axios.get('http://localhost:8080/gymInfo/read') // json을 가져온다음
            .then((data) => {
                console.log(data.data)
                this.setState({
                    gymName: data.data.gymInfoName
                });

            })
            .catch(e => {
                console.error(e);
                alert("error! 헬스장 정보 조회에 실패했습니다.");
            });
        /* axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
             .then((data) => {
                 // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                 console.log(data.data)
                 this.setState({
                     loading: true, // load되었으니 true,
                     ItemList: data.data,
                     flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                 });
             })
             .catch(e => {
                 // json이 로드되지않은 시간엔
                 console.error(e); // 에러표시
                 this.setState({
                     loading: false // 이때는 load 가 false 유지
                 });
                 alert("error! 운동기구 목록 조회에 실패했습니다.");
             });*/
    };

    qrCheck = function (e) {
        console.log("qrCheck");
        this.props.parentFunction("https://www.youtube.com/watch?v=KOW1pGlXNdk");
        this.setState({
            urlLink: "https://www.youtube.com/watch?v=KOW1pGlXNdk",
            Hvalue: "400px"
        });
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { urlLink } = this.state;
        const { Hvalue } = this.state;
        //console.log(ItemList);
        return (
            <div>
                <center>
                    <label style={{ position: "relative", left: "-510px" }}>ESL No. 12</label>
                    <ESLOutBox />
                    <BInnerBox>
                        <img src="./image/barcode.png" width="40px" height="250px" style={{ position: 'relative', top: "5px", left: '-10px' }} />
                    </BInnerBox>
                    <ESLInnerBox>
                        <div>
                            <Cell style={{ position: 'relative', fontSize: '20px', top: '-10px', left: '500px', width: '220px' }}>{this.state.gymName}</Cell>
                            <Cell style={{ position: 'relative', fontSize: '30px', top: '-5px', left: '38%', width: '200px' }}>000{ }회원님</Cell>
                            <Cell style={{ position: 'relative', fontSize: '50px', top: '0px', left: '25%', width: '400px' }}>13:00{ }-{ }13:30</Cell>
                        </div>
                        <div>
                            <QRdiv>
                                <img src="./icon/icon_qr.png" style={{ width: '120px', height: '120px', cursor: "pointer" }} onClick={this.qrCheck} />
                            </QRdiv>
                            <UnderBox>
                                <label style={{ float: 'left', fontSize: '20px', width: '250px' }}>운동기구 사용법 확인하기</label>
                                <label style={{ float: 'right', fontSize: '30px', width: '300px' }}>{ } 긴 텍스트 확인용 기구</label>
                            </UnderBox>
                        </div>
                    </ESLInnerBox>
                    <RowLineBox />
                </center>
            </div >
        )
    }
}
export default ESLInfo;