import React, { Component } from 'react';
import TopBar from '../../components/user/TopBar';
import EquipList from '../../components/user/EquipList';

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