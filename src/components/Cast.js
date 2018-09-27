import React from "react";
import { Link } from "@reach/router";
import { key, posterUrl, baseUrl } from "../js/tmdb";
import placeholder from "../assets/placeholder.png";

class Cast extends React.Component {
  state = {
    cast: []
  };

  componentDidMount() {
    const url = `${baseUrl}${this.props.id}/credits?api_key=${key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          cast: data.cast
        });
      });
  }

  render() {
    return (
      <div className="cast">
        <h2>Cast</h2>
        {this.state.cast.map(actor => {
          return (
            <div key={actor.id}>
              <Link to={`/actor/${actor.id}`}>
                <img
                  className="poster"
                  src={
                    actor.profile_path
                      ? posterUrl + actor.profile_path
                      : placeholder
                  }
                  width="185"
                  height="278"
                  alt={actor.name}
                />
                <h3>{actor.name}</h3>
                <p>{actor.character}</p>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Cast;
