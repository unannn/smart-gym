import React from 'react';
import styled from 'styled-components';

let ModalBackground = styled.div`
    position: fixed;
    width:100%;
    height:100%;
    background: #000000;
    background : rgba(0, 0, 0, 0.6);
    top:0%;
    left:0%;    
`
let StyledModal = styled.div`
    width: 93%;
    //min-height: 100px;
    max-width: 400px;
    padding-left: 20px;
    text-align:center;
    margin:0 auto;
    background-color: #FFFFFF;
    position: absolute;
    border-radius:5px;
    top: 50%;
    left:50%;
    bottom: 50%;
    transform: translate(-50%,-50%);
    border-left:3px;
    padding:10px;
    display: table;
`
let CloseButton = styled.div`
    position:fixed;
    left:95%;
    top:0%;
`


class FindAccountModal extends React.Component {

    render() {

        return (
            <div>

                <ModalBackground>
                    <StyledModal>
                        <CloseButton onClick={this.props.onClick}>x</CloseButton>
                        {this.props.children}
                    </StyledModal>
                </ModalBackground>


            </div>
        )
    }

}
export default FindAccountModal;