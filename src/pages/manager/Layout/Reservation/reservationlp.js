import React, { Component } from "react";
import ReservationItem from "./reservationItem";
import axios from "axios";
import $ from "jquery";
import jquery from 'jquery';
class RListpage extends Component {
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
                            <ReservationItem
                                key={insertIndex}
                                ReservatopmId={itemdata.reservationID}
                                EquipmentName={itemdata.equipmentName}
                                EquipmentNameNth={itemdata.equipmentNameNth}
                                UserID={itemdata.userID}
                                StartTime={itemdata.startTime}
                                EndTime={itemdata.endTime}
                            />
                        );
                    })}
            </ul>
        );
    }
}
export default RListpage;
