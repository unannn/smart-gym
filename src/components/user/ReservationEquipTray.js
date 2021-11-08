import React, { Component } from 'react';
import { Children } from 'react';
import styled from "styled-components";
import $ from "jquery";
import Modal from './Modal';
import InputButton from './InputButton';

class EquipmentItem extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(children) {
        return (
            <EquipmentItemStyle canDelete={this.props.canDelete}>
                <EquipNameStyle>{this.props.children.name}</EquipNameStyle>
                <ReservationTimeStyle>{this.props.children.startTime}~{this.props.children.endTime}</ReservationTimeStyle>
                {this.props.canDelete ? <DeleteButtonStyle onClick={(e) => this.props.onClickDelete(this.props)}><img src="\image\x.png" alt="" width="20px" /></DeleteButtonStyle> : ''}
            </EquipmentItemStyle>
        );
    }
}
var DeleteButtonStyle = styled.div`
    position: relative;
    left:30px;
    bottom:90px;
    display: inline-block;
`;

var EquipmentItemStyle = styled.div`
    padding:11px;
    padding-bottom:0px;
    /* padding-bottom:${props => !props.canDelete ? '11px' : '0px'}; */
    height:100px;
    display: inline-block;
    vertical-align: middle;
`;

var EquipNameStyle = styled.div`
    width:66px;
    height:66px;
    white-space: normal;
    word-break: keep-all;
    background-color:#505050;
    border-radius:15px;
    color:white;
    
    display: table-cell;
    text-align:center;
    vertical-align: middle;
  
    font-size:13px;
`;
var ReservationTimeStyle = styled.div`
    font-size:10px;
`;


class ReservationEquipTray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOn: false,
            modalEquipData: ''
        }
    }

    componentDidMount() {
        //scroll 끝에 갖다 놓기
        $('.EquipScroll').scrollLeft(10000);
    }


    onClickDelete(equipData) {
        this.setState({ modalOn: true });
        this.setState({
            modalEquipData: equipData.children
        });

    }



    render() {
        let equips = [{ id: 1, name: '벤치 1', startTime: '09:00', endTime: '09:20' }, { id: 2, name: '인클라인 벤치', startTime: '09:20', endTime: '09:40' },
        { id: 3, name: '멀티렉', startTime: '09:40', endTime: '10:00' }, { id: 4, name: '딥스 머신', startTime: '10:10', endTime: '10:25' },
        { id: 6, name: '랫풀 다운 머신', startTime: '10:30', endTime: '10:50' }, { id: 5, name: '케이블 머신', startTime: '10:50', endTime: '11:00' }];
        // 나중에 아이디 적용할 것


        const equipList = equips.map((equip) => <StyledEquipLI key={equip.id}>
            <EquipmentItem onClickDelete={this.onClickDelete.bind(this)} canDelete={this.props.canDelete} equipId={equip.id}>{equip}</EquipmentItem>
        </StyledEquipLI>)

        return (
            <StyledRezEquipList>
                {/* <StyledLeftButton>{'<'}</StyledLeftButton> */}
                <StyledEquipUL className="EquipScroll">
                    {equipList}
                </StyledEquipUL>
                {/* <StyledRightButton>{'>'}</StyledRightButton> */}
                {this.state.modalOn ? <Modal onClick={(e) => this.setState({ modalOn: false })}>
                    <div>
                        <div>
                            <div>{this.state.modalEquipData.name}</div>

                            {this.state.modalEquipData.startTime}~{this.state.modalEquipData.endTime}
                        </div>
                        <div>
                            정말 예약을 취소하시겠습니까?
                        </div>
                        <br />
                        <div>
                            <InputButton type="button" value="확인"></InputButton>
                        </div>
                    </div>
                </Modal> : ""}
            </StyledRezEquipList>
        );
    }
}

var StyledEquipLI = styled.li`
    /* padding-right:40px; */
    border:1px;
    border-color:black;
    display:inline;
`;
var StyledEquipUL = styled.ul`
    margin-bottom:0px;
    padding-left:0;
    list-style:none;
    overflow:scroll;
    white-space:nowrap;
    background-color:rgba(250,250,250,0);
    ::-webkit-scrollbar{
        display:none;
    }
`;


var StyledLeftButton = styled.button`
     position: relative;
     right: 45%;
     top:57px;
    margin-top:7px;
`;
var StyledRightButton = styled.button`
     position: relative;
     left: 45%;
     top:-81px;
    margin-top:7px;
`;


var StyledRezEquipList = styled.div`
    width:100%;
    max-width:614px;
    display:inline-block;
    /* position: flex; */
    
`;



export default ReservationEquipTray;

