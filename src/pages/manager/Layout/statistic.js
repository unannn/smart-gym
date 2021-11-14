import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import { Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
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
   left: 120px;
   top: 20px;
   width: 900px;
   height: 400px;
   `;
let FilterBox = styled.div`
   position: relative;
   width: 100px;
   height: 70px;
   top: -70px;
   left: -280px;
   `;
let StaBox = styled.div`
   position: relative;
   width: 150px;
   height: 45px;
   top: -137px;
   left: -140px;
   `;
let chartName = [];
let chartData = [];
let years = ["All"];
const chartType = ['column', 'pie', 'bar', 'line'];
const staType = ['회원가입 수', '예약 수', '운동기구 TOP 5', '운동부위 별 예약 수']
let textValue = ""
class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.selectedSta = this.selectedSta.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
            data: [],
            namev: [],
            chartKinds: ""
        };
        for (let i = 2018; i < 2071; i++) {
            years.push(i);
        }
    }
    loadItem = async () => {
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
                    chartKinds: "연간 회원가입 수"
                });
                console.log("!" + this.state.data);
            })
            .catch((response) => {
                console.log('Error!');
                console.log(response);
                alert("error! 그래프를 가져오는데 실패했습니다.");
            });
    };
    selectedSta = function () {
        let data = $("#YearsID").val();
        textValue = $("#YearsID").val() + "년 ";
        if ($("#StaID").val() == staType[0]) {
            if ($("#YearsID").val() == "All") {
                data = "";
                textValue = "연간 ";
            }
            axios.post('http://localhost:8080/statistics/membership',
                {
                    year: data
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
                        chartKinds: textValue + "회원가입 수"
                    });
                    console.log("!" + this.state.data);
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    alert("error! 그래프를 가져오는데 실패했습니다.");
                });
        }
        else if ($("#StaID").val() == staType[1]) {
            if ($("#YearsID").val() == "All") {
                data = "";
                textValue = "연간 ";
            }
            axios.post('http://localhost:8080/statistics/reservation',
                {
                    year: data
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
                        chartKinds: textValue + "예약 수"
                    });
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    alert("error! 그래프를 가져오는데 실패했습니다.");
                });
        }
        else if ($("#StaID").val() == staType[2]) {
            if ($("#YearsID").val() == "All") {
                data = "";
                textValue = "연간 ";
            }
            console.log("equipmentStatistic");
            axios.post('http://localhost:8080/statistics/equipment',
                {
                    year: data
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
                        chartKinds: textValue + "운동기구 TOP 5"
                    });
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    alert("error! 그래프를 가져오는데 실패했습니다.");
                });
        }
        else {
            if ($("#YearsID").val() == "All") {
                data = "";
                textValue = "연간 ";
            }
            console.log("equipmentCategoryStatistic");
            axios.post('http://localhost:8080/statistics/equipmentCategory',
                {
                    year: data
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
                        chartKinds: textValue + "운동부위 별 예약 수"
                    });
                })
                .catch((response) => {
                    console.log('Error!');
                    console.log(response);
                    alert("error! 그래프를 가져오는데 실패했습니다.");
                });
        }
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { data } = this.state;
        const { namev } = this.state;
        const { chartKinds } = this.state;
        const rendering = () => {
            const result = [];
            for (let i = 0; i < years.length; i++) {
                result.push(<p value={years[i]}>{years[i]}</p>);
            }
            return result;
        };
        //console.log(years);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-60px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 통계</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "30px" }}>
                            <FilterBox>
                                <Box sx={{ minWidth: 10 }}>
                                    <FormControl style={{ width: "80px" }}>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" color="secondary">
                                            Years
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={0}
                                            inputProps={{
                                                name: 'YearsID',
                                                id: 'YearsID',
                                            }}
                                            color="secondary"
                                            onChange={this.selectedSta}
                                        >
                                            {years.map((year, index) => (
                                                <option key={index} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                <div style={{ position: "relative", top: "-48px", left: "-120px" }}>
                                    <Box sx={{ minWidth: 10 }}>
                                        <FormControl style={{ width: "100px" }}>
                                            <InputLabel variant="standard" htmlFor="uncontrolled-native" color="secondary">
                                                Types
                                            </InputLabel>
                                            <NativeSelect
                                                defaultValue={0}
                                                inputProps={{
                                                    name: 'TypeID',
                                                    id: 'TypeID',
                                                }}
                                                color="secondary"
                                                onChange={this.selectedSta}
                                            >
                                                {chartType.map((type, index) => (
                                                    <option key={index} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </NativeSelect>
                                        </FormControl>
                                    </Box>
                                </div>
                            </FilterBox>
                            <StaBox>
                                <Box sx={{ minWidth: 10 }}>
                                    <FormControl style={{ width: "155px" }}>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" color="secondary">
                                            Statistic
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={0}
                                            inputProps={{
                                                name: 'StaID',
                                                id: 'StaID',
                                            }}
                                            color="secondary"
                                            style={{ fontSize: "14px" }}
                                            onChange={this.selectedSta}
                                        >
                                            {staType.map((sta, index) => (
                                                <option key={index} value={sta}>
                                                    {sta}
                                                </option>
                                            ))}
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </StaBox>
                            <GraphBox>
                                <GraphInfo data={data} namev={namev} chartKinds={chartKinds} chartType={$("#TypeID").val()} />
                            </GraphBox>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default Statistic;