import React from "react";

class Actor extends React.Component {
  state = {
    name: "",
    age: "",
    dob: "",
    location: "",
    description: "",
    image: ""
  };
  render() {
    const { name, age, dob, location, description, image } = this.state;
    return (
      <div>
        <img src={image} alt={name} />
        <h1>{name}</h1>
        <ul>
          <li>{age}</li>
          <li>{dob}</li>
          <li>{location}</li>
        </ul>
        <p>{description}</p>
      </div>
    );
  }
}

export default Actor;
