import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import UserListpage from "./UserManage/uAlp";

let SearchBox = styled.input`
 position: relative;
 background-color: gray;
	background-position:left top;
	padding-top:5px;
	font-family:tahoma;
	font-size:16px;
	color:#000000;
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
top: -20px;
   width: 700px;
   height: 450px;
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
class UserA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ItemList: [],
            flog: "전체", // 스프린트에서는 fakedata값이 있어서 그내용을 넣어두었었다.
        };
    }
    loadItem = async () => {
        // Json Data 불러오기
        axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
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
            });
    };
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
                            <SearchBox />&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button variant="btn btn-secondary" style={{ position: "relative", top: "-39px" }}>검색</Button>
                            <center>
                                <EquiList>
                                    <UserListpage Itemcard={ItemList} />
                                </EquiList>
                            </center>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default UserA;