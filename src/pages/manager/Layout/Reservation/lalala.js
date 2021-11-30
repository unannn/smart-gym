import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import jquery from 'jquery';
import RListpage from "./reservationlp";
class La extends Component {
    id = 1;
    state = {};
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ItemList: [],
            RItemList: [],
        };
    }

    //{(e) => this.setState({ RItemList: $("#Asdf").val() })}
    render() {
        const { Itemcard } = this.props;
        console.log(Itemcard);
        return (
            <div>
                <input type="text" id="Asdf" onChange={e => { this.setState({ RItemList: $("#Asdf").val() }) }} />
                <RListpage Itemcard={$("Asdf").val()} />
            </div>
        );
    }
}
export default La;
