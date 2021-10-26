import React from 'react';
import styled from 'styled-components';
import { Button, ButtonToolbar } from 'react-bootstrap';
let Mbutton = styled.li`
&:hover {                
    background: #545454;
  }
   float: left;
   width: 180px;
   height: 60px;
   font-size: 10pt;
   line-height: 50px;
   text-align: center;
   list-style-type: none;
   background: #949494;
   `;

class MenuButton extends React.Component {
    render() {
        return (
            <div>
                <ButtonToolbar>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="info">Info</Button>
                    <Button variant="light">Light</Button>
                    <Button variant="dark">Dark</Button>
                    <Button variant="link">Link</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default MenuButton