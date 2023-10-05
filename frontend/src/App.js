import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/NavBar";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:id" exact element={Product} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
