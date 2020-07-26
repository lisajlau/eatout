import * as React from "react";
import styled from "styled-components";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Restaurant from "./Restaurant";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Container = styled.div`
  height: 100%;
`;

const App: React.FC<{}> = () => {
  return (
    <Router>
      <div>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/restaurant/:id">
            <Restaurant />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
