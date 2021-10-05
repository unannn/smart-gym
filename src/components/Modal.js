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
    width: 400px;
    height: 100px;
    margin: 0px auto;
    background-color: #00AAA0;
    position: fixed;
    top: 50%;
    left:50%;
    bottom: 50%;
    transform: translateX(-50%);
`


class FindAccontModal extends React.Component {
    render() {
        return (
            <div>
                <ModalBackground>

                    <StyledModal>
                        Hi
                    </StyledModal>
                </ModalBackground>
            </div>
        )
    }

}
export default FindAccontModal;