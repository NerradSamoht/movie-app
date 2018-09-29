import React from "react";
import { Link } from "@reach/router";
import { upcomingUrl, posterUrl } from "../js/tmdb";
import SearchBox from "../components/SearchBox";
import placeholder from "../assets/placeholder.png";

class Upcoming extends React.Component {
  state = {
    movies: []
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

  render() {
    return (
      <div className="container">
        <SearchBox />
        <h1>Upcoming Movies</h1>
        {this.state.movies.map(movie => {
          return (
            <article key={movie.id}>
              <h2>{movie.title}</h2>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="poster"
                  width="185"
                  height="278"
                  src={
                    movie.poster_path
                      ? posterUrl(movie.poster_path)
                      : placeholder
                  }
                  alt={movie.title}
                />
              </Link>
              <dl>
                <dt>Release date:</dt>
                <dd>{movie.release_date}</dd>
              </dl>
              <div>
                <h3>Overview:</h3>
                <p>{movie.overview}</p>
              </div>
            </article>
          );
        })}
      </div>
    );
  }
}

export default Upcoming;
