import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Users from "@/pages/Users";
import "./App.less";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
