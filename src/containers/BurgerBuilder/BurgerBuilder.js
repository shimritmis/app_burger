import React, { Component } from 'react'; 
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'


const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.8,
    cheese: 0.4,
    meat: 1
}

class BurgerBuilder extends Component {
    state= {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys (ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice= oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler =() => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler =() => {
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = () => {
        //alert('You Continue!');
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //this is NOT a setup we would use one a REAL app. in a real app we would recalculate the price on the server.
            customer: {
                name: 'Shimrit Misgav',
                address: {
                    street: 'teststreet 2',
                    zipCode: '6178955',
                    city: 'Tel-Aviv',
                    country: 'Israel'
                },
                email:'test@test.com'
            },
            deliveryMethod: 'the fastest'
        }

        axios.post('/orders.json', order)
            .then (response => {
                this.setState ({loading: false, purchasing: false});
            } )
            .catch (error=> {
                this.setState ({loading: false, purchasing: false});
    } );
 }
    //purchaseHandler won't work in the regular method's syntax, because of the word 'this', we'll
    ///get an error. to fix this, we'll use the ES6 arrow function syntax
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled ={this.purchaseCancelHandler} 
        purchaseContinued = {this.purchaseContinueHandler}/>

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        //{salad:true, meat:false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed ={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved= {this.removeIngredientHandler}
                    disabled= {disabledInfo}
                    ordered={this.purchaseHandler}
                    purchasable = {this.state.purchasable}
                    price= {this.state.totalPrice}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;
