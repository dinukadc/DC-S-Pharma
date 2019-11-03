import React, {Component} from 'react';

import axios from 'axios';
import * as API from '../../Constants/APIs';

import '../../scss/Login.css';

class SignUp extends Component {

    signup() {
        const pss1 = document.getElementById('password1').value;
        const pss2 = document.getElementById('password2').value;

        if( pss1.length>0 && pss1 === pss2){
            const body = {
                name:document.getElementById('name').value,
                mobileNo:document.getElementById('mobile').value,
                email:document.getElementById('email').value,
                username:document.getElementById('username').value,
                password:document.getElementById('password1').value,
                loyalityPoints:0,
                type:document.getElementById('type').value
            };
            console.log(pss1.length,pss2,body);
            axios.post(API.Get_All_Customers,body).then(function (response) {
                if(response.status==200) {
                    window.alert('Welcome to EMYLs Food world')
                    localStorage.setItem('logged','ok');
                    localStorage.setItem('user', response.data.name);
                    localStorage.setItem('type', response.data.type);
                    localStorage.setItem('id', response.data.id || response.data._id);
                    localStorage.setItem('points', response.data.loyalityPoints);
                    console.log()
                    response.data.type === 'admin' ? window.location.href = '/Admin' : window.location.href = '/Dashboard';

                }
                else window.alert('cannot create :(')
            }).catch(function (err) {
                window.alert('cannot create :(')
            });
        }
        else window.alert('Password dismatch');


    }


    render() {
        return(


        <div className="list-group ds-signUp">
            <h3 className="list-group-item list-group-item-action active">SignUp</h3>

            <div className="form-group list-group-item list-group-item-action">
                <label className="col-form-label">Name</label>
                <input type="text" className="form-control" id="name" />

                <label className="col-form-label">Mobile No.</label>
                <input type="text" className="form-control" id="mobile" />
            </div>

            <div className="form-group list-group-item list-group-item-action">
                <label >Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>

            <div className="form-group list-group-item list-group-item-action">
                <label className="col-form-label">Usename</label>
                <input type="text" className="form-control" id="username" />
            </div>


            <div className="form-group list-group-item list-group-item-action">
                <label>Password</label>
            <input type="password" className="form-control" id="password1"/>
            </div>

            <div className="form-group list-group-item list-group-item-action">
                <label>Re-Enter Password</label>
                <input type="password" className="form-control" id="password2"  />
            </div>

            <div className="form-group list-group-item list-group-item-action">
                <label>User Type</label>
                <select className="form-control" id="type" >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <small id="emailHelp"  style={{color:'red'}}>This is provide to create an admin to log as admin</small>

            </div>


            <div className="list-group-item list-group-item-action disabled ds-button">
                <button type="button" className="btn btn-primary btn-lg ds-button" onClick={this.signup}>SignUp</button>
            </div>
        </div>
        );
    }
}

export default SignUp;