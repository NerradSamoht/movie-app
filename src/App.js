import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Upcoming from "./pages/Upcoming/Upcoming";
import Movie from "./pages/Movie/Movie";
import Actor from "./pages/Actor/Actor";
import SearchBox from "./components/SearchBox/SearchBox";
import "./css/loaded-styles.scss";
import ScrollToTop from "react-scroll-up";
import up from "./assets/up_arrow_round.png";
import logo from "./assets/movie-stars.svg";
import { upcomingUrl, searchUrl } from "./js/tmdb";

class App extends React.Component {
  state = {
    movies: [],
    text: "",
    multilist: null,
    id: ""
  };

  componentDidMount() {
    const url = upcomingUrl();

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results
        });
      });
  }

  handleSearchChange = event => {
    this.setState(
      {
        text: event.target.value
      },
      this.getMultiList
    );
  };

  handleSearchClick = () => {
    this.setState({
      text: ""
    });
  };

  getMultiList() {
    if (this.state.text.length < 3) {
      this.setState({
        multilist: null
      });
      return;
    }

    const url = searchUrl(this.state.text);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          multilist: data.results
        });
      });
  }

  render() {
    return (
      <div>
        <div className="nav-container">
          <div>
            <Link className="home" to="/" title="Home">
              <img src={logo} alt="movie camera" width="48" height="48" />
            </Link>
          </div>
          <SearchBox
            multilist={this.state.multilist}
            handleSearchChange={this.handleSearchChange}
            handleSearchClick={this.handleSearchClick}
            text={this.state.text}
          />
        </div>
        <Router>
          <Upcoming path="/" movies={this.state.movies} />
          <Movie path="/movie/:id" id={this.state.id} />
          <Actor path="/actor/:id" id={this.state.id} />
        </Router>

        <ScrollToTop showUnder={160}>
          <img src={up} alt="" />
        </ScrollToTop>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
