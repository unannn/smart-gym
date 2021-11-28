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
        let startTime = String(this.props.children.startTime.split('T')[1]).substring(0, 5);
        const endTime = String(this.props.children.endTime.split('T')[1]).substring(0, 5);
        return (
            <EquipmentItemStyle canDelete={this.props.canDelete}>
                <EquipNameStyle>{this.props.children.equipmentName + ' ' + this.props.children.equipmentNameNth}</EquipNameStyle>
                <ReservationTimeStyle>{startTime}~{endTime}</ReservationTimeStyle>
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
            modalEquipData: '',
            equipList: this.props.equipList
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        return { equipList: nextProps.equipList }
    }

    componentDidMount() {
        //scroll 끝에 갖다 놓기
        $('.EquipScroll').scrollLeft(10000);

        let equips = this.state.equipList;
        console.log("eq" + equips);
        if (equips === null) equips = [];

        // equips.push({
        //     equipmentID: '10', equipmentName: '이 곳에 추가됩니다', startTime: '', endTime: ''
        // })

        this.setState({ equipList: equips });

    }


    onClickDelete(equipData) {
        this.setState({ modalOn: true });
        this.setState({
            modalEquipData: equipData.children
        });

    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.modalEquipData);
        this.props.cancelReservation(this.state.modalEquipData.reservationID);
        this.setState({
            modalOn: false,
            equipList: this.props.equipList
        })
        window.location.reload();
    }

    render() {
        const equipsList = this.state.equipList.map((equip, index) => <StyledEquipLI key={equip.equipmentID + ' ' + index}>
            <EquipmentItem onClickDelete={this.onClickDelete.bind(this)} canDelete={this.props.canDelete} equipId={equip.equipmentID}>{equip}</EquipmentItem>
        </StyledEquipLI>)
        // let equips = [{ equipmentID: 1, equipmentName: '벤치 1', startTime: '09:00', endTime: '09:20' }, { equipmentID: 2, equipmentName: '인클라인 벤치', startTime: '09:20', endTime: '09:40' },
        // { equipmentID: 3, equipmentName: '멀티렉', startTime: '09:40', endTime: '10:00' }, { equipmentID: 4, equipmentName: '딥스 머신', startTime: '10:10', endTime: '10:25' },
        // { equipmentID: 6, equipmentName: '랫풀 다운 머신', startTime: '10:30', endTime: '10:50' }, { equipmentID: 5, equipmentName: '케이블 머신', startTime: '10:50', endTime: '11:00' }];
        // //나중에 아이디 적용할 것

        // if (equipList.length === 0) {
        //     equipList = <StyledEquipLI >
        //         <EquipmentItem equipId={'none'}>{{ equipmentName: '알수없음', startTime: '', endTime: '' }}</EquipmentItem>
        //     </StyledEquipLI>
        // }

        return (
            <StyledRezEquipList>
                {/* <StyledLeftButton>{'<'}</StyledLeftButton> */}
                <StyledEquipUL className="EquipScroll">
                    {equipsList.length !== 0 ? equipsList : '예약한 운동기구가 없습니다.'}
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
                            <form onSubmit={this.handleSubmit.bind(this)} autoComplete={"off"}>
                                <InputButton type="submit" value="확인"></InputButton>
                            </form>
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
    /* font-weight:550; */
`;
var StyledEquipUL = styled.ul`
    margin-bottom:0px;
    padding-left:0;
    list-style:none;
    overflow-x:scroll;
    overflow-y:hidden;
    white-space:nowrap;
    background-color:rgba(255,255,255,0);
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

