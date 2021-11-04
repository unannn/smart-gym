import React from 'react';
import axios from "axios";
import $ from "jquery";
import jquery from "jquery";
import styled from 'styled-components';
import Listpage from "./lp";
class CategoryR extends React.Component {
    // 제일 common한 state값 초기 셋팅
    state = {
        loading: false,
        ItemList: [], // 처음 Itemlist는 있는 상태로 기획 []
    };
    categoryRead = function () {
        console.log("categoryRead");
        console.log($('input[name="equiPartR"]:checked').val());
        axios.post('http://localhost:8080/equipment/readByCategory',
            {
                equipmentCategorySelect: $('input[name="equiPartR"]:checked').val()
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
                this.setState({
                    loading: true, // load되었으니 true,
                    ItemList: response.data // 비어있던 Itemlist는 data에 Item객체를 찾아넣어준다. ( Item : json파일에 있는 항목)
                    //여기서 운동부위 관련해서 함수를 하나 설정해서 다시 넣어주기
                });
                console.log("done")
                //window.location.reload()
            })
            .catch((response) => {
                console.log('Error!');
            });
    }
    componentDidMount() {
        this.loadItem();
    }
    render() {
        const { ItemList } = this.state;
        //console.log(ItemList);
        return (
            <div>
                <label>가슴<input type="radio" name="equiPartR" value="가슴" onClick={this.categoryRead} /></label>
                <label>등<input type="radio" name="equiPartR" value="등" /></label>
                <label>목<input type="radio" name="equiPartR" value="목" /></label>
                <label>복부<input type="radio" name="equiPartR" value="복부" /></label>
                <label>삼두<input type="radio" name="equiPartR" value="삼두" /></label>
                <label>승모근<input type="radio" name="equiPartR" value="승모근" /></label>
                <label>어깨<input type="radio" name="equiPartR" value="어깨" /></label>
                <label>유산소<input type="radio" name="equiPartR" value="유산소" /></label>
                <label>이두<input type="radio" name="equiPartR" value="이두" /></label>
                <label>하체<input type="radio" name="equiPartR" value="하체" /></label>
                <label>허리<input type="radio" name="equiPartR" value="허리" /></label>
                <label>기타<input type="radio" name="equiPartR" value="기타" /></label>
            </div >
        )
    }
}
export default CategoryR;