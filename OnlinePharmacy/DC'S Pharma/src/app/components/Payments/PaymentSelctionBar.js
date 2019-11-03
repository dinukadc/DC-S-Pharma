import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import dialog from '../../../images/dialog.png';
import sampth from '../../../images/Sampath.png';

import axios from 'axios';
import * as API from '../../../Constants/APIs';

import '../../../scss/Payments.css';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class PaymentSelctionBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openC:false,
            openM:false,
        };

        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = (status) => {
        switch(status){
            case "openM" : this.setState({ openM: true}); break;
            case "openC" : this.setState({ openC: true}); break;
        }
    };

    handleClose = () => {
        this.setState({openM:false, openC:false});
    };

    mobilePayments() {
        let self = this;

        const body = {
            amount:localStorage.getItem('subTotal'),
            phoneNo:document.getElementById('phoneNo').value,
            pin:document.getElementById('pin').value,
            userId:localStorage.getItem('id')
        }

        const url = API.Dialog_payments;

        axios.post(url, body).then(function (res) {
            if(res.status == 200) {
                window.alert('Payments are successfully done');
                window.location.href = '/Dashboard';
            }
            else  window.alert('Cannot Do Payments :(');
        }).catch(function (err) {
            console.log(err);
            window.alert('Incorrect inputs :(');
        });

    }

    sampathPayments() {
        let self = this;

        const body = {
            amount:localStorage.getItem('subTotal'),
            phoneNo:document.getElementById('phoneNo').value,
            cvc:document.getElementById('cvc').value,
            creditCardNo:document.getElementById('creditCardNo').value,
            holdersName:document.getElementById('holdersName').value,
            userId:localStorage.getItem('id')
        }

        const url = API.Sampath_payments;

        axios.post(url, body).then(function (res) {
            if(res.status == 200) {
                window.alert('Payments are successfully done');
                window.location.href = '/Dashboard';
            }
            else  window.alert('Cannot Do Payments :(');
        }).catch(function (err) {
            console.log(err);
            window.alert('Incorrect inputs :(');
        });

    }


    render() {

        const subTot = "Rs."+parseInt(localStorage.getItem('subTotal')).toFixed(2);
        return(
            <div className="ds-payments">
                    <h5>Payments via</h5>


                <div className="row ds-amount-display">
                    <div className="col">
                        <button type="button" className="btn btn-primary" onClick={() => this.handleClickOpen("openM")}>Mobile</button>
                        <button type="button" className="btn btn-primary" onClick={() =>this.handleClickOpen("openC")}>Credit Card</button>
                    </div>
                </div>


                <Dialog
                    open={this.state.openM}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="row">
                            <div className="col-md-9">
                                Payments via Dialog
                            </div>
                            <div className="col-md-2">
                                <img src={dialog}/>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className="form-group">
                            <label className="col-form-label">Dialog Number</label>
                            <input type="text" className="form-control" placeholder="0777-xxxxxx / 076-xxxxxxx" id="phoneNo" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Pin No</label>
                            <input type="text" className="form-control"  id="pin" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Amount</label>
                            <input type="text" className="form-control" value={subTot} disabled={true} id="amount" />
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.mobilePayments}>Do Payment</button>
                        </div>
                        <DialogContentText id="alert-dialog-slide-description">
                            ------ EMYLs Online Fast Food ------
                        </DialogContentText>
                    </DialogContent>
                </Dialog>


                {/*Payments via credit card*/}
                <Dialog
                    open={this.state.openC}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="row">
                            <div className="col-md-8">
                                Payments via Sampath Credit Card
                            </div>
                            <div className="col-md-2">
                                <img src={sampth}/>
                            </div>
                        </div>

                    </DialogTitle>
                    <DialogContent>
                        <div className="form-group">
                            <label className="col-form-label">Credit Card No.</label>
                            <input type="text" className="form-control" id="creditCardNo" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">CVC No.</label>
                            <input type="text" className="form-control" placeholder="3 digit No in card" id="cvc" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Holder's Name</label>
                            <input type="text" className="form-control" id="holdersName" />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Amount</label>
                            <input type="text" className="form-control" value={subTot} disabled={true} id="amount" />
                        </div>


                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.sampathPayments}>Do Payment</button>
                        </div>
                        <DialogContentText id="alert-dialog-slide-description">
                            --------------------------- EMYLs Online Fast Food ---------------------------
                        </DialogContentText>
                    </DialogContent>
                </Dialog>


            </div>
        );
    }
}

export default PaymentSelctionBar;