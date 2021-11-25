import React, { Component } from 'react';
import styled from "styled-components";
import axios from "axios";
import EquipDetail from './EquipDetail';

class EquipList extends Component {

    constructor(props) {
        super(props);

        this.category = [{ id: 'chest', name: '가슴' }, { id: 'back', name: '등' }, { id: 'neck', name: '목' }, { id: 'stomach', name: '복근' },
        { id: 'triceps', name: '삼두' }, { id: 'trapezius', name: '승모근' }, { id: 'shoulder', name: '어깨' }, { id: 'aerobic', name: '유산소' },
        { id: 'biceps', name: '이두' }, { id: 'lower_body', name: '하체' }, { id: 'waist', name: '허리' }, { id: 'etc', name: '기타' }]

        this.state = {
            equips: null,
            selectedCategory: null,
            equipmentList: [],
            SelectedEquipment: []
            // iSeletedEquipment: Array.from({ length: equipList[0].equips.length }, () => false)
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
                const initIndex = 0;
                this.setState({
                    equips: equips,
                    selectedCategory: this.category[initIndex].name,
                    equipmentList: equips[this.category[initIndex].id],
                    SelectedEquipment: Array.from({ length: equips[this.category[initIndex].id].length }, () => false)
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
        const selectedEquipList = this.state.equipmentList.map((equip, index) =>
            <div>
                <EquipmentLI id={equip.equipmentID} key={equip.equipmentID + equip.equipmentNameNth} onClick={() => {
                    let SelectedEquipment = this.state.SelectedEquipment;
                    SelectedEquipment[index] = !SelectedEquipment[index]
                    this.setState({ SelectedEquipment: SelectedEquipment })
                }}>
                    {equip.equipmentName + ' ' + equip.equipmentNameNth}
                </EquipmentLI>
                {this.state.SelectedEquipment[index] ? <EquipDetail imageWidth={'100%'}
                    imageURL={equip.equipmentImage} equipmentVideoLink={equip.equipmentQRCode}>

                </EquipDetail> : ''}
            </div>)


        return selectedEquipList;
    }

    getCategoryList() {
        // 나중에 아이디 적용할 것
        const selectedEquipList = this.category.map((equip, index) => <CategoryLI id={equip.id} key={equip.id} onClick={this.clickCategory}>
            {equip.name}
        </CategoryLI>);

        return selectedEquipList;
    }

    clickCategory = (e) => {

        var i;
        for (i in this.category) {
            if (this.category[i].id === e.target.id) break;
        }
        console.log(this.state.equips)

        this.setState({
            selectedCategory: this.category[i].name,
            equipmentList: this.state.equips[this.category[i].id],
            SelectedEquipment: Array.from({ length: this.state.equips[this.category[i].id].length }, () => false)
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
    position: relative;

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
    position: relative;
    font-size:14px;
    padding:20px 10px 20px 10px;
    background-color:white;
`;

