import React from "react";
import { Link } from "@reach/router";
import { key, posterUrl, personUrl } from "../js/tmdb";
import placeholder from "../assets/placeholder.png";

class Credits extends React.Component {
  state = {
    movies: []
  };

  componentDidMount() {
    const url = `${personUrl}/${this.props.id}/credits?api_key=${key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.cast
        });
      });
  }

  render() {
    return (
      <div className="filmography">
        <h2>Filmography</h2>
        {this.state.movies.map(movie => {
          return (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <p>{movie.release_date ? movie.release_date : "unknown"}</p>
                <img
                  className="poster"
                  src={
                    movie.poster_path
                      ? posterUrl + movie.poster_path
                      : placeholder
                  }
                  width="185"
                  height="278"
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{movie.character}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Credits;
