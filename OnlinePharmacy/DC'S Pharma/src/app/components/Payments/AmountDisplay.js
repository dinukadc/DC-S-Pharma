import React, {Component} from 'react';

import '../../../scss/AmountDetails.css';

class AmountDisplay extends Component {
    render() {
        const total = parseInt(localStorage.getItem('total')).toFixed(2);
        const discount = parseInt(total*localStorage.getItem('points')*10/100).toFixed(2);
        const subTot = (total - discount).toFixed(2);
        localStorage.setItem('subTotal',subTot);
        return(
            <div className="list-group">

                <h5 className="list-group-item list-group-item-action ds-amount-display">Total = Rs.{total}</h5>
                <h5 className="list-group-item list-group-item-action disabled ds-amount-display">Loyality Discount = Rs.{discount}</h5>
                <h3 className="list-group-item list-group-item-action active ds-amount-display">Sub Total = Rs.{subTot}</h3>
            </div>
        );
    }
}

export default AmountDisplay;