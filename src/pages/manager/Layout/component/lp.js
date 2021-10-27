import React, { Component } from "react";
import EquipmentItem from "./equipmentItem";
import axios from "axios";
import $ from "jquery";
import jquery from 'jquery';
class Listpage extends Component {
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
                            <EquipmentItem
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
export default Listpage;
