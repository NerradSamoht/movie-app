import React from "react";
import { navigate } from "@reach/router";
import Credits from "../../components/Credits";
import SearchBox from "../../components/SearchBox";
import placeholder from "../../assets/placeholder.png";
import { personUrl, posterUrl } from "../../js/tmdb";
import { getAge } from "../../js/helper";
import "./actor.scss";

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
    const url = personUrl(this.props.id);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          id: data.id,
          image: data.profile_path,
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
      return (
        <div className="loading-page">
          <h1>Movie Stars</h1>
          <p>Loading...</p>
        </div>
      );
    }

    const { id, name, dob, placeOfBirth, biography, image } = this.state;
    const age = getAge(dob);

    return (
      <div className="actor-page">
        <SearchBox />
        <article className="container">
          <div className="description">
            <img
              className="poster"
              src={image ? posterUrl(image) : placeholder}
              width="185"
              height="278"
              alt={name}
            />
            <h1>{name}</h1>
            <dl>
              <dt>Age:</dt>
              <dd>{age}</dd>
              <dt>Date of birth:</dt>
              <dd>{dob}</dd>
              <dt>Place of birth:</dt>
              <dd>{placeOfBirth}</dd>
            </dl>
            <p>{biography}</p>
          </div>
          <Credits id={id} dob={dob} />
        </article>
      </div>
    );
  }
}

export default Actor;
