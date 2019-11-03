import React, {Component} from 'react';

import '../../../scss/FoodItems.css'
import FoodRaw from './FoodRaw';
import * as API from '../../../Constants/APIs';
import axios from 'axios';




class AllFoodItems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allFood:[],
            isResponseFollFill:false
        }
    }

    componentDidMount() {
        let url = API.Get_All_Food;
        let food = this;

        axios.get(url).then(function (response) {
            food.setState({
                 allFood:response.data,
                isResponseFollFill:true
            });
            console.log(response.data);
        }).catch(function (err) {
            console.log(err);
        });
    }

    render() {

        return(
            <div>
                <h4>Food Items  <i className="fas fa-utensils"/></h4>
                {this.props.disable === false ?
                    <p> <i className="far fa-star"/>  Click on a Food Item</p>
                :
                null}
                <div className="ds-content-wrapper">
                    <table className="table table-hover ">
                        <thead >
                        <tr>
                            <th scope="col">Food</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>



                    {
                        this.state.allFood.map((food, index) => {
                            return(

                                <FoodRaw key={index} index={index} food={food}
                                         addFoodToSelectedFood={this.props.addFoodToSelectedFood}
                                         disable={this.props.disable}/>

                            )
                        })
                    }
                    </table>

                </div>


            </div>
        );
    }
}

export default AllFoodItems;