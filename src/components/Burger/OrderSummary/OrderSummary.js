import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
        componentWillUpdate (){
            console.log('[OrderSummary] willUpdate');
        }
    render () {
        const ingredientsSummary =Object.keys(this.props.ingredients)
        .map (igKey => {
            return <li key = {igKey}>
                <span style={{texttransform:'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}</li>
        });
        return ( 
            <Auxiliary>
            <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>

        );
    }
}




export default OrderSummary;
