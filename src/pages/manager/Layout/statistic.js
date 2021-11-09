import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import ManagerBar from './component/menubar.js';
import GraphInfo from './Statistic/graph';
//background - color:#F2F2F2;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 60px;
   `;

let GraphBox = styled.div`
   position: absolute;
   left: -15px;
   top: 100px;
   width: 900px;
   height: 700px
   background: pink;
   `;
let chartName = [];
let chartData = [];
class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.membershipStatistic = this.membershipStatistic.bind(this);
        this.reservationStatistic = this.reservationStatistic.bind(this);
        this.equipmentStatistic = this.equipmentStatistic.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
            data: [],
            namev: [],
            chartKinds: ""
        };
    }
    loadItem = async () => {
        /*axios.get('http://localhost:8080/allowedUser/readAll')
            .then((data) => {
                console.log(data.data.data)
                this.setState({
                    loading: true,
                    ItemList: data.data.data,
                    flog: "전체"
                });
            })
            .catch(e => {
                console.error(e);
                this.setState({
                    loading: false
                });
                alert("error! 사용자 목록 조회에 실패했습니다.");
            });*/
    };
    membershipStatistic = function () {
        console.log("membershipStatistic");
        axios.post('http://localhost:8080/statistics/membership',
            {
                year: ""
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                chartName = [];
                chartData = [];
                for (let i = 0; i < response.data.length; i++) {
                    console.log("chartName: " + response.data[i][0]);
                    chartName.push(response.data[i][0]);
                    chartData.push((response.data[i][1]));
                }
                console.log("chartName: " + chartName);
                console.log("chartData: " + chartData);
                this.setState({
                    data: chartData,
                    namev: chartName,
                    chartKinds: "연도별 회원가입 수"
                });
                console.log("!" + this.state.data);
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }
    reservationStatistic = function () {
        console.log("reservationStatistic");
        axios.post('http://localhost:8080/statistics/reservation',
            {
                year: ""
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                chartName = [];
                chartData = [];
                console.log(response.data.length);
                for (let i = 0; i < response.data.length; i++) {
                    console.log("chartName: " + response.data[i][0]);
                    chartName.push(response.data[i][0]);
                    chartData.push((response.data[i][1]));
                }
                console.log("chartName: " + chartName);
                console.log("chartData: " + chartData);
                this.setState({
                    data: chartData,
                    namev: chartName,
                    chartKinds: "연도별 예약 수"
                });
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }
    equipmentStatistic = function () {
        console.log("equipmentStatistic");
        axios.post('http://localhost:8080/statistics/equipment',
            {
                year: ""
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                chartName = [];
                chartData = [];
                for (let i = 0; i < response.data.length; i++) {
                    console.log("chartName: " + response.data[i][0]);
                    chartName.push(response.data[i][0]);
                    chartData.push((response.data[i][1]));
                }
                console.log("chartName: " + chartName);
                console.log("chartData: " + chartData);
                this.setState({
                    data: chartData,
                    namev: chartName,
                    chartKinds: "연도별 인기 운동기구 TOP 5"
                });
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
            });
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { data } = this.state;
        const { namev } = this.state;
        const { chartKinds } = this.state;
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div>
                            <button onClick={this.membershipStatistic}>연도별, 월별 회원가입 수</button>
                            <button onClick={this.reservationStatistic}>연도별, 월별 예약 수</button>
                            <button onClick={this.equipmentStatistic}>총 연도, 월 합계 인기 운동기구 TOP5</button>
                        </div>
                        <GraphBox>
                            <GraphInfo data={data} namev={namev} chartKinds={chartKinds} />
                        </GraphBox>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default Statistic;