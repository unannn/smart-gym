import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ManagerBar from './component/menubar.js';
import Footer from './component/footer';
import UserListpage from "./UserManage/uAlp";

let SearchBox = styled.input`
 position: relative;
 background-color: gray;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#FFFFFF;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:400px;
    height:38px;
    top: -130px;
    left: 4px;
   `;

let EquiList = styled.div`
 position: relative;
top: -140px;
left: 10px;
   width: 900px;
   height: 440px;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
 position: relative;
top: -125px;
left: 28px;
   width: 900px;
   height: 50px;
   text-align: center;
   border-radius: 5px;
   padding: 16px;
   margin:0 auto;
   margin-bottom:10px;
   font-size: 20px;
   `;
let BodyBox = styled.div`
   position: relative;
   width: 1200px;
   top: 60px;
   `;
let FilterBox = styled.div`
   position: relative;
   width: 100px;
   height: 70px;
   top: -70px;
   left: -280px;
   `;
let RowLineBox = styled.div`
    position: absolute;
    top: 45px;
    left: 170px;
    width: 740px;
    height: 1.5px;
    background: black;
   `;
let Cell = styled.li`
   position: relative;
   top:0px;
   float: left;
   height: 100%;
   font-size: 13pt;
   line-height: 50px;
   text-align: left;
   list-style-type: none;
   `;
class UserA extends React.Component {
    constructor(props) {
        super(props);
        this.filterSearch = this.filterSearch.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
        };
    }
    loadItem = async () => {
        // Json Data 불러오기
        axios.get('http://localhost:8080/unAllowedUser/readAll') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: data.data,
                    flog: "전체" // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                });
            })
            .catch(e => {
                // json이 로드되지않은 시간엔
                console.error(e); // 에러표시
                this.setState({
                    loading: false // 이때는 load 가 false 유지
                });
                alert("error! 가입대기자 목록 조회에 실패했습니다.");
            });
    };
    filterSearch = function () {
        console.log("rePrint");
        console.log($("#FilterID").val());
        console.log($("#searchValue").val());
        if ($("#FilterID").val() == 0)//All
        {
            this.loadItem();
        }
        else if ($("#searchValue").val() == "") {
            alert("검색어가 비어져 있습니다. \n검색어를 입력해주세요.");
        }
        else {
            if ($("#FilterID").val() == 1)//Id
            {
                axios.post('http://localhost:8080/unAllowedUser/readByID',
                    {
                        userID: $("#searchValue").val()
                    },
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                    .then((response) => {
                        console.log(response.data)
                        this.setState((prev) => ({
                            loading: true, // load되었으니 true,
                            ItemList: response.data,
                        }));
                    })
                    .catch((response) => {
                        console.log('Error!');
                        console.log(response);
                        alert("error! 해당 ID에 대해 검색에 실패했습니다.");
                    });
            }
            else {
                axios.post('http://localhost:8080/unAllowedUser/readByName',
                    {
                        userName: $("#searchValue").val()
                    },
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Accept': 'application/json'
                        }
                    }
                )
                    .then((response) => {
                        console.log(response.data)
                        this.setState((prev) => ({
                            loading: true, // load되었으니 true,
                            ItemList: response.data,
                        }));
                    })
                    .catch((response) => {
                        console.log('Error!');
                        console.log(response);

                        alert("error! 해당 이름에 대해 검색에 실패했습니다.");
                    });
            }
        }
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <div style={{ position: "absolute", top: "-60px", float: "left", fontSize: "17px" }}>
                            <img src="./icon/icon_info.png" width="18px" style={{ position: "relative", top: "-12px", float: "left" }} />
                            <label style={{ position: "relative", top: "-16px", float: "left", fontSize: "17px" }}>&nbsp;헬스장 회원가입 승인</label><br /><br />
                        </div>
                        <div style={{ position: "relative", top: "40px", left: "30px" }}>
                            <FilterBox>
                                <Box sx={{ minWidth: 10 }}>
                                    <FormControl style={{ width: "80px" }}>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" color="secondary">
                                            Filter
                                        </InputLabel>
                                        <NativeSelect
                                            defaultValue={0}
                                            inputProps={{
                                                name: 'FilterID',
                                                id: 'FilterID',
                                            }}
                                            color="secondary"
                                        >
                                            <option value={0}>ALL</option>
                                            <option value={1}>ID</option>
                                            <option value={2}>Name</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </FilterBox>
                            <SearchBox id="searchValue" name="searchValue" />
                            <Button color="white" variant="" style={{ position: "relative", top: "-133px", left: "20px" }} onClick={this.filterSearch}><img src="./icon/icon_search.png" width="35px" /></Button>
                            <center>
                                <ListKey>
                                    <div >
                                        <Cell style={{ float: "left", position: "relative", top: "-10px", width: '300px' }}>ID</Cell>
                                        <Cell style={{ float: "left", position: "relative", top: "-10px", width: '280px' }}>Name</Cell>
                                        <Cell style={{ position: "relative", top: "-10px" }}>Approval</Cell>
                                    </div>
                                </ListKey>
                                <EquiList>
                                    <UserListpage Itemcard={ItemList} />
                                </EquiList>
                                <RowLineBox />
                            </center>
                        </div>
                    </BodyBox>
                    <div>
                        <Footer />
                    </div>
                </center>
            </div >
        )
    }
}

export default UserA;