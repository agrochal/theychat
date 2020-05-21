import React from "react";
import "./App.css";
import Main from "./Main";
import ChatS from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat/:room/:username" component={ChatS} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}
