import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import { NavBar, Footer, Subscribe } from "./components/INDEX";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" exact component={Product} />
        </Switch>
        <Subscribe />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
