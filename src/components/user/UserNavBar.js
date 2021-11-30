import React, { Children, Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

class UserNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: [true, false, false, false, false],
            selectedIndex: 0,
            navBar: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    onClickDecoration(e, index) {

        let selected = this.state.selected;
        selected[this.state.selectedIndex] = false;
        selected[index] = true;

        this.setState({
            selected: selected,
            selectedIndex: index
        })
    }

    pathSelected(pathname) {
        let pn = pathname.split(' ');
        console.log(pn)
        for (let index = 0; index < pn.length; index++) {
            if (pn[index] === window.location.pathname) return true;
        }

        return false;
    }

    render() {
        let userNavList = [{ pathname: '/user', value: 'Home' }, { pathname: '/user/reservation/date /user/reservation/equip', value: '기구 예약' },
        { pathname: '/user/equipguide', value: '기구 안내' }, { pathname: '/user/mypage', value: '내 정보' }, { pathname: '/user/centerinfo', value: '센터 정보' }];
        console.log(window.location.pathname)
        let navBar = userNavList.map((element, index) => {
            return <StyledLink to={element.pathname.split(' ')[0]} key={element.value}>
                <SpanStyle width={window.innerWidth / 5} selected={this.pathSelected(element.pathname)}
                    onClick={(e) => this.onClickDecoration(e, parseInt(index))}>
                    {element.value}
                </SpanStyle>
            </StyledLink>
        })

        return (
            <NavBarFrame>
                <NavBarStyle>
                    {navBar}
                </NavBarStyle>
            </NavBarFrame>

        );
    }
}

const StyledLink = styled(Link)`
    text-decoration:none;
    color:black;
`;

const SpanStyle = styled.div`
    background-color: white;

    display:inline-block;
    vertical-align:middle;
    color:black;
    text-align:center;
    padding-top:10px;
    font-size:15px;
    height:45px;
    //width:${props => parseInt(props.width) + "px"};
    width:20%;
    max-width:200px;
    border-bottom:${props => props.selected ? '2px black solid' : 'none'};
    :active{
        background-color:#CEEEFE
    }
`;

const NavBarStyle = styled.div`
    z-index:1;

    position:fixed;
    width: 100%;
    background-color: white;
    /* margin-bottom:10px; */

    /* margin-top:10px; */
    /* height:60px; */
`;
const NavBarFrame = styled.div`
padding-bottom:60px;
width:60px;
background-color: white;

`;

export default UserNavBar;