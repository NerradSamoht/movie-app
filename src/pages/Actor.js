import React from "react";
import { navigate } from "@reach/router";
import { key, posterUrl, personUrl } from "../js/tmdb";
import Credits from "../components/Credits";
import placeholder from "../assets/placeholder.png";

class Actor extends React.Component {
  state = {
    id: "",
    image: "",
    biography: "",
    dob: "",
    deathday: null,
    name: "",
    placeOfBirth: "",
    loading: true
  };

  componentDidMount() {
    const url = `${personUrl}/${this.props.id}?api_key=${key}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          id: data.id,
          image: posterUrl + data.profile_path,
          biography: data.biography,
          dob: data.birthday,
          deathday: data.deathday,
          name: data.name,
          placeOfBirth: data.place_of_birth,
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

    const { id, name, dob, placeOfBirth, biography, image } = this.state;
    return (
      <article className="container">
        <div className="actor-bio">
          <img
            className="poster"
            src={image ? image : placeholder}
            width="185"
            height="278"
            alt={name}
          />
          <h1>{name}</h1>
          <dl>
            <dt>Date of birth:</dt>
            <dd>{dob}</dd>
            <dt>Place of birth:</dt>
            <dd>{placeOfBirth}</dd>
          </dl>
          <p>{biography}</p>
        </div>
        <Credits id={id} />
      </article>
    );
  }
}

export default Actor;
