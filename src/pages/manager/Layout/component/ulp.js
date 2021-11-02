import React, { Component } from "react";
import UserItem from "./userItem";
import axios from "axios";
import $ from "jquery";
import jquery from 'jquery';
class UserListpage extends Component {
    id = 1;
    state = {};
    render() {
        const { Itemcard } = this.props;
        console.log(Itemcard);
        return (
            <ul className="list__itemview">
                {Itemcard &&
                    Itemcard.map((itemdata, insertIndex) => {
                        return (
                            <UserItem
                                key={insertIndex}
                                EquipmentId={itemdata.equipmentID}
                                EquipmentName={itemdata.equipmentName}
                                Category={itemdata.equipmentCategoryList}
                                EnthNumber={itemdata.equipmentNameNth}
                            />
                        );
                    })}
            </ul>
        );
    }
}
export default UserListpage;
