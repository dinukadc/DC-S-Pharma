import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as API from '../../Constants/APIs';

import axios from 'axios';

import '../../scss/Login.css';

class Login extends Component {

    login() {
        let login = this;

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const body = {username:username,password:password};

        axios.post(API.LOGIN,body).then(function (response) {
            if(response.status === 200) {
                console.log(response);
                localStorage.setItem('logged','ok');
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('type', response.data.type);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('points', response.data.loyalityPoints);
                response.data.type === 'admin' ? window.location.href = '/Admin' : window.location.href = '/Dashboard';
            }
        }).catch( function (err) {
            console.log(err);
        });
    }

    render() {
        return(
            <div className="list-group ds-login">
                <h3 className="list-group-item list-group-item-action active">
                   Login
                </h3>

                    <div className="form-group list-group-item list-group-item-action">
                        <label >Username</label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
                    </div>
                   <div className="form-group list-group-item list-group-item-action">
                       <label>Password</label>
                       <input type="password" className="form-control" id="password" placeholder="Password" />
                   </div>


                <div className="list-group-item list-group-item-action disabled ds-button">
                    <Link to={"/SignUp"}>
                    <button type="button" className="btn btn-primary btn-lg ds-button">SignUp</button>
                    </Link>
                    <button type="button" className="btn btn-primary btn-lg" onClick={this.login}>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;