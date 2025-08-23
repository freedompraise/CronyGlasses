import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/ThankYou";

import NavBar from "./components/NavBar";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";
import { CartContextProvider } from "./contexts/CartContext";
import { OrderHistoryProvider } from "./contexts/OrderHistoryContext";
import "tailwindcss/tailwind.css";
import "./index.css";

function App() {
  return (
    <CartContextProvider>
      <OrderHistoryProvider>
        <div className="font-serif">
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/drinks/:id" exact component={Product} />
              <Route path="/login" exact component={Login} />
              <Route path="/account" exact component={Account} />
              <Route path="/cart" exact component={Cart} />
              <Route path="/checkout" exact component={Checkout} />
              <Route path="/thank-you" exact component={OrderConfirmation} />
            </Switch>
            <Subscribe />
            <Footer />
          </Router>
        </div>
      </OrderHistoryProvider>
    </CartContextProvider>
  );
}

export default App;
