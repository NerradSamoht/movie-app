import React from "react";
import { posterUrl } from "../../js/tmdb";
import { Link } from "@reach/router";
import placeholder from "../../assets/placeholder.png";
import "./searchBox.scss";
import unqid from "uniqid";

class SearchBox extends React.Component {
  render() {
    const { multilist, text } = this.props;

    return (
      <div className="search">
        <label className="sr" htmlFor="search">
          Search:
        </label>
        <input
          onChange={this.props.handleSearchChange}
          id="search"
          type="search"
          value={this.props.text}
          placeholder="Enter actor or movie"
          list="multilist"
        />

        {multilist &&
          text && (
            <ul id="multilist">
              {multilist.map((item, index) => {
                if (item.media_type === "person") {
                  return (
                    <li key={unqid()}>
                      <Link
                        to={`/actor/${item.id}`}
                        dataset-id={item.id}
                        onClick={this.props.handleSearchClick}
                      >
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
                      </Link>
                    </li>
                  );
                } else if (item.media_type === "movie") {
                  return (
                    <li key={unqid()}>
                      <Link
                        to={`/movie/${item.id}`}
                        dataset-id={item.id}
                        onClick={this.props.handleSearchClick}
                      >
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
                      </Link>
                    </li>
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
