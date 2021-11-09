import React, { Component } from 'react';
import styled from "styled-components";

class EquipList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: equipList[0].category,
            equipmentList: equipList[0].equips
        }
    }
    getEquipList() {
        // 나중에 아이디 적용할 것
        const selectedEquipList = this.state.equipmentList.map((equip) => <EquipmentLI onClick={this.props.openEquipRezModal}>{equip}</EquipmentLI>);

        return selectedEquipList;
    }

    getCategoryList() {
        // 나중에 아이디 적용할 것
        const selectedEquipList = equipList.map((equip) => <CategoryLI id={equip.category} onClick={this.clickCategory}>{equip.category}</CategoryLI>);

        return selectedEquipList;
    }

    clickCategory = (e) => {
        console.log(e.target.id);
        console.log(equipList);
        var i;
        for (i in equipList) {
            if (equipList[i].category === e.target.id) break;
        }

        this.setState({
            selectedCategory: equipList[i].category,
            equipmentList: equipList[i].equips
        })
    }
    render() {
        return (
            <EquipListDIV>
                <CategoryUL>
                    {this.getCategoryList()}
                </CategoryUL>
                <EquipmentUL>
                    {this.getEquipList()}
                </EquipmentUL>
            </EquipListDIV>
        );
    }
}

export default EquipList;

var EquipListDIV = styled.div`
    position: flex;

`;

var CategoryUL = styled.ul`
    padding-left:0px;
    margin-bottom:0px;
    list-style:none;
    overflow:scroll;
    white-space:nowrap;
    color:white;
    background-color:#404040;
    ::-webkit-scrollbar{
        display:none;
    }
`;
var CategoryLI = styled.li`
    text-align:center;
    width:80px;
    border:1px;
    border-color:black;
    display:inline-block;

`;

var EquipmentUL = styled.ul`
    list-style:none;
    overflow:scroll;
    padding-left:0px;
    text-align:left;
    position: relative;
    margin:0;
    padding:0;
    white-space:nowrap;
    background-color:rgba(255,255,255,0);
    ::-webkit-scrollbar{
        display:none;
    }
`;

var EquipmentLI = styled.li`
    font-size:14px;
    padding:20px 10px 20px 10px;
    position: relative;
    background-color:white;
`;

var equipList = [
    {
        category: "가슴",
        equips: ['벤치 1', '벤치 2', '파워 렉', '인클라인 벤치', '체스트 프레스', '펙덱 플라이']
    },
    {
        category: "등",
        equips: ['파워 렉', '풀업 머신', '랫풀 다운 머신', '버티컬 로우']
    },
    {
        category: "하체",
        equips: ['파워 렉', '스쿼트 렉', '레그 익스텐션', '레그 컬', '레그 프레스']
    },
    {
        category: "어깨",
        equips: ['어깨 운동 기구 1', '어깨 운동 기구 2', '어깨 운동 기구 3', '어깨 운동 기구 4']
    },
    {
        category: "삼두",
        equips: ['삼두 운동 기구 1', '삼두 운동 기구 2', '삼두 운동 기구 3', '삼두 운동 기구 4']
    },
    {
        category: '이두',
        equips: ['이두 운동 기구 1', '이두 운동 기구 2', '이두 운동 기구 3', '이두 운동 기구 4']
    }
]

