import React, { Component } from "react";
import axios from "axios";
import Listpage from "./component/lp";
import $ from "jquery";
import jquery from 'jquery';
import StaticTimePickerLandscape from './component/timePicker.js';
class Prac extends Component {

    // APP.js 컴포넌트의 최종 보여지는 render값 정의
    render() {
        return (
            <div>
                <StaticTimePickerLandscape />
            </div>
        );
    }
}

export default Prac;