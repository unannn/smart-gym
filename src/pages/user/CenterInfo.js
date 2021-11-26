import React, { Component } from 'react';
import TopBar from '../../components/user/TopBar';
import Box from '../../components/user/Box';
import styled from "styled-components";
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import axios from 'axios'

class CenterInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gymInfoID: null,
            gymInfoName: null,
            gymInfoAddress: null,
            gymInfoPhoneNumber: null,
            gymInfoEquipmentLayout: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/gymInfo/read',
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                const centerInfo = response.data;
                console.log(centerInfo)
                this.setState({
                    gymInfoID: centerInfo.gymInfoID,
                    gymInfoName: centerInfo.gymInfoName,
                    gymInfoAddress: centerInfo.gymInfoAddress,
                    gymInfoPhoneNumber: centerInfo.gymInfoPhoneNumber,
                    gymInfoEquipmentLayout: centerInfo.gymInfoEquipmentLayout
                })

            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <br />
                <StyledMyInfo>
                    {String(this.state.gymInfoName).length > 1 ? this.state.gymInfoName : '등록된 이름이 없습니다.'}
                </StyledMyInfo>
                <br />
                <MyPageBoxStyle>
                    <div>
                        센터 주소
                    </div>
                    <div>[{String(this.state.gymInfoAddress).length > 1 ? this.state.gymInfoAddress : '등록된 주소가 없습니다.'}]</div>
                    <br />
                    <div>
                        센터 전화번호
                    </div>
                    <div>
                        <div>[{String(this.state.gymInfoPhoneNumber).length > 1 ? this.state.gymInfoPhoneNumber : '등록된 전화번호가 없습니다.'}]</div>

                    </div>
                </MyPageBoxStyle>
                <MyPageBoxStyle>
                    [사진]
                </MyPageBoxStyle>
            </div >
        );
    }
}
const MyPageBoxStyle = styled.div`
    background-color:#F5F5F5;
    padding:20px;
    min-width:350px;
    width:100%;
    text-align:center;
    margin:0 auto;
    margin-bottom:4px;
    border-top:1px #E0E0E0 solid;
    border-bottom:1px #E0E0E0 solid;
`;


let StyledMyInfo = styled.div`
    margin:0 auto;
    text-align:center;
    font-size:24px;
    width:100%;
    height:100px;
    vertical-align:middle;
`;

export default CenterInfo;