import './App.css';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
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
import Statistic from './pages/manager/Layout/statistic';
import ReservationLog from './pages/manager/Layout/reservationLog';
import ESLManage from './pages/manager/Layout/esl';
import ESLCreate from './pages/manager/Layout/eslCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavBar from './components/user/UserNavBar';
import styled from "styled-components";
import UserFooter from './components/user/UserFooter'

function App() {

  let logged = window.sessionStorage.getItem('id');

  return (
    <BrowserRouter>
      <div className="App">
        {logged && <UserNavBar></UserNavBar>}
        <Switch>

          <Redirect exact from='/' to='/login' />
          {logged ? <Redirect from="/login" to='/user' /> : <Redirect from="/user" to='/login' />}

          <Route exact path='/login'>
            <ContentStyle><Login ></Login></ContentStyle>
          </Route>
          <Route exact path='/user'>
            <ContentStyle><UserMain></UserMain></ContentStyle>
          </Route>
          <Route exact path='/manager'>
            <ManagerMain></ManagerMain>
          </Route>
          <Route exact path='/user/reservation/date'>
            <ContentStyle><DateSelection></DateSelection></ContentStyle>
          </Route>
          <Route exact path='/user/reservation/equip'>
            <ContentStyle><EquiptionSelection></EquiptionSelection></ContentStyle>
          </Route>
          <Route exact path='/user/equipguide'>
            <ContentStyle><EquiptionGuide></EquiptionGuide></ContentStyle>
          </Route>
          <Route exact path='/user/mypage'>
            <ContentStyle><MyPage></MyPage></ContentStyle>
          </Route>
          <Route exact path='/user/centerinfo'>
            <ContentStyle><CenterInfo></CenterInfo></ContentStyle>
          </Route>
          {logged && <UserFooter></UserFooter>}

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
          <Route exact path='/userApproval'>
            <UserA></UserA>
          </Route>
          <Route exact path='/statistic'>
            <Statistic></Statistic>
          </Route>
          <Route exact path='/ReservationLog'>
            <ReservationLog />
          </Route>
          <Route exact path='/esl'>
            <ESLManage />
          </Route>
          <Route exact path='/eslCreate'>
            <ESLCreate />
          </Route>
        </Switch >
      </div >

    </BrowserRouter >

  );
}

const ContentStyle = styled.div`
  position: relative;
    max-width: 1130px;
    margin: 0 auto;
`;

export default App;
