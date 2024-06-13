import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Product,
  Login,
  Account,
  Cart,
  Checkout,
  ThankYou as OrderConfirmation,
} from "./pages";
import { NavBar, Footer, Subscribe, PrivateRoute } from "./components";
import { CartContextProvider } from "./contexts/CartContext";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <CartContextProvider>
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
    </CartContextProvider>
  );
}

export default App;
