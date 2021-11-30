import React, { Component } from 'react';
import styled from "styled-components";

class ContentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <BoxStyle width={this.props.width} height={this.props.height} margin={this.props.margin}
                backgroundColor={this.props.backgroundColor} border={this.props.border}>
                {this.props.children}
            </BoxStyle>
        );
    }
}

const BoxStyle = styled.div`
    position:relative;
    /* display:table-cell; */
    border: ${props => props.border};
    background-color: ${props => props.backgroundColor};
    border-radius:5px;
    text-align:center;
    vertical-align:middle;
    /* max-width:${props => props.width}; */
    height:${props => props.height};
    min-height:130px;
    width:100%;
    margin: ${props => props.margin};
`;

export default ContentBox;