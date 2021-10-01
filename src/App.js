import './App.css';
import LoginDemo from './pages/login/LoginDemo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserMain from './pages/user/UserMain';
import ManagerMain from './pages/manager/MangerMain';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>

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
