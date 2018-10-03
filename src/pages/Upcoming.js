import React from "react";
import { Link } from "@reach/router";
import { upcomingUrl, posterUrl, backdropUrl } from "../js/tmdb";
import SearchBox from "../components/SearchBox";

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
      <div className="container upcoming-page">
        <SearchBox />
        <h1>Upcoming Movies</h1>
        <div className="grid">
          {this.state.movies.map(movie => {
            return (
              <article key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <div className="movie-header">
                    <img
                      className="backdrop"
                      width="398"
                      height="224"
                      src={
                        movie.backdrop_path
                          ? backdropUrl(movie.backdrop_path)
                          : "/placeholder-backdrop.png"
                      }
                      alt={movie.title}
                    />
                    <img
                      className="poster"
                      width="80"
                      height="120"
                      src={
                        movie.poster_path
                          ? posterUrl(movie.poster_path)
                          : "/placeholder.png"
                      }
                      alt={movie.title}
                    />
                  </div>
                  <h2>{movie.title}</h2>
                  <dl>
                    <dt>Release date:</dt>
                    <dd>{movie.release_date}</dd>
                  </dl>
                  <div className="overview">
                    <h3 className="sr">Overview:</h3>
                    <p>{movie.overview}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Upcoming;
