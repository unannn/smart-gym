import React from 'react';
import axios from "axios";
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import ManagerBar from './component/menubar.js';
import UserListpage from "./component/ulp";
let InfoBox = styled.div`
&:hover {                
    background: skyblue;
  }
   position: relative;
   display: block;
   float: left;
   width: 650px;
   height: 40px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   `;

let MoreInfo = styled.div`
   position: relative;
   margin: 0.5px;
   right: -800px;
   top: 30px;
   width: 30%;
   height: 450px;
   font-size: 10pt;
   text-align: center;
   background: black;
   `;
let SearchBox = styled.input`
   inline: block;
   width: 400px;
   `;

let ListBox = styled.div`
   position: relative;
   left: 50px;
   top: -420px;
   width: 670px;
   height: 1000px;
   overflow:auto;
   `;
let EquiList = styled.div`
 position: relative;
 left: -250px;
   width: 670px;
   height: 500px;
   text-align: center;
   background: pink;
   overflow:auto;
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
                <ManagerBar></ManagerBar>
                <br />
                <SearchBox />
                <Button variant="light">검색</Button>
                <br />
                <MoreInfo />
                <ListBox>
                    <UserListpage />
                </ListBox>
                <div>
                    <center>
                        <EquiList>
                            <UserListpage Itemcard={ItemList} />
                        </EquiList>
                    </center>
                </div>
            </div >
        )
    }
}

export default UserM;