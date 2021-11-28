import { red } from '@material-ui/core/colors';
import React, { Component } from 'react';
import styled from "styled-components";
import ContentBox from './ContentBox';
class Congestion extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    setCongestionColor(percentage) {
        if (percentage < 30) {
            return '#70AD47';
        }
        else if (percentage < 60) {
            return '#FFCC00';
        }
        return 'red';
    }


    render() {

        let color = this.setCongestionColor(this.props.percentage);
        return (
            <ContentBox height='130px' margin='0 4px 0 0'
                backgroundColor={color} border={' 2px ' + color + 'solid'}>
                <CongestionStyle>
                    <CongestionTextStyle>
                        혼잡도
                    </CongestionTextStyle>
                    <CongestionPercentageStyle>
                        {Math.round(this.props.percentage * 10) / 10 + "%"}
                    </CongestionPercentageStyle>
                </CongestionStyle>
            </ContentBox>
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