import { render } from '@testing-library/react';
import React from 'react';
import { Children } from 'react';
import styled from "styled-components";

let StyledTitle = styled.div`
    font-size:15px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;
function getEquipList() {
    let equips = ['벤치', '멀티렉', '인클라인', '없음'];
    // 나중에 아이디 적용할 것
    const equipList = equips.map((equip) => <StyledEquipLI key={equip}>
        <StyledEquipElement>
            {equip}
        </StyledEquipElement>
    </StyledEquipLI>)


    return equipList;
}

function ReservationEquipList(props) {

    return <StyledRezEquipList>
        <StyledLeftButton>{'<'}</StyledLeftButton>
        <StyledEquipUL>
            {getEquipList()}
        </StyledEquipUL>
        <StyledRightButton>{'>'}</StyledRightButton>
    </StyledRezEquipList>
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
    margin-top:7px;
`;
var StyledRightButton = styled.button`
    float:right;
    margin-top:7px;
`;


var StyledRezEquipList = styled.div`
    margin-top:20px;
    margin-bottom:20px;
    height:40px;
`;



export default ReservationEquipList;

