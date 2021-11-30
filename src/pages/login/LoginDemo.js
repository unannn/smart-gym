import React from 'react';
import { Link } from 'react-router-dom';

class LoginDemo extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <Link to="/user"> Go to user </Link>
                </h1>
                <h1>
                    <Link to="/manager"> Go to manager </Link>
                </h1>
                <h1>
                    <Link to="/login"> Go to log in </Link>
                </h1>
            </div>
        )
    }
}

export default LoginDemo;