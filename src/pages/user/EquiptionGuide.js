import React, { Component } from 'react';
import TopBar from '../../components/TopBar';
import EquipList from '../../components/EquipList';

class EquiptionGuide extends Component {
    render() {
        return (
            <div>
                <TopBar>운동기구 안내</TopBar>
                <br />
                <EquipList></EquipList>
            </div>
        );
    }
}

export default EquiptionGuide;