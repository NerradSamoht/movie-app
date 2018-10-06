import React from "react";
import { Link } from "@reach/router";
import { filmographyUrl, posterUrl } from "../../js/tmdb";
import placeholder from "../assets/placeholder.png";
import { calculateAge } from "../../js/helper";
import { sortBy } from "underscore";
import unqid from "uniqid";

class Credits extends React.Component {
  state = {
    movies: [],
    displayAge: false
  };

  toggleDisplayAge = () => {
    this.setState({ displayAge: !this.state.displayAge });
  };

  componentDidMount() {
    const url = filmographyUrl(this.props.id);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.cast
        });
      });
  }

  render() {
    let { movies } = this.state;
    movies = sortBy(movies, "release_date").reverse();

    return (
      <div className="filmography">
        <h2>Filmography</h2>
        <button onClick={this.toggleDisplayAge}>Display Age</button>
        <div className="movie-list">
          {movies.map(movie => {
            return (
              <div key={unqid()}>
                {this.state.displayAge &&
                  movie.release_date && (
                    <p className="movie-age">
                      {calculateAge(this.props.dob, movie.release_date)}
                    </p>
                  )}
                <Link to={`/movie/${movie.id}`}>
                  <img
                    className="poster"
                    src={
                      movie.poster_path
                        ? posterUrl(movie.poster_path)
                        : placeholder
                    }
                    width="185"
                    height="278"
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </Link>
                <dl>
                  <dt className="sr">Character:</dt>
                  <dd>{movie.character}</dd>
                  <dt className="sr">Year released:</dt>
                  <dd>
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : "Not specified"}
                  </dd>
                </dl>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Credits;
