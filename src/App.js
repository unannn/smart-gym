import './App.css';
import LoginDemo from './pages/login/LoginDemo';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserMain from './pages/user/UserMain';
import ManagerMain from './pages/manager/MangerMain';
import Login from './pages/login/Login';

function App() {
  let isAuthorized = sessionStorage.getItem("login");
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* {isAuthorized !== 'OK' ? <Redirect to="/login" /> : <Redirect to="/user" />} */}
          <Route exact path='/'>
            <LoginDemo></LoginDemo>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/user'>
            <UserMain></UserMain>
          </Route>
          <Route exact path='/manager'>
            <ManagerMain></ManagerMain>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
