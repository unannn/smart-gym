import React from 'react';
import ManagerBar from './Layout/component/menubar.js';
import MenuButton from './Layout/component/buttons.js';
import EquipmentM from './Layout/equipment.js';
class ManagerMain extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ManagerBar />
                </nav>
            </div>
        )
    }
}

export default ManagerMain;