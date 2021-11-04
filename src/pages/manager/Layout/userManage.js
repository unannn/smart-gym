import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import UserListpage from "./component/ulp";

let SearchBox = styled.input`
   inline: block;
   width: 400px;
   `;

let EquiList = styled.div`
 position: relative;
 left: -250px;
   width: 520px;
   height: 500px;
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
   top: 15px;
   `;
class UserM extends React.Component {
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
                <center>
                    <ManagerBar></ManagerBar>
                    <BodyBox>
                        <SearchBox />&nbsp;&nbsp;
                        <Button variant="btn btn-secondary">검색</Button>
                        <br />
                        <div>
                            <EquiList>
                                <UserListpage Itemcard={ItemList} />
                            </EquiList>
                        </div>
                    </BodyBox>
                </center>
            </div >
        )
    }
}

export default UserM;