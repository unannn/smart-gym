import React from 'react';
import styled from "styled-components";
import TopBar from '../../components/user/TopBar';
import { Link } from 'react-router-dom';
import ReservationEquipList from '../../components/user/ReservationEquipList';
class UserMain extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <TopBar>메인 페이지</TopBar>
                    <br />
                    <StyledTodayRezBoard>
                        <StyledName>이윤환 님,</StyledName>
                        <StyledDate>2021년 10월 14일 현재</StyledDate>
                        사용중인 운동기구는
                        <StyledRecentUsing> 없습니다.</StyledRecentUsing>
                        <ReservationEquipList></ReservationEquipList>
                    </StyledTodayRezBoard>
                    <br />
                    <StyledMenuList>
                        <li>
                            <StyledLink to='/user/reservation/date'>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        운동기구 예약
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink to='/user/equipguide'>

                                <StyledButtonArea>
                                    <StyledMenuText>
                                        운동기구 안내
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink to='/user/mypage'>

                                <StyledButtonArea>
                                    <StyledMenuText>
                                        내 정보
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink to='/user/centerinfo'>
                                <StyledButtonArea>
                                    <StyledMenuText>
                                        센터 정보
                                    </StyledMenuText>
                                </StyledButtonArea>
                            </StyledLink>
                        </li>
                    </StyledMenuList>

                </div>
            </div >
        )
    }
}

const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
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
    margin-top:15px;
    margin-bottom:15px;
`;
var StyledTodayRezBoard = styled.div`
    text-align:left;
    padding-left:10px;
    font-size:20px;
    margin: 0 auto;
    margin-top:20px;
    margin-bottom:20px;

`;

var StyledMenuText = styled.div`
    font-size:15px;
    display: inline-block;
    padding-left : 10px;
    margin-bottom:15px;
    margin-top:15px;
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