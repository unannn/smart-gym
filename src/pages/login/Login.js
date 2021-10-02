import React from 'react';
import Input from '../../components/Input';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Sejong GYM</h1>
                <form action="submit">
                    <Input type='text'></Input>
                    <Input type='password'></Input>
                </form>

            </div>
        )
    }
}

export default Login;