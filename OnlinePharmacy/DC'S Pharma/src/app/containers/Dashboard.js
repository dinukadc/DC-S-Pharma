import React, {Component} from 'react';

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


    render() {
        return(
            <div className='ds-container'>

                <Header/>
                <Breadcrumb path={'Home'}/>



                <div className="ds-food-selection">
                    <h3>Food Selection</h3>
                    <div className="row">

                        <div className="col-md-5">
                            <AllFoodItems addFoodToSelectedFood={this.addFoodToSelectedFood} disable={false}/>
                        </div>

                        <div className="col">
                            <SelectedFood selectedFood={this.state.selectedFood} deleteFood={this.deleteFoodFromSelectedFood}/>
                        </div>

                    </div>
                </div>
               <div className="row ds-total">
                   <div className="col">
                       <TotalRow selectedFood={this.state.selectedFood} />
                   </div>
               </div>
                <ButtonBar work={'Payments'}/>

            </div>
        );
    }
}

export default Dashboard;