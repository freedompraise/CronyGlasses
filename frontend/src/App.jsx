import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import { NavBar, Footer, Subscribe } from "./components/INDEX";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/drinks/:id" exact component={Product} />
          <Route path="/account/login" exact component={Login} />
          <Route path="/account/signup" exact component={Signup} />
          <Route path="/account" exact component={Account} />
          <Route path="/cart" exact component={Cart} />
        </Switch>
        <Subscribe />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
