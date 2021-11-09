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
import UserM from './pages/manager/Layout/userManage';
import UserA from './pages/manager/Layout/userApproval';
import EquipmentM from './pages/manager/Layout/equipment';
import CreateEqui from './pages/manager/Layout/equipmentCreate';
import OperPolicy from './pages/manager/Layout/operPolicy';
import LayoutE from './pages/manager/Layout/equipmentLayout';
import Prac from './pages/manager/Layout/prac';
import Statistic from './pages/manager/Layout/statistic';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  let logged = window.sessionStorage.getItem('id');
  console.log(logged);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route exact path='/root'>
            <LoginDemo></LoginDemo>
          </Route> */}
          {logged ? <Redirect path="/root" to='/user' /> : <Redirect path="/root" to='/login' />}
          {logged ? <Redirect path="/login" to='/user' /> : <Redirect path="/user" to='/login' />}
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
          <Route exact path='/equipmentLayout'>
            <LayoutE></LayoutE>
          </Route>
          <Route exact path='/prac'>
            <Prac></Prac>
          </Route>
          <Route exact path='/userApproval'>
            <UserA></UserA>
          </Route>
          <Route exact path='/statistic'>
            <Statistic></Statistic>
          </Route>
        </Switch>
      </div>
    </BrowserRouter >

  );
}

export default App;
