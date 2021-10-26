import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Listpage from "./component/lp";
import ManagerBar from './component/menubar.js';
import DetailE from './component/detailedEquipment';
let EquiList = styled.div`
   position: absolute;
   margin: 0.5px;
   left: 80px;
   top: 100px;
   width: 700px;
   height: 500px;
   font-size: 10pt;
   text-align: center;
   background: pink;
   overflow:auto;
   `;
let EquiCheck = styled.div`
   position: absolute;
   margin: 0.5px;
   left: 80px;
   top: 70px;
   width: 500px;
   height: 50px;
   font-size: 8pt;
   text-align: center;
   `;

class EquipmentM extends React.Component {
    // 제일 common한 state값 초기 셋팅
    state = {
        loading: false,
        ItemList: [], // 처음 Itemlist는 있는 상태로 기획 []
    };
    loadItem = async () => {
        // Json Data 불러오기
        axios.get('http://localhost:8080/equipment/readAll') // json을 가져온다음
            .then((data) => {
                // data라는 이름으로 json 파일에 있는 값에 state값을 바꿔준다.
                console.log(data.data)
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: data.data // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                    //여기서 운동부위 관련해서 함수를 하나 설정해서 다시 넣어주기
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

    readTheList = function () {
        console.log("운동부위 재 설정");//axios
    }
    render() {
        const { ItemList } = this.state;
        console.log(ItemList);
        return (
            <div>
                <ManagerBar></ManagerBar>
                <EquiCheck>
                    <label><input type="checkbox" name="equiPart" value="chest" />가슴</label>
                    <label><input type="checkbox" name="equiPart" value="back" />등</label>
                    <label><input type="checkbox" name="equiPart" value="neck" />목</label>
                    <label><input type="checkbox" name="equiPart" value="stomach" />복부</label>
                    <label><input type="checkbox" name="equiPart" value="triceps" />삼두</label>
                    <label><input type="checkbox" name="equiPart" value="trapezius" />승모근</label>
                    <label><input type="checkbox" name="equiPart" value="shoulder" />어께</label>
                    <label><input type="checkbox" name="equiPart" value="aerobic" />유산소</label>
                    <label><input type="checkbox" name="equiPart" value="biceps" />이두</label>
                    <label><input type="checkbox" name="equiPart" value="lower_body" />하체</label>
                    <label><input type="checkbox" name="equiPart" value="waist" />허리</label>
                    <label><input type="checkbox" name="equiPart" value="etc" />기타</label>
                </EquiCheck>
                <div>
                    <EquiList>
                        <Listpage Itemcard={ItemList} />
                    </EquiList>
                    <DetailE></DetailE>
                </div>
            </div >
        )
    }
}
export default EquipmentM;