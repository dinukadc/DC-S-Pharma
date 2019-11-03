import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


import '../../../scss/FoodItems.css'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


class FoodRaw extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFood:[{name:'Pastry',price:45.00}, {name:'Patis',price:30.00}],
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    addFoodToSelectedFood = () => {
        const food = this.props.food;
        const id = "exampleSelect" + this.props.index;
        const quantity = parseInt(document.getElementById(id).value);

        this.props.addFoodToSelectedFood({name:food.name,quantity:quantity,price:(food.price*quantity)});
        this.handleClose();
    }

    render() {

        return(
            <tbody>
            <tr className="ds-food-column table-active " onClick={this.handleClickOpen}>
                <th scope="row">{this.props.food.name}</th>
                <td>Rs.{this.props.food.price}.00</td>
            </tr>
            <tr className="row" style={{border:'0px solid white',padding:'5px'}}>

            </tr>

            {
                this.props.disable === false ?
                    <Dialog
                        open={this.state.open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            <div className="row">
                                <div className="col">
                                    {this.props.food.name}
                                </div>
                                <div className="col ds-dialog">
                                    <i className="fas fa-utensils"/>
                                </div>
                            </div>

                        </DialogTitle>
                        <DialogContent>
                            <div className="form-group">
                                <label>Select Quantity : </label>
                                <select className="form-control" id={"exampleSelect"+this.props.index}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                To add more than 5, click again on {this.props.food.name}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.addFoodToSelectedFood}>Add to Cart</button>
                            </div>
                            <DialogContentText id="alert-dialog-slide-description">
                                ------ EMYLs Online Fast Food ------
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    :
                    null
            }


                    </tbody>
        );
    }
}

export default FoodRaw;