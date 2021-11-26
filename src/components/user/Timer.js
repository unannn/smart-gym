import moment from 'moment';
import React, { Component } from 'react';
import styled from "styled-components";

class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endTime: this.props.endTime,
            remainingTime: ''
        }
    }

    componentDidMount() {
        let currentTime = moment().format("HH:mm");

        let currentTimeHour = parseInt(currentTime.substring(0, 2));
        let currentTimeMinute = parseInt(currentTime.substring(3, 5));
        let currentTimeNum = currentTimeHour * 60 + currentTimeMinute;
        console.log(currentTimeNum);

        let endTimeHour = parseInt(this.state.endTime.substring(0, 2));
        let endTimeMinute = parseInt(this.state.endTime.substring(3, 5));
        let EndTimeNum = endTimeHour * 60 + endTimeMinute;
        console.log(EndTimeNum);

        let remainingTime = EndTimeNum - currentTimeNum;

        console.log(remainingTime);

        this.setState({ remainingTime: remainingTime })

    }


    render() {
        return (
            <RemainingTime>
                {this.state.remainingTime}분
            </RemainingTime>
        );
    }
}

const RemainingTime = styled.div`
    font-size:28px;
    font-weight:610;
    margin-bottom:20px;
`;

export default Timer;