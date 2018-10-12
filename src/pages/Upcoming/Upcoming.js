import React from "react";
import { Link } from "@reach/router";
import { posterUrl, backdropUrl } from "../../js/tmdb";
import placeholder from "../../assets/placeholder.png";
import placeholderBackdrop from "../../assets/placeholder-backdrop.png";
import "./upcoming.scss";
import unqid from "uniqid";

class Upcoming extends React.Component {
  render() {
    return (
      <div className="container upcoming-page">
        <h1>Upcoming Movies</h1>
        <div className="grid">
          {this.props.movies.map(movie => {
            return (
              <article key={unqid()}>
                <Link to={`/movie/${movie.id}`}>
                  <div className="movie-header">
                    <img
                      className="backdrop"
                      src={
                        movie.backdrop_path
                          ? backdropUrl(movie.backdrop_path)
                          : placeholderBackdrop
                      }
                      alt={movie.title}
                    />
                    <img
                      className="poster"
                      src={
                        movie.poster_path
                          ? posterUrl(movie.poster_path)
                          : placeholder
                      }
                      alt={movie.title}
                    />
                  </div>
                </Link>
                <h2>{movie.title}</h2>
                <div className="content">
                  <dl>
                    <dt>Release date:</dt>
                    <dd>{movie.release_date}</dd>
                  </dl>
                  <div className="overview">
                    <h3 className="sr">Overview:</h3>
                    <p>{movie.overview}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Upcoming;
