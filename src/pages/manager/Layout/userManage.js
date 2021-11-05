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
import UserListpage from "./UserManage/ulp";
import DetailU from "./UserManage/detailedUser";

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
    top: -35px;
   `;

let EquiList = styled.div`
 position: relative;
 left: -250px;
 top: -20px;
   width: 600px;
   height: 440px;
   text-align: center;
   background-color:#F2F2F2;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
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
   top: -25px;
   left: -300px;
   `;
class UserM extends React.Component {
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
        axios.get('http://localhost:8080/allowedUser/readAll')
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
                axios.post('http://localhost:8080/allowedUser/readByID',
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
                        console.log(response.data.data)
                        this.setState((prev) => ({
                            loading: true, // load되었으니 true,
                            ItemList: response.data.data,
                        }));
                    })
                    .catch((response) => {
                        console.log('Error!');
                        console.log(response);
                        alert("error! 해당 ID에 대해 검색에 실패했습니다.");
                    });
            }
            else {
                axios.post('http://localhost:8080/allowedUser/readByName',
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
                        console.log(response.data.data)
                        this.setState((prev) => ({
                            loading: true, // load되었으니 true,
                            ItemList: response.data.data,
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
                        <div>
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
                            <SearchBox id="searchValue" name="searchValue" />&nbsp; &nbsp; &nbsp; &nbsp;
                            <Button variant="btn btn-secondary" style={{ position: "relative", top: "-39px" }} onClick={this.filterSearch}>검색</Button>
                            <center>
                                <EquiList>
                                    <UserListpage Itemcard={ItemList} />
                                </EquiList>
                            </center>
                            <DetailU />
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default UserM;