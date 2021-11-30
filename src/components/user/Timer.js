import moment from 'moment';
import React, { Component } from 'react';
import styled from "styled-components";

class Timer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            endTime: this.props.endTime,
            remainingTime: '',
            remainedTime: ''
        }
    }

    componentDidMount() {
        let currentTime = moment().format("HH:mm");

        let currentTimeHour = parseInt(currentTime.substring(0, 2));
        let currentTimeMinute = parseInt(currentTime.substring(3, 5));


        let rt = moment(moment().format('YYYY-MM-DD ' + this.props.endTime + ":00")) - moment(moment().format('YYYY-MM-DD ' + currentTimeHour + ":" + currentTimeMinute + ":ss"));
        console.log(moment(rt).format("mm:ss"))


        this.setState({ remainingTime: moment(rt).format("mm:ss") });

        this.interval = setInterval(this.timer, 1000)


    }

    timer = () => {
        let currentTime = moment().format("HH:mm");

        let currentTimeHour = parseInt(currentTime.substring(0, 2));
        let currentTimeMinute = parseInt(currentTime.substring(3, 5));
        let rt = moment(moment().format('YYYY-MM-DD ' + this.props.endTime + ":00")) - moment(moment().format('YYYY-MM-DD ' + currentTimeHour + ":" + currentTimeMinute + ":ss"));

        this.setState({ remainingTime: moment(rt).format("mm:ss") });

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <RemainingTime>
                {this.state.remainingTime}
            </RemainingTime>
        );
    }
}

const RemainingTime = styled.div`
    font-size:24px;
    font-weight:610;
    margin-bottom:20px;
`;

export default Timer;