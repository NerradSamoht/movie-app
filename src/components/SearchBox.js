import React from "react";
import { searchUrl, posterUrl } from "../js/tmdb";
import { Link } from "@reach/router";
import Upcoming from "./Upcoming/Upcoming";
import Movie from "./Movie/Movie";
import Actor from "./Actor/Actor";
import placeholder from "../assets/placeholder.png";
import "./searchBox.scss";

class SearchBox extends React.Component {
  state = {
    id: "",
    text: "",
    multilist: null,
    upcoming: true,
    movie: false,
    actor: false
  };

  handleSearchChange = event => {
    this.setState(
      {
        text: event.target.value
      },
      this.getMultiList
    );
  };

  handleOnClick = event => {
    const type = event.currentTarget.dataset.type;

    this.setState({
      id: event.currentTarget.dataset.id,
      upcoming: type ? false : true,
      movie: type === "movie" ? true : false,
      actor: type === "actor" ? true : false
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
    const { multilist } = this.state;

    return (
      <div>
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
                    <Link
                      key={item.id + index}
                      to={`/actor/${item.id}`}
                      onClick={this.handleOnClick}
                      data-id={item.id}
                      data-type="actor"
                    >
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
                        <p>{item.name}</p>
                        <p>actor</p>
                      </li>
                    </Link>
                  );
                } else if (item.media_type === "movie") {
                  return (
                    <Link
                      key={item.id + index}
                      to={`/movie/${item.id}`}
                      onClick={this.handleOnClick}
                      data-id={item.id}
                      data-type="movie"
                    >
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
                        <p>{item.title}</p>
                        <p>
                          {item.release_date
                            ? item.release_date.substring(0, 4)
                            : "movie"}
                        </p>
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
        {this.state.upcoming && <Upcoming />}
        {this.state.movie && <Movie id={this.state.id} />}
        {this.state.actor && <Actor id={this.state.id} />}
      </div>
    );
  }
}

export default SearchBox;
