import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
//background - color:#F2F2F2;
class GraphInfo extends React.Component {
    render() {
        const series2 = this.props.data;    //App.js에서 데이터를 보내줄 예정
        const categorys = this.props.namev;
        const lengthValue = series2.length;
        console.log("series2: " + series2);
        console.log("categorys: " + categorys);
        let seriesTotal = ({ data: 3, name: "a" }, { data: 4, name: "b" });
        for (let i = 0; i < lengthValue; i++) {
            //seriesTotal.push({ data: series2[i], name: categorys[i] });
        }
        //seriesTotal.push("data": series2);
        const options = {
            chart: {
                type: 'column'		// bar차트. 아무 설정이 없으면 line chart가 된다.
            },
            title: {
                text: 'Smart Gym Statistics'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: categorys
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        format: "<b>{point.y}</b>",
                    }
                }
            },
            series: [
                {
                    data: series2, name: this.props.chartKinds, color: '#A7E694'
                }
            ]
        }
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}

export default GraphInfo;