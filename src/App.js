import './App.css';
import LoginDemo from './pages/login/LoginDemo';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserMain from './pages/user/UserMain';
import ManagerMain from './pages/manager/MangerMain';
import Login from './pages/login/Login';
import DateSelection from './pages/user/Reservation/DateSelection';
import CenterInfo from './pages/user/CenterInfo';
import MyPage from './pages/user/MyPage';
import EquiptionSelection from './pages/user/Reservation/EquiptionSelection';
import EquiptionGuide from './pages/user/EquiptionGuide';

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
          <Route exact path='/user/reservation/date'>
            <DateSelection></DateSelection>
          </Route>
          <Route exact path='/user/reservation/equip'>
            <EquiptionSelection></EquiptionSelection>
          </Route>
          <Route exact path='/user/equipguide'>
            <EquiptionGuide></EquiptionGuide>
          </Route>
          <Route exact path='/user/mypage'>
            <MyPage></MyPage>
          </Route>
          <Route exact path='/user/centerinfo'>
            <CenterInfo></CenterInfo>
          </Route>
        </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
