import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
function App() {
  return (
    <Router>
      <Link to="/">首页</Link>
      <br />
      <Link to="/about">详情页</Link>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
      </Switch>
    </Router>
  );
}

export default App;
