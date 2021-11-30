import React, { Component } from 'react';
import TopBar from '../../components/user/TopBar';
import EquipList from '../../components/user/EquipList';
import styled from "styled-components";
import EquipListGuide from "../../components/user/EquipListGuide"
import Modal from "../../components/user/Modal"
import axios from 'axios';

class EquiptionGuide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalOn: false,
            equipLocationImage: null
        }
    }

    componentWillUnmount() {


    }

    clickEquipLocButton(e) {
        axios.get('http://localhost:8080/gymInfo/equipmentLayout/read',
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const url = response.data;
                console.log(url);
                this.setState({ equipLocationImage: url }, () => this.setState({ modalOn: true }));
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    closeModal(e) {
        this.setState({ modalOn: false });
    }

    render() {
        return (
            <EquiptionGuideStyle>
                <EquiptionPositionTextList onClick={this.clickEquipLocButton.bind(this)}>기구 배치도{'>'}</EquiptionPositionTextList>
                <EquipListGuide></EquipListGuide>
                {this.state.modalOn && <Modal onClick={this.closeModal.bind(this)}>
                    기구 배치도
                    <img src={this.state.equipLocationImage} alt="" width={'100%'} />
                </Modal>}
            </EquiptionGuideStyle>
        );
    }
}

const EquiptionGuideStyle = styled.div`
    max-width:768px;
    margin: 0 auto;
`;

const EquiptionPositionTextList = styled.div`
    text-align:left;
    margin-left:8px;
`;

export default EquiptionGuide;