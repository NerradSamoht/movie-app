import React from "react";
import { Link } from "@reach/router";
import { creditsUrl, posterUrl } from "../../js/tmdb";
import placeholder from "../../assets/placeholder.png";
import unqid from "uniqid";

class Cast extends React.Component {
  state = {
    cast: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getData();
    }
  }

  getData() {
    const url = creditsUrl(this.props.id);

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
            <div key={unqid()}>
              <Link to={`/actor/${actor.id}`}>
                <img
                  className="poster"
                  src={
                    actor.profile_path
                      ? posterUrl(actor.profile_path)
                      : placeholder
                  }
                  alt={actor.name}
                />
                <h3>{actor.name}</h3>
              </Link>
              <dl>
                <dt className="sr">Character:</dt>
                <dd>{actor.character}</dd>
              </dl>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Cast;
