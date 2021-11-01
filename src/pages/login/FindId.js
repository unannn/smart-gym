import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import axios from "axios";
import $ from "jquery";

let ModalContent = styled.div`
    display: table-row;
`

class FindId extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            isValid: true,
            userID: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/allowedUser/findID',
            {
                userName: this.state.userName,
                userEmail: this.state.userEmail
            },
            {
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data === '')
                if (!response.data === '') {
                    this.setState({ isValid: true, userID: "내 아이디 : " + response.data });
                } else {
                    this.setState({ isValid: false });
                }

            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    handleNameChange(e) {
        this.setState({
            userName: e.target.value,
        });
    }

    handleEmailChnage(e) {
        this.setState({
            userEmail: e.target.value
        });
    }

    render() {
        return (
            <ModalContent>
                아이디 찾기
                <br />
                <br />
                <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                    <InputText type='text' id="name" onChange={this.handleNameChange.bind(this)} value={this.state.userName || ''} placeholder="이름 입력" backgroundColor="#F2F2F2"></InputText>
                    <InputText type='text' id="email" onChange={this.handleEmailChnage.bind(this)} value={this.state.userEmail || ''} placeholder="이메일 주소 입력" backgroundColor="#F2F2F2"></InputText>
                    {this.state.isValid ? <UserIDStyle>{this.state.userID}</UserIDStyle> : <ErrorMessageStyle>계정을 찾을 수 없습니다.</ErrorMessageStyle>}
                    <InputButton type='submit' value='확인'></InputButton>
                </form>

            </ModalContent>
        );
    }
}

let ErrorMessageStyle = styled.div`
    color:red;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

let UserIDStyle = styled.div`
    color:black;
    position:relative;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

export default FindId;