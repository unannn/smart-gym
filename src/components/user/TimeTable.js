import React, { Component } from 'react';
import styled from 'styled-components';
import axios from "axios";


class TimeTable extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.ctx = null;
        this.colorTable = ['cornflowerblue', 'mediumblue', 'steelblue', 'darkslateblue', 'darkblue', 'blueviolet', 'mediumvioletred']
        this.state = {
            width: '100%',
            height: '730px',
            timeData: this.props.reservationTimeList,
            timeCoordinate: []
        }
    }
    componentDidMount() {

        axios.post("http://localhost:8080/reservation/readEquipmentReservationOfSeletedDay",
            {
                year: this.props.selectedData.year,
                month: this.props.selectedData.month,
                day: this.props.selectedData.day,
                equipmentID: this.props.selectedData.equipmentID,
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const reservationTimeList = response.data.data;
                this.props.getReservationData(reservationTimeList);

                if (response.data.success) {
                    this.setState({ timeData: reservationTimeList });
                    this.canvas = document.querySelector("canvas");
                    this.canvas.width = window.innerWidth - 30;
                    this.ctx = this.canvasRef.current.getContext("2d");
                    this.ctx.fillStyle = 'black';
                    this.ctx.font = '14px 나눔스퀘어';

                    //테이블 바탕 출력
                    this.drawBaseTimeTable();

                    this.currentSelectedTimeIndex = 0;

                    console.log(this.state.timeData)
                    //초기 그래프 그리기
                    reservationTimeList.forEach((value, index) => {
                        //운동시작시간에 해당하는 좌표와 종료시간의 좌표로 높이 구하기
                        console.log(this.filterTimeFormat(value.startTime));
                        console.log(this.filterTimeFormat(value.endTime));

                        let y = parseInt(this.getYCoordinate(this.filterTimeFormat(value.startTime)));
                        let height = parseInt(this.getYCoordinate(this.filterTimeFormat(value.endTime)) - y);

                        this.state.timeCoordinate.push({ startY: y, endY: y + height });
                        this.ctx.fillStyle = this.colorTable[index % this.colorTable.length];

                        this.ctx.fillRect(50, y, 600, height);

                        // if (index === this.currentSelectedTimeIndex) {
                        //     this.ctx.fillRect(40, y, 600, height);

                    })
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            })

        //캔버스 설정(DOM 접근은 compnentDidMount 에서만 접근할 수 있으므로 여기서 캔버스를 설정해 준다.)
        // this.canvas = document.querySelector("canvas");
        // this.canvas.width = window.innerWidth - 30;
        // this.ctx = this.canvasRef.current.getContext("2d");
        // this.ctx.fillStyle = 'black';
        // this.ctx.font = '14px 나눔스퀘어';

        // //테이블 바탕 출력
        // this.drawBaseTimeTable();

        // this.currentSelectedTimeIndex = 0;

        // console.log(this.state.timeData)
        // //초기 그래프 그리기
        // this.state.timeData.forEach((value, index) => {
        //     //운동시작시간에 해당하는 좌표와 종료시간의 좌표로 높이 구하기
        //     console.log(this.filterTimeFormat(value.startTime));
        //     let y = parseInt(this.getYCoordinate(this.filterTimeFormat(value.startTime)));
        //     let height = parseInt(this.getYCoordinate(this.filterTimeFormat(value.endTime)) - y);

        //     this.state.timeCoordinate.push({ startY: y, endY: y + height });
        //     this.ctx.fillStyle = this.colorTable[index % this.colorTable.length];

        //     this.ctx.fillRect(50, y, 600, height);

        //     // if (index === this.currentSelectedTimeIndex) {
        //     //     this.ctx.fillRect(40, y, 600, height);

        // })
    }

    filterTimeFormat(time) {
        let filterTime = time.split('T')[1].substring(0, 5);
        return filterTime;
    }

    onClickCanvas(e) {
        var rect = this.canvas.getBoundingClientRect();
        var x = parseInt(e.clientX - rect.left);
        var y = parseInt(e.clientY - rect.top);
        console.log(this.getTimeIndex(y));

        const timeIndex = this.getTimeIndex(y);

        if (timeIndex >= 0) this.props.selectTime({ time: this.state.timeData[timeIndex], color: this.colorTable[timeIndex % this.colorTable.length] });

        //바가 클릭 됐을 때
        if (timeIndex >= 0 && x > 50) {
            let height = this.state.timeCoordinate[timeIndex].endY - this.state.timeCoordinate[timeIndex].startY;

            let colorIndex = timeIndex % this.colorTable.length;
            this.ctx.fillStyle = this.colorTable[colorIndex];
            this.ctx.fillRect(40, this.state.timeCoordinate[timeIndex].startY, 600, height);

            if (timeIndex !== this.currentSelectedTimeIndex) {
                let previousTimeHeight = this.state.timeCoordinate[this.currentSelectedTimeIndex].endY - this.state.timeCoordinate[this.currentSelectedTimeIndex].startY;

                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(40, this.state.timeCoordinate[this.currentSelectedTimeIndex].startY, 600, previousTimeHeight);

                this.ctx.fillStyle = this.colorTable[this.currentSelectedTimeIndex % this.colorTable.length];
                this.ctx.fillRect(50, this.state.timeCoordinate[this.currentSelectedTimeIndex].startY, 600, previousTimeHeight);

                this.currentSelectedTimeIndex = timeIndex;
            }

        }
    }


    getYCoordinate(time) {
        time = time.split(':');
        let hour = parseInt(time[0]);
        let minute = parseInt(time[1]);

        return ((hour + minute / 60) * 60) / 2 + 13;
    }

    getTimeIndex(y) {

        let timeIndex = -1;

        this.state.timeCoordinate.forEach((time, index) => {
            if (time.startY <= y && time.endY >= y) {
                timeIndex = index;
                return;
            }
        })

        return timeIndex;
    }

    drawBaseTimeTable() {
        let baseTime = [];

        for (let i = 0; i < 24; i += 2) {
            baseTime.push((i / 10 < 1 ? '0' + i : i) + ":00");
        }

        this.ctx.fillStyle = 'black';
        for (let i = 0; i < 12; i++) {
            this.ctx.fillText(baseTime[i], 0, i * 60 + 20);
        }

        this.ctx.fillStyle = '#A0A0A0';
        for (let i = 0; i < 12; i++) {
            this.ctx.fillRect(50, i * 60 + 13, 600, 1);
        }
    }

    render() {



        return (
            <TimeTableStyle>
                <canvas ref={this.canvasRef} width={this.state.width} height={this.state.height}
                    onClick={this.onClickCanvas.bind(this)} />
            </TimeTableStyle>
        );
    }
}

var TimeTableStyle = styled.div`
    max-height: 400px;
    max-width:400px;
    overflow-x: scroll;
    overflow-y: none;

    white-space:nowrap;
    background-color:rgba(255,255,255,0);
    ::-webkit-scrollbar{
        display:none;
    }
`;

export default TimeTable;