import React from "react";

class Film extends React.Component {
  state = {
    title: "",
    character: "",
    image: "",
    year: ""
  };
  render() {
    const { title, character, image, year } = this.state;
    return (
      <div>
        <ul>
          <li>{year}</li>
          <li>
            <img src={image} alt={title} />
          </li>
          <li>{title}</li>
          <li>{character}</li>
        </ul>
      </div>
    );
  }
}
export default Film;
