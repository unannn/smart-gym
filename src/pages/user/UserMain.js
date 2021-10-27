import React from 'react';
import styled from "styled-components";
import PageTitle from '../../components/PageTitle';
import Logout from '../../components/Logout';
import TopBar from '../../components/TopBar';

class UserMain extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <div>
                        <TopBar>메인 페이지</TopBar>
                        <br />
                        <StyledTodayRezBoard>
                            <StyledName>이윤환 님,</StyledName>
                            <StyledDate>2021년 10월 14일 현재</StyledDate>
                            사용중인 운동기구는
                            <StyledRecentUsing> 없습니다.</StyledRecentUsing>
                            <StyledRezEquipList>
                                <StyledLeftButton>{'<'}</StyledLeftButton>

                                <StyledEquipUL>
                                    <StyledEquipLI>
                                        <StyledEquipElement>
                                            벤치
                                        </StyledEquipElement>
                                    </StyledEquipLI>
                                    <StyledEquipLI>
                                        <StyledEquipElement>
                                            멀티렉
                                        </StyledEquipElement>
                                    </StyledEquipLI>
                                    <StyledEquipLI>
                                        <StyledEquipElement>
                                            인클라인
                                        </StyledEquipElement>
                                    </StyledEquipLI>
                                    <StyledEquipLI>
                                        <StyledEquipElement>
                                            없음
                                        </StyledEquipElement>
                                    </StyledEquipLI>
                                </StyledEquipUL>
                                <StyledRightButton>{'>'}</StyledRightButton>
                            </StyledRezEquipList>
                        </StyledTodayRezBoard>
                        <br />
                        <StyledMenuList>
                            <li>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        기구 예약
                                    </StyledMenuText>
                                </StyledButtonArea>



                            </li>
                            <li>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        기구 안내
                                    </StyledMenuText>
                                </StyledButtonArea>

                            </li>
                            <li>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        내 정보
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </li>
                            <li>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        센터 정보
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </li>
                        </StyledMenuList>

                    </div>
                </h1 >
            </div >
        )
    }
}

var StyledEquipElement = styled.div`
font-size:18px;
padding:10px;
`;
var StyledEquipLI = styled.li`
float:left;
`;
var StyledEquipUL = styled.ul`
    list-style:none;
`;
var StyledLeftButton = styled.button`
    float:left;
`;
var StyledRightButton = styled.button`
 float:right;
`;
var StyledName = styled.div`
font-size:20px;
margin-bottom:15px;
`;
var StyledDate = styled.div`
font-size:20px;
margin-bottom:15px;
`;
var StyledRecentUsing = styled.div`
font-size:30px;
margin-bottom:15px;
`;
var StyledTodayRezBoard = styled.div`
    text-align:left;
    padding-left:10px;
    font-size:20px;

`;

var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    margin-bottom:13px;
    padding-left : 10px;
    margin-bottom:15px;
`;


var StyledRezEquipList = styled.div`
`;

var StyledButtonArea = styled.div`
    width:99%;
    max-width:500px;
    margin: 0 auto;
    padding-top:10px;
    padding-bottom:10px;
    margin-top:10px;
    background-color:#F2F2F2;
    border-radius:6px;
`


var StyledMenuList = styled.ul`
    list-style:none;
    padding-left:0px;
    text-align: left;
`


export default UserMain;