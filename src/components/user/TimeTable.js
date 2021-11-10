import React, { Component } from 'react';
import styled from 'styled-components';


class TimeTable extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.ctx = null;
        this.state = {
            width: '100%',
            height: '730px'
        }
    }
    componentDidMount() {
        const timeData = [
            { startTime: '10:00', endTime: '10:30' }, { startTime: '11:00', endTime: '11:20' },
            { startTime: '11:20', endTime: '11:40' }, { startTime: '12:00', endTime: '12:20' },
            { startTime: '14:20', endTime: '14:40' }, { startTime: '14:40', endTime: '15:20' },
            { startTime: '17:00', endTime: '17:20' }, { startTime: '17:30', endTime: '17:45' },
            { startTime: '18:00', endTime: '18:20' }, { startTime: '20:00', endTime: '20:25' }
        ]

        const colorTable = ['cornflowerblue', 'mediumblue', 'steelblue', 'darkslateblue', 'darkblue', 'blueviolet', 'mediumvioletred']

        const canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth - 30;
        this.ctx = this.canvasRef.current.getContext("2d");
        this.ctx.fillStyle = 'green';
        //this.ctx.fillRect(10, 10, 250, 100);
        this.ctx.fillStyle = 'black';
        this.ctx.font = '14px 나눔스퀘어';


        var time = [];
        for (let i = 0; i < 24; i += 2) {
            time.push((i / 10 < 1 ? '0' + i : i) + ":00");
        }

        this.ctx.fillStyle = 'black';
        for (let i = 0; i < 12; i++) {
            this.ctx.fillText(time[i], 0, i * 60 + 20);
        }

        this.ctx.fillStyle = '#A0A0A0';
        for (let i = 0; i < 12; i++) {
            this.ctx.fillRect(50, i * 60 + 13, 600, 1);
        }

        this.ctx.fillStyle = 'orange';
        timeData.forEach((value, index) => {
            let start = this.getYCoordinate(value.startTime);
            let end = this.getYCoordinate(value.endTime);

            let y = (start * 60 + 13) / 2;
            let height = (end * 60 + 13) / 2 - y;

            this.ctx.fillStyle = colorTable[index % timeData.length];

            this.ctx.fillRect(50, y, 600, height);

            if (index === 5) {
                this.ctx.fillRect(40, y, 600, height);
                this.ctx.fillStyle = 'orange';

            }

        })

    }

    getYCoordinate(time) {
        time = time.split(':');
        let hour = parseInt(time[0]);
        let minute = parseInt(time[1]);

        return (hour + minute / 60)
    }

    render() {

        return (
            <TimeTableStyle>
                <canvas ref={this.canvasRef} width={this.state.width} height={this.state.height} />
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