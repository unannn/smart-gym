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

import ReactPlayer from 'react-player';
import { DataGrid } from '@material-ui/data-grid';
//background - color:#F2F2F2;
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
    left: 18px;
   `;

let EquiList = styled.div`
   position: relative;
   left: -250px;
   top: -139px;
   width: 700px;
   height: 440px;
   text-align: center;
   overflow:auto;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ListKey = styled.div`
   position: relative;
   top: -119px;
   left: -250px;
   width: 600px;
   height: 50px;
   text-align: center;
   overflow:auto;
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
    left: 50px;
    width: 600px;
    height: 1.5px;
    background: black;
   `;
let aut = "";
let autText = "";
class DataTable extends React.Component {
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
                for (let i = 0; i < data.data.data.length; i++) {
                    (data.data.data[i]).id = i;
                }
            })
            .catch(e => {
                console.error(e);
                this.setState({
                    loading: false
                });
                alert("error! 사용자 목록 조회에 실패했습니다.");
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
    approvalAuthority = function (e) {
        aut = "";
        autText = "";
        console.log(e);
        //console.log("approvalAuthority");
        if (e.target.id === "O") {
            aut = "X";
            autText = "예약불가";
        }
        else {
            aut = "O";
            autText = "예약가능";
        }
        /*if (window.confirm("ID: " + e.row.userID +
            "\nName: " + e.row.userName + "\n해당 사용자의 예약 권한을 " + autText + " 상태로 변경하시겠습니까?")) {
            axios.post('http://localhost:8080/allowedUser/reservationAuthorityUpdate',
                {
                    userID: e.row.userID,
                    allowedUserReservationAuthority: aut
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
                    alert("예약 권한이 변경되었습니다.");
                    window.location.reload();
                })
                .catch((response) => {
                    console.log('Error!');
                    alert("error! 예약 권한을 변경할 수 없습니다.");
                });
        }
        else {
            alert("예약 권한 변경이 취소되었습니다.");
        }*/
    }

    deleteUser = function (e) {
        console.log(e.row.userID);
        console.log("deleteUser");
        /*
        axios.post('http://localhost:8080/equipment/detailedRead',
            {
                equipmentID: EquipmentId
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
     
            })
            .catch((response) => {
                console.log('Error!')
            });*/
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        const columns = [
            { field: 'userID', headerName: 'userID', width: 240 },
            { field: 'userName', headerName: 'userName', width: 240, },
            {
                field: 'allowedUserReservationAuthority', headerName: 'Authority', width: 150,
            },
        ];
        aut = "";
        //console.log(ItemList.row.UserAuthority);
        /* if (ItemList.row.UserAuthority === "O") {
             aut = "가능";
         }
         else {
             aut = "불가";
         }*/
        return (
            <div>
                <ManagerBar></ManagerBar>
                <center>
                    <BodyBox>
                        <ReactPlayer style={{ background: "black" }} id="urlLink" url="https://www.youtube.com/watch?v=2R5NJHJrjKU" playing controls />
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default DataTable;