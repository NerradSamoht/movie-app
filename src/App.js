import React from "react";
import { Router } from "@reach/router";
import Upcoming from "./pages/Upcoming";
import Movie from "./pages/Movie";
import Actor from "./pages/Actor";
import SearchBox from "./components/SearchBox";
import ScrollToTop from "react-scroll-up";

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
          <img src="/up_arrow_round.png" alt="" />
        </ScrollToTop>
      </div>
    );
  }
}

export default App;
