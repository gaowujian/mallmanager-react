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
        <Route path="/login" exact component={Login} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </Router>
  );
}

export default App;
