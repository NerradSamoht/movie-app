import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import SearchBox from "./components/SearchBox";
import "./css/loaded-styles.scss";
import ScrollToTop from "react-scroll-up";
import up from "./assets/up_arrow_round.png";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <SearchBox path="/" />
          {/* <Upcoming path="/" /> */}
          {/* <Movie path="/movie/:id" /> */}
          {/* <Actor path="/actor/:id" /> */}
        </Router>

        <ScrollToTop showUnder={160}>
          <img src={up} alt="" />
        </ScrollToTop>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
