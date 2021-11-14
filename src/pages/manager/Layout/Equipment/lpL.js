import React, { Component } from "react";
import EquipmentItemL from "./equipmentItemL";
import axios from "axios";
import $ from "jquery";
import jquery from 'jquery';
class Listpage extends Component {
    id = 1;
    state = {};
    render() {
        const { Itemcard } = this.props;
        const api = this.props.apiNumber;
        console.log(api);
        return (
            <ul className="list__itemview">
                {Itemcard &&
                    Itemcard.map((itemdata, insertIndex) => {
                        return (
                            <EquipmentItemL
                                key={insertIndex}
                                EquipmentId={itemdata.equipmentID}
                                EquipmentName={itemdata.equipmentName}
                                Category={itemdata.equipmentCategoryList}
                                EnthNumber={itemdata.equipmentNameNth}
                                apiNumber={api}
                            />
                        );
                    })}
            </ul>
        );
    }
}
export default Listpage;