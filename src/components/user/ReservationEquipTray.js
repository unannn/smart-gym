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
    left:52px;
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
    text-align:center;
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
        console.log(equipData.children);
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


        return (
            <StyledRezEquipList>
                {/* <StyledLeftButton>{'<'}</StyledLeftButton> */}
                <StyledEquipUL className="EquipScroll">
                    {equipsList.length !== 0 ? equipsList : <NoEquipmentMessage>예약한 운동기구가 없습니다.</NoEquipmentMessage>}
                </StyledEquipUL>
                {/* <StyledRightButton>{'>'}</StyledRightButton> */}
                {this.state.modalOn ? <Modal onClick={(e) => this.setState({ modalOn: false })}>
                    <div>
                        <div>
                            <div>{this.state.modalEquipData.equipmentName + ' ' + this.state.modalEquipData.equipmentNameNth}</div>

                            {this.state.modalEquipData.startTime.split('T')[1].substring(0, 5)}~{this.state.modalEquipData.endTime.split('T')[1].substring(0, 5)}
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

const NoEquipmentMessage = styled.div`
    background-color:whitesmoke;
    text-align:center;
    font-size:20px;
    padding: 30px 0 30px 0;
`;


var StyledEquipLI = styled.li`
    /* padding-right:40px; */
    border:1px;
    border-color:black;
    display:inline;
    /* font-weight:550; */
`;
var StyledEquipUL = styled.ul`
    position:relatve;
    margin-bottom:0px;
    padding-left:0;
    margin: 0 auto;
    list-style:none;
    overflow-x:scroll;
    overflow-y:hidden;
    white-space:nowrap;
    background-color:rgba(255,255,255,0);
    ::-webkit-scrollbar{
        display:none;
    }
    height:100px;

`;

var StyledRezEquipList = styled.div`
    height:100px;
    width:100%;
    display:inline-block;
    margin:0 auto;

    /* position: flex; */
    background-color:whitesmoke;
    
`;



export default ReservationEquipTray;

