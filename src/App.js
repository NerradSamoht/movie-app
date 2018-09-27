import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Upcoming from "./pages/Upcoming";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Upcoming path="/" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
