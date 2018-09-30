import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Upcoming from "./pages/Upcoming";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import SearchBox from "./components/SearchBox";
import "./css/style.scss";
import ScrollToTop from "react-scroll-up";
import up from "./assets/up_arrow_round.png";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Upcoming path="/" />
          <Movie path="/movie/:id" />
          <Actor path="/actor/:id" />
          <SearchBox path="/search" />
        </Router>

        <ScrollToTop showUnder={160}>
          <img src={up} alt="" />
        </ScrollToTop>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
