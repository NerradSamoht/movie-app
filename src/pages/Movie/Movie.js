import React from "react";
import { navigate } from "@reach/router";
import { movieUrl, backdropUrl, posterUrl } from "../../js/tmdb";
import { calculateRuntime } from "../../js/helper";
import Cast from "../../components/Cast/Cast";
import placeholder from "../../assets/placeholder.png";
import "./movie.scss";

const maxLength = 250;

class Movie extends React.Component {
  state = {
    genres: [],
    image: "",
    extract: "",
    readMore: true,
    overview: "",
    poster: "",
    releaseDate: "",
    runtime: "",
    tagline: "",
    title: "",
    loading: true
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

  handleReadMore = event => {
    event.preventDefault();
    this.setState({ readMore: !this.state.readMore });
  };

  getData() {
    const url = movieUrl(this.props.id);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const genres = data.genres.map(genre => genre.name);
        this.setState({
          genres,
          image: data.poster_path,
          overview: data.overview,
          extract: data.overview.substring(0, maxLength),
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
      return (
        <div className="loading-page">
          <h1>Movie Stars</h1>
          <p>Loading...</p>
        </div>
      );
    }

    const {
      genres,
      image,
      overview,
      poster,
      releaseDate,
      runtime,
      tagline,
      title,
      extract,
      readMore
    } = this.state;

    const bg = poster ? 'url("' + backdropUrl(poster) + '")' : "";

    const bgStyles = {
      backgroundImage: bg,
      backgroundAttachment: "fixed",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };

    return (
      <div style={bgStyles} className="movie-page">
        <article>
          <div className="container">
            <div className="description">
              <h1>{title}</h1>
              <p className="tagline">{tagline}</p>
              <img
                className="poster"
                src={image ? posterUrl(image) : placeholder}
                width="185"
                height="278"
                alt={title}
              />
              <dl>
                <dt>Release date:</dt>
                <dd>{releaseDate ? releaseDate : "unknown"}</dd>
                <dt>Runtime:</dt>
                <dd>{runtime ? calculateRuntime(runtime) : "unknown"}</dd>
                <dt>Genres:</dt>
                <dd>{genres ? genres.join(", ") : "unknown"}</dd>
              </dl>
              {extract.length >= maxLength ? (
                readMore ? (
                  <p>
                    {extract}
                    ...
                    <br />
                    <a href="#" onClick={this.handleReadMore}>
                      Show more
                    </a>
                  </p>
                ) : (
                  <p>
                    {overview} <br />
                    <a href="#" onClick={this.handleReadMore}>
                      Show less
                    </a>
                  </p>
                )
              ) : (
                <p>{overview}</p>
              )}
            </div>
            <Cast id={this.props.id} />
          </div>
        </article>
      </div>
    );
  }
}

export default Movie;
