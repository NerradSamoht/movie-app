import React from "react";

class Movie extends React.Component {
  state = {
    title: "",
    tagline: "",
    releaseDate: "",
    runtime: "",
    genres: [],
    overview: "",
    poster: "",
    image: ""
  };
  render() {
    const {
      title,
      releaseDate,
      runtime,
      genres,
      overview,
      poster,
      image
    } = this.state;
    return (
      <div>
        <div>
          <img src={poster} alt={title} />
        </div>
        <div>
          <img src={image} alt={title} />
          <h1>{title}</h1>
          <p>{tagline}</p>
          <ul>
            <li>{releaseDate}</li>
            <li>{runtime}</li>
            <li>{genres}</li>
          </ul>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}

export default Movie;
