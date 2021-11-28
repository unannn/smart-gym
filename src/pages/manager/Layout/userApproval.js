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
import UserApprovalItem from "./UserManage/uAItem";

let SearchBox = styled.input`
 position: relative;
 background-color: #F8F8F8;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color: black;
    resize:none;
    border-radius: 5px;
    margin-bottom: 10px;
    border-width: 0px;
    width:400px;
    height:38px;
    top: -130px;
    left: 4px;
    border: 3px solid gray;
   `;

let EquiList = styled.div`
 position: relative;
top: -180px;
left: -50px;
   width: 770px;
   height: 700px;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
 position: relative;
top: -170px;
left: 35px;
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
    left: 185px;
    width: 720px;
    height: 1.5px;
    background: black;
   `;
let SearchClick = styled.div`
    &:hover {
     transform: scale(1.05);
  transition: transform 1s;
  filter: brightness(93%);
  }
  background: #FDFDFD;
   border-radius: 10px;
   padding: 1px;
   margin:0 auto;
   margin-bottom:10px;
   cursor: pointer;
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
        this.searchText = this.searchText.bind(this);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
        };
    }
    loadItem = async () => {
        $("#searchValue").val("검색하시려면 Filter를 바꿔주세요.");
        $("#searchValue").attr("disabled", true);
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
    searchText = function () {
        console.log("필터변경");
        if ($("#FilterID").val() == 0)//All
        {
            $("#searchValue").val("검색하시려면 Filter를 바꿔주세요.");
            $("#searchValue").attr("disabled", true);
            this.loadItem();
        }
        //ID
        else if ($("#FilterID").val() == 1) {
            $("#searchValue").val("");
            $("#searchValue").attr("disabled", false);
        }
        //Name
        else if ($("#FilterID").val() == 2) {
            $("#searchValue").val("");
            $("#searchValue").attr("disabled", false);
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
                                            onChange={this.searchText}
                                        >
                                            <option value={0}>ALL</option>
                                            <option value={1}>ID</option>
                                            <option value={2}>Name</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                            </FilterBox>
                            <SearchBox id="searchValue" name="searchValue" />
                            <SearchClick style={{ position: "relative", top: "-180px", left: "240px", width: "40px", heigth: "40px" }} onClick={this.filterSearch}>
                                <img src="./icon/icon_search.png" width="35px" />
                            </SearchClick>
                            <center>
                                <ListKey>
                                    <div >
                                        <Cell style={{ float: "left", position: "relative", top: "-10px", width: '295px' }}>ID</Cell>
                                        <Cell style={{ float: "left", position: "relative", top: "-10px", width: '280px' }}>Name</Cell>
                                        <Cell style={{ position: "relative", top: "-10px" }}>Approval</Cell>
                                    </div>
                                </ListKey>
                                <EquiList>
                                    <ul className="list__itemview">
                                        {ItemList &&
                                            ItemList.map((itemdata, insertIndex) => {
                                                return (
                                                    <UserApprovalItem
                                                        key={insertIndex}
                                                        UserApprovalId={itemdata.userID}
                                                        UserApprovalName={itemdata.userName}
                                                        reloadF={this.loadItem}
                                                    />
                                                );
                                            })}
                                    </ul>
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