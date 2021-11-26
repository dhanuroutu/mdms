import React, { useState }  from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import useToken from './useToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from './components/TopMenu/TopMenu';
import Dailywork from './components/Dailywork/Dailywork';
import Employees from './components/Employees/Employees';
import AddEmployee from './components/Employees/AddEmployee';


function App() {
  const { token, setToken } = useToken();
  const [title, setTitle] = useState();

  /*
  if(!token) {
    return (      <>
                  <TopMenu title={title}/>
                  <Login setToken={setToken} />
                  </>
           );
  }
  */
  return (
    <div className="wrapper">
      <TopMenu title={title}/>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard" exact>
            <Dashboard addTitle={(name) => {setTitle(name)}}></Dashboard>
          </Route>
          <Route path="/dailylabour" component={Dailywork} exact>
            <Dailywork></Dailywork>
          </Route>
          <Route path="/employees" component={Employees} exact>
            <Employees></Employees>
          </Route>
          <Route path="/employees/add" component={AddEmployee} exact>
            <AddEmployee></AddEmployee>
          </Route>
          <Route path="/employees/edit" component={AddEmployee} exact>
            <AddEmployee></AddEmployee>
          </Route>

          <Route path="/employees" component={Employees} exact>
            <Employees></Employees>
          </Route>
          <Route path="/employees/add" component={AddEmployee} exact>
            <AddEmployee></AddEmployee>
          </Route>
          <Route path="/employees/edit" component={AddEmployee} exact>
            <AddEmployee></AddEmployee>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
