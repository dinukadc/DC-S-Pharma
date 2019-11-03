import React, {Component} from 'react';

import '../../../scss/FoodItems.css'

class SelectedFood extends Component {

    render() {
        return(
            <div>
                <h4>Food Cart  <i className="fas fa-cart-plus" /></h4>
                <p> <i className="far fa-star"/>  Select from Food Items</p>
                <div  className="ds-content-wrapper">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Food</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>

                        {
                            this.props.selectedFood.map((food, index) => {
                                return(
                                    <tbody key={index}>
                                    <tr className="table-active">
                                        <th scope="row">{food.name}</th>
                                        <td>{food.quantity}</td>
                                        <td>Rs.{food.price}.00</td>
                                        <td><i className="fas fa-trash-alt" style={{cursor:'grab'}} onClick={()=>this.props.deleteFood(index)}/></td>
                                    </tr>
                                    <tr className="row" style={{border:'0px solid white',padding:'5px'}}>

                                    </tr>

                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>

            </div>
        );
    }
}

export default SelectedFood;