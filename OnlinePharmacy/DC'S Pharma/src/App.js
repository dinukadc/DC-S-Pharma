import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';

import Login from './app/containers/Login';
import Dashboard from './app/containers/Dashboard';
import Payments from './app/containers/PaymentGateway';
import SignUp from './app/containers/SignUp';
import AdminDashboard from './app/containers/AdminDashboard';


class App extends Component {
  render() {
      const isLogged = localStorage.getItem('logged');
      const type = localStorage.getItem('type');
    return (
        <HashRouter>
                {
                    isLogged === 'ok'
                    ?

                            type === 'user'
                            ?
                                <div>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route path="/Dashboard" component={Dashboard} />
                                    <Route path="/Payments" component={Payments}/>
                                </div>
                            :
                                <div>
                                    <Route exact path="/" component={AdminDashboard} />
                                    <Route path="/Dashboard" component={Dashboard} />
                                    <Route path="/Payments" component={Payments}/>
                                    <Route path="/Admin" component={AdminDashboard} />
                                </div>

                    :
                        <div>
                            <Route exact path="/" component={Login}/>
                            <Route  path="/Login" component={Login}/>
                            <Route  path="/SignUp" component={SignUp} />
                        </div>
                }

        </HashRouter>
    );
  }
}

export default App;
