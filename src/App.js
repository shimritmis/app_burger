import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Route Path ="/" exact component= {BurgerBuilder} />
            <Route Path ="/checkout" component= {Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
