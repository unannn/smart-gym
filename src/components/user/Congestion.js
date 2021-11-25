import React, { Component } from 'react';
import styled from "styled-components";

class Congestion extends Component {
    render() {
        return (
            <CongestionStyle>
                <CongestionTextStyle>
                    혼잡도
                </CongestionTextStyle>
                <CongestionPercentageStyle>
                    {this.props.percentage + "%"}
                </CongestionPercentageStyle>
            </CongestionStyle>
        );
    }
}
const CongestionStyle = styled.div`
    color:white;
`;

const CongestionTextStyle = styled.div`
    margin:5px;
`;

const CongestionPercentageStyle = styled.div`
    font-size:36px;
`;

export default Congestion;