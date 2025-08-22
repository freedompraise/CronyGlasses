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
import PrivateRoute from "./components/PrivateRoute";
import { CartContextProvider } from "./contexts/CartContext";
import { AgeVerificationProvider } from "./contexts/AgeVerificationContext";
import { OrderHistoryProvider } from "./contexts/OrderHistoryContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import "tailwindcss/tailwind.css";
import "./index.css";

function App() {
  return (
    <AuthContextProvider>
      <AgeVerificationProvider>
        <CartContextProvider>
          <OrderHistoryProvider>
            <div className="font-serif">
              <Router>
                <NavBar />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/drinks/:id" exact component={Product} />
                  <Route path="/login" exact component={Login} />
                  <PrivateRoute path="/account" exact component={Account} />
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
      </AgeVerificationProvider>
    </AuthContextProvider>
  );
}

export default App;
