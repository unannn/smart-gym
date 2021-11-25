import React, { Component } from 'react';
import styled from "styled-components";

class EquipDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        return (
            <DetailStyle>
                <EquipImageStyle>
                    <img src={this.props.imageURL} alt="" width={this.props.imageWidth} />
                </EquipImageStyle>
                <EquipmentVideoButton onClick={() => window.open(this.props.equipmentVideoLink, '_blank')}>
                    기구 사용법{'>'}
                </EquipmentVideoButton>
            </DetailStyle>
        );
    }
}

const DetailStyle = styled.div`
background-color:whitesmoke;
`;

const EquipImageStyle = styled.div`
    text-align:center;
    max-width:520px;

`;

const EquipmentVideoButton = styled.div`
text-align:right;
margin-right: 10px;
`;
export default EquipDetail;