import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { NavBar, Footer, Subscribe } from "./components/INDEX";
import { CartContextProvider } from "./CartContext";
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
            <Route path="/account/login" exact component={Login} />
            <Route path="/account/signup" exact component={Signup} />
            <Route path="/account" exact component={Account} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" exact component={Checkout} />
          </Switch>
          <Subscribe />
          <Footer />
        </Router>
      </div>
    </CartContextProvider>
  );
}

export default App;
