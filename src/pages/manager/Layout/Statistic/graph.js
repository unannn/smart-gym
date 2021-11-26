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
        let series2 = this.props.data;    //수치 data
        const categorys = this.props.namev; //이름들
        const chartType = this.props.chartType; //차트 종류
        const lengthValue = series2.length; //data 개수
        let marginValue = [80, 0, 90, 100];
        if (chartType == 'pie') {
            let temp = [];
            for (let i = 0; i < lengthValue; i++) {
                let tt = [];
                tt.push(categorys[i]);
                tt.push(series2[i]);
                temp.push(tt);
            }
            console.log(temp);
            series2 = temp;
            marginValue = [80, 0, 90, 20];
        }

        const options = {
            chart: {
                type: chartType,//차트 타입 지정
                margin: marginValue,//차트 외곽 마진 설정 - 상, 우, 하, 좌
                style: {//차트 전체 스타일 지정
                    color: '#333333',
                    fontFamily: 'notoSans',
                    fontWeight: '400'
                },
                backgroundColor: 'rgba(255, 255, 255, 0)'//글씨 없는거 아닙니다. 색깔 미리보기때문에 안보이는 겁니다...(투명색)
            },
            title: {
                text: 'Gym Statistics'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: categorys,
                labels: {
                    y: 20,
                    style: {
                        color: '#444',
                        fontSize: '14px'
                    },
                },
                lineColor: '#cfcfcf',
            },
            yAxis: [{
                //y axis 왼쪽
                //categories: series2,
                title: {
                    text: 'value'
                },
                labels: {
                    enabled: true,//label 미사용 시 false로 지정.
                    formatter: function () {
                        return this.value;
                    }
                },
                gridLineWidth: 1// y축 차트 뒤에 깔리는 선 미사용 시 0으로 지정.
            }],
            legend: {//범례
                floating: true,//범례를 차트 영역 위로 띄울 시 true 지정.
                align: 'right',//수평 정렬 지정
                symbolRadius: 0,//범례 심볼 radius 지정
                symbolWidth: 10,
                symbolHeight: 10,
                itemDistance: 17,//범례 간 간격 지정.
                itemStyle: {
                    color: '#444',
                    fontSize: '14px',
                    fontWeight: '400',
                },
                x: 10,//가로 위치 지정.
                y: -3,//세로 위치 지정.
            },
            plotOptions: {
                column: {// 컬럼 차트 전체 옵션 지정
                    stacking: 'normal',//stacked bar 필수 설정 옵션(default undefined)
                    dataLabels: {//컬럼 바 각각의 label 옵션 지정.
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                            textOutline: 0,// label 수치의 outline 제거 0으로 지정.
                        }
                    }
                },
                pie: {//도넛(파이)차트 전체 옵션 지정.
                    dataLabels: {
                        enabled: true,
                        distance: -30,
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                            textOutline: 0,// label 수치의 outline 제거 0으로 지정.
                        },
                    },
                    showInLegend: true//범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
                },
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                            textOutline: 0,
                        }
                    },
                },
                line: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: '12px',
                            fontWeight: '500',
                            color: 'black',
                            textOutline: 0,
                        }
                    },
                },
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false,
                        format: "<b>{point.y}</b>",
                    }
                }
            },
            series: [
                {
                    data: series2, name: this.props.chartKinds, color: '#ea8175'
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
//['#0093e0','#116cc1','#15baa4','#157270', '#ea8175','#87cd33','#616bcf']
export default GraphInfo;