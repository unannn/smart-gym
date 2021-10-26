import './App.css';
import LoginDemo from './pages/login/LoginDemo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserMain from './pages/user/UserMain';
import ManagerMain from './pages/manager/MangerMain';
import Login from './pages/login/Login';
import UserM from './pages/manager/Layout/userManage';
import EquipmentM from './pages/manager/Layout/equipment';
import CreateEqui from './pages/manager/Layout/cEquipment';
import OperPolicy from './pages/manager/Layout/operPolicy';

import Prac from './pages/manager/Layout/prac';
import 'bootstrap/dist/css/bootstrap.min.css';
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
          <Route exact path='/userManage'>
            <UserM></UserM>
          </Route>
          <Route exact path='/equipment'>
            <EquipmentM></EquipmentM>
          </Route>
          <Route exact path='/operPolicy'>
            <OperPolicy></OperPolicy>
          </Route>
          <Route exact path='/cEquipment'>
            <CreateEqui></CreateEqui>
          </Route>

          <Route exact path='/prac'>
            <Prac></Prac>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
