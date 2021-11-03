import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../components/user/InputText';
import InputButton from '../../components/user/InputButton'
import axios from "axios";

let ModalContent = styled.div`
    display: table-row;
`

class FindId extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            userEmail: '',
            isValid: true,
            userPW: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:8080/allowedUser/findPW',
            {
                userID: this.state.userID,
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
                const content = response.data;

                if (content.success) {
                    if (content.code === 1) {
                        this.setState({ isValid: true, userPW: "내 비밀번호 : " + content.data });
                    } else {
                        this.setState({ isValid: false });
                    }
                } else {
                    throw content;
                }
            })
            .catch((response) => {
                console.log('Error');
                console.log(response);
            });
    }

    handleIDChange(e) {
        this.setState({
            userID: e.target.value,
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
                비밀번호 찾기
                <br />
                <br />
                <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                    <InputText type='text' id="name" onChange={this.handleIDChange.bind(this)} value={this.state.userID || ''} placeholder="아이디 입력" backgroundColor="#F2F2F2"></InputText>
                    <InputText type='text' id="email" onChange={this.handleEmailChnage.bind(this)} value={this.state.userEmail || ''} placeholder="이메일 주소 입력" backgroundColor="#F2F2F2"></InputText>
                    {this.state.isValid ? <UserIDStyle>{this.state.userPW}</UserIDStyle> : <ErrorMessageStyle>입력이 옳바르지 않습니다.</ErrorMessageStyle>}
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
    position:relative;
    font-size:13px;
    text-align:left;
    margin: 0 auto;
    width:225px;
`;

export default FindId;