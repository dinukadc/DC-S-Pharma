import React, {Component} from 'react';
import * as API from '../../Constants/APIs';
import axios from 'axios';

import Header from '../components/Header';
import AllFoodItems from '../components/FoodSelection/AllFoodItems';
import SelectedFood from '../components/FoodSelection/SelectedFood';
import ButtonBar from '../components/ButtonBar';
import Breadcrumb from '../components/BreadCrumb';
import TotalRow from '../components/FoodSelection/TotalRow';

import '../../scss/FoodItems.css'


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFood:[]
        }

        this.addFoodToSelectedFood = this.addFoodToSelectedFood.bind(this);
        this.deleteFoodFromSelectedFood = this.deleteFoodFromSelectedFood.bind(this);
    }

    addFoodToSelectedFood(food) {
        let selectedFood = this.state.selectedFood;
        let previous = null;

        for(let i=0; i<selectedFood.length; i++) {
            if(food.name === selectedFood[i].name) {
                previous = selectedFood[i];
                previous.quantity = previous.quantity + food.quantity;
                previous.price = previous.price + food.price;
            }

        }

        if(previous === null) {
            selectedFood.push(food);
        }
        this.setState(selectedFood);

    }

    deleteFoodFromSelectedFood (index) {
        const selectedFood = this.state.selectedFood;

        selectedFood.splice(index,1);

        this.setState(selectedFood);
    }

    addFood() {
        let addFood = this;
        const body = {
            name:document.getElementById('name').value,
            price:document.getElementById('price').value
        }
        axios.post(API.Get_All_Food, body).then(function (responce) {
            //window.alert(responce.status);
            window.location.reload();
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {
        return(
            <div className='ds-container'>

                <Header/>
                <Breadcrumb path={'Admin Dashboard'}/>



                <div className="ds-food-selection">
                    <h3>Admin DashBoard</h3>
                    <div className="row">

                        <div className="col-md-6">
                            <AllFoodItems addFoodToSelectedFood={this.addFoodToSelectedFood}
                                          disable={true}/>
                        </div>

                        <div className="list-group col">
                            <h3 className="list-group-item list-group-item-action active">
                                Add Food
                            </h3>

                            <div className="form-group list-group-item list-group-item-action">
                                <label >Food Item Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp"/>

                                <label >Price Rs.</label>
                                <input type="text" className="form-control" id="price" aria-describedby="emailHelp"/>

                            </div>


                            <div className="list-group-item list-group-item-action disabled ds-button">
                                <button type="button" className="btn btn-primary" onClick={this.addFood}>Add Food</button>
                            </div>
                        </div>


                    </div>
                </div>

                <ButtonBar work={'Customer Dashboard'}/>

            </div>
        );
    }
}

export default Dashboard;