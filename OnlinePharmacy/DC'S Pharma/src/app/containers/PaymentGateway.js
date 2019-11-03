import React,{Component} from 'react';

import Header from '../components/Header';
import AmountDisplay from '../components/Payments/AmountDisplay';
import BreadCrumb from '../components/BreadCrumb';
import PaymentSelectionBar from '../components/Payments/PaymentSelctionBar';

import '../../scss/Payments.css';

class PaymentGateway extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="ds-container">
                <Header/>
                <BreadCrumb path={"Home > Payments"}/>
                <div className="ds-payments">
                    <h3>Payments</h3>
                    <AmountDisplay/>
                </div>
                <PaymentSelectionBar/>
            </div>
        );
    }
}

export default PaymentGateway;