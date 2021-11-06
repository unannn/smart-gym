import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import $ from "jquery";
import jquery from "jquery";
import axios from "axios";
let EquiInfo = styled.div`
   position: absolute;
   top: 0px;
   left: 700px;
   width: 470px;
   height: 480px;
   font-size: 10pt;
   text-align: center;
   background: #B5D7FF;
   border-radius: 10px;
   padding:20px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let InfoInput = styled.input`
   font-size: 10pt;
   border-radius: 5px;
   padding: 3px;
   margin:0 auto;
   margin-bottom:10px;
   `;
let ButtonBox = styled.div`
   position: relative;
   margin: 0.5px;
   top: -5px;
   left: -10px;
   width: 430px;
   height: 45px;
   font-size: 10pt;
   text-align: center;
   `;
let ImgBox = styled.div`
    position: relative;
   top: -10px;
   width: 310px;
   height: 310px;
   background: gray;
   border-radius: 2px;
   padding:5px;
   margin:0 auto;
   margin-bottom:10px;
   `;
class DetailU extends React.Component {
    render() {
        return (
            <div>
                <EquiInfo>
                    <label>id</label>
                    <InfoInput /><br />
                    <label>pw</label><br />
                    <label>name</label><br />
                    <label>e-mail</label><br />
                    <label>phone</label><br />
                    <label>state</label><br />
                </EquiInfo>
            </div>
        )
    }
}
export default DetailU;