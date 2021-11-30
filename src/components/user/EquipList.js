import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";

class EquipList extends Component {

    constructor(props) {
        super(props);

        this.category = [{ id: 'chest', name: '가슴' }, { id: 'back', name: '등' }, { id: 'neck', name: '목' }, { id: 'stomach', name: '복근' },
        { id: 'triceps', name: '삼두' }, { id: 'trapezius', name: '승모근' }, { id: 'shoulder', name: '어깨' }, { id: 'aerobic', name: '유산소' },
        { id: 'biceps', name: '이두' }, { id: 'lower_body', name: '하체' }, { id: 'waist', name: '허리' }, { id: 'etc', name: '기타' }]

        this.state = {
            equips: null,
            selectedCategory: null,
            equipmentList: []
        }
    }

    componentDidMount() {
        this.getEquips();
    }

    getEquips() {
        let equips;
        axios.get('http://localhost:8080/reservation/searchEquipmentByCategory',
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                equips = response.data.data;
                console.log(equips)
                const initIndex = 0;
                this.setState({
                    equips: equips,
                    selectedCategory: this.category[initIndex].name,
                    equipmentList: equips[this.category[initIndex].id]
                })
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

        return equips;
    }

    isAvaliableEquipment(method, equipmentID) {
        let equips;
        axios.get('http://localhost:8080/reservation/searchEquipmentByCategory',
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                equips = response.data.data;
                console.log(equips)
                let categoryIndex;
                let equipIndex;

                category: for (categoryIndex = 0; categoryIndex < this.category.length; categoryIndex++) {
                    for (equipIndex = 0; equipIndex < equips[this.category[categoryIndex].id].length; equipIndex++) {
                        if (equips[this.category[categoryIndex].id][equipIndex].equipmentID === equipmentID) {
                            if (equips[this.category[categoryIndex].id][equipIndex].equipmentAvailable === 0) {
                                alert("사용 불가");
                            }
                            else {
                                method();
                            }
                            break category;
                        }
                    }
                }

                this.setState({
                    equips: equips,
                    selectedCategory: this.category[categoryIndex].name,
                    equipmentList: equips[this.category[categoryIndex].id]
                }, () => {

                })
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });

        return equips;
    }

    getEquipList() {
        // 나중에 아이디 적용할 것
        const selectedEquipList = this.state.equipmentList.map((equip) =>
            <EquipmentLI id={equip.equipmentID} key={equip.equipmentID + equip.equipmentNameNth} onClick={(e) => {
                this.isAvaliableEquipment(() => this.props.openEquipRezModal(e), equip.equipmentID);
            }}>
                {equip.equipmentName + ' ' + equip.equipmentNameNth}
            </EquipmentLI>);

        return selectedEquipList;
    }

    getCategoryList() {
        // 나중에 아이디 적용할 것
        const selectedEquipList = this.category.map((equip) => <CategoryLI id={equip.id} key={equip.id} onClick={this.clickCategory}>{equip.name}</CategoryLI>);

        return selectedEquipList;
    }

    clickCategory = (e) => {
        var i;
        for (i in this.category) {
            if (this.category[i].id === e.target.id) break;
        }

        this.setState({
            selectedCategory: this.category[i].name,
            equipmentList: this.state.equips[this.category[i].id]
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
    height : 500px;
    list-style:none;
    overflow:auto;
    padding-left:0px;
    text-align:left;
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
    padding:23px 10px;
    position: relative;
    background-color:white;
`;
