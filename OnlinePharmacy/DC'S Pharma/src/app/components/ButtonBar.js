import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../scss/ButtonBar.css';

import Payments from '../containers/PaymentGateway';

class ButtonBar extends Component {

    render() {
        let redirect='/Payments';
        this.props.work === 'Payments' ? redirect='/Payments' : redirect='/Dashboard';
        return(
            <div className="row">
                <div className="col-md-7 ds-buttonbar">

                </div>
                <div  className="col-md-3">
                    <Link to={redirect}>
                    <button type="button" className="btn btn-primary btn-lg btn-block">{this.props.work}</button>
                    </Link>
                </div>
                <div className="col-md-2 ds-buttonbar">
                </div>
            </div>
        );
    }
}

export default ButtonBar;