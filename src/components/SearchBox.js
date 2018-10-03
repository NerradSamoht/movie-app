import React from "react";
import { searchUrl, posterUrl } from "../js/tmdb";
import { Link } from "@reach/router";
import placeholder from "../assets/placeholder.png";

class SearchBox extends React.Component {
  state = {
    text: "",
    multilist: []
  };

  handleSearchChange = event => {
    this.setState(
      {
        text: event.target.value
      },
      this.getMultiList
    );
  };

  getMultiList() {
    if (this.state.text.length < 3) {
      this.setState({
        multilist: []
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
    const { multilist } = this.state;

    return (
      <div className="search">
        <label className="sr" htmlFor="search">
          Search:
        </label>
        <input
          onChange={this.handleSearchChange}
          id="search"
          type="search"
          value={this.state.text}
          placeholder="Enter actor or movie"
          list="multilist"
        />
        {multilist && (
          <ul id="multilist">
            {multilist.map((item, index) => {
              if (item.media_type === "person") {
                return (
                  <Link key={item.id + index} to={`/actor/${item.id}`}>
                    <li>
                      <img
                        className="img-autocomplete"
                        width="100"
                        height="150"
                        src={
                          item.profile_path
                            ? posterUrl(item.profile_path)
                            : placeholder
                        }
                        alt={item.name}
                      />
                      {item.name} (actor)
                    </li>
                  </Link>
                );
              } else if (item.media_type === "movie") {
                return (
                  <Link key={item.id + index} to={`/movie/${item.id}`}>
                    <li>
                      <img
                        className="img-autocomplete"
                        width="100"
                        height="150"
                        src={
                          item.poster_path
                            ? posterUrl(item.poster_path)
                            : placeholder
                        }
                        alt={item.title}
                      />
                      {item.title} (movie)
                    </li>
                  </Link>
                );
              } else {
                return null;
              }
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default SearchBox;
