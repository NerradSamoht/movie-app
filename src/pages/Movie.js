import React from "react";
import { navigate } from "@reach/router";
import { key, posterUrl, baseUrl, backdropUrl } from "../js/tmdb";
import Cast from "../components/Cast";
import SearchBox from "../components/SearchBox";
import placeholder from "../assets/placeholder.png";

class Movie extends React.Component {
  state = {
    loading: true,
    id: "",
    genres: [],
    image: "",
    overview: "",
    poster: "",
    releaseDate: "",
    runtime: "",
    tagline: "",
    title: ""
  };

  componentDidMount() {
    const url = `${baseUrl}${this.props.id}?api_key=${key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const genres = data.genres.map(genre => genre.name);
        this.setState({
          id: data.id,
          genres,
          image: data.poster_path,
          overview: data.overview,
          poster: data.backdrop_path,
          releaseDate: data.release_date,
          runtime: data.runtime,
          tagline: data.tagline,
          title: data.title,
          loading: false
        });
      })
      .catch(() => {
        navigate("/");
      });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const {
      id,
      genres,
      image,
      overview,
      poster,
      releaseDate,
      runtime,
      tagline,
      title
    } = this.state;
    return (
      <article>
        <SearchBox />
        {poster && (
          <div>
            <img
              className="backdrop"
              src={backdropUrl + poster}
              width="1280"
              alt={title}
            />
          </div>
        )}
        <div className="container">
          <div className="description">
            <img
              className="poster"
              src={image ? posterUrl + image : placeholder}
              width="185"
              height="278"
              alt={title}
            />
            <h1>{title}</h1>
            <p>{tagline}</p>
            <dl>
              <dt>Release date:</dt>
              <dd>{releaseDate}</dd>
              <dt>Runtime:</dt>
              <dd>{runtime}</dd>
              <dt>Genres:</dt>
              <dd>{genres.join(", ")}</dd>
            </dl>
            <p>{overview}</p>
          </div>
          <Cast id={id} />
        </div>
      </article>
    );
  }
}

export default Movie;
