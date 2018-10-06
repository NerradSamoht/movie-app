import React from "react";
import { navigate } from "@reach/router";
import Credits from "../../components/Credits/Credits";
import placeholder from "../../assets/placeholder.png";
import { personUrl, posterUrl } from "../../js/tmdb";
import { getAge } from "../../js/helper";
import "./actor.scss";

class Actor extends React.Component {
  state = {
    image: "",
    biography: "",
    dob: "",
    deathday: null,
    name: "",
    placeOfBirth: "",
    loading: true
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getData();
    }
  }

  getData() {
    const url = personUrl(this.props.id);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
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

    const { name, dob, placeOfBirth, biography, image } = this.state;
    const age = getAge(dob);

    return (
      <div className="actor-page">
        <article className="container">
          <div className="description">
            <h1>{name}</h1>
            <img
              className="poster"
              src={image ? posterUrl(image) : placeholder}
              width="185"
              height="278"
              alt={name}
            />
            {age ? <p>Age: {age}</p> : null}
            {dob ? <p>Date of birth: {dob}</p> : null}
            {placeOfBirth ? <p>Place of birth: {placeOfBirth}</p> : null}
            <p>{biography}</p>
          </div>
          <Credits id={this.props.id} dob={dob} />
        </article>
      </div>
    );
  }
}

export default Actor;
