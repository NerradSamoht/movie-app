import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Upcoming from "./pages/Upcoming";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Upcoming path="/" />
          <Movie path="/movie/:id" />
          <Actor path="/actor/:id" />
        </Router>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
