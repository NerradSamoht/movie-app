import React from "react";

class Cast extends React.Component {
  state = {
    name: "",
    character: "",
    age: "",
    image: ""
  };
  render() {
    const { name, character, age, image } = this.state;
    return (
      <div>
        <ul>
          <li>
            <img src={image} alt={name} />
          </li>
          <li>{age}</li>
          <li>{name}</li>
          <li>{character}</li>
        </ul>
      </div>
    );
  }
}
export default Cast;
