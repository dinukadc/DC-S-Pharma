import React, {Component} from 'react';

import logo from '../../images/logo.png'
import logpic from '../../images/logpic.png'

import '../../scss/Header.css';

class Header extends Component {

    signOut = () => {
        window.localStorage.clear();
        window.location.href = '/login';
    }

    render() {
        return(
            <div>
                <br/>
               <span><img src={logo}/></span>


                <span className='ds-logout'>
                    <span><img src={logpic}/></span>
                    <button type="button" class="btn btn-primary" onClick={this.signOut}>{localStorage.getItem('user')}</button>
                </span>

                <span className="navbar navbar-expand-lg navbar-dark bg-primary" />
            </div>
    );
    }
}

export default Header;