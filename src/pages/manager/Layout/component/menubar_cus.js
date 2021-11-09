import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
let MenuBar = styled.li`
&:hover {                
    background: lightGray;
  }  
   position: relative;
   top:0px;
   float: left;
   width: 10%;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
   `;
export default function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <center>
                <br />
                <Link to="/manager" style={{ color: "black" }}>
                    <img src="./image/Logo.png" width="200px" height="50px" /><br />
                </Link>
                <div style={{ position: "relative", top: "0px" }}>
                    <hr width="100%" />
                </div>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', listStyleType: 'none' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Link to="/manager" style={{ color: "black" }}>
                            <Tab>
                                <img src="icon/icon_home_simple.png" width="38%" height="150%" />
                            </Tab>
                        </Link>
                        <Link to="/userApproval" style={{ color: "black" }}>
                            <Tab label="가입승인" />
                        </Link>
                        <Link to="/userManage" style={{ color: "black" }}>
                            <Tab label="회원관리" />
                        </Link>
                        <Link to="/equipmentLayout" style={{ color: "black" }}>
                            <Tab label="배치도 등록" />
                        </Link>
                        <Link to="/equipment" style={{ color: "black" }}>
                            <Tab label="운동기구 관리" />
                        </Link>
                        <Link to="/cEquipment" style={{ color: "black" }}>
                            <Tab label="운동기구 등록" />
                        </Link>
                        <Link to="/operPolicy" style={{ color: "black" }}>
                            <Tab label="운영정책 관리" />
                        </Link>
                        <Link to="/" style={{ color: "black" }}>
                            <Tab label="이력조회" />
                        </Link>
                        <Link to="/statistic" style={{ color: "black" }}>
                            <Tab label="통계 그래프" />
                        </Link>
                        <Link to="/prac" style={{ color: "black" }}>
                            <Tab label="ESL장치 관리" />
                        </Link>
                    </Tabs>
                </Box>
                <div style={{ position: "relative", top: "-18px" }}>
                    <hr width="100%" />
                </div>
            </center >
        </div >
    );
}