import React from "react";

class Upcoming extends React.Component {
  state = {
    results: "",
    title: "",
    releaseDate: "",
    description: "",
    image: ""
  };

  componentDidMount() {
    const key = "4120175e535d978bf6f3785ea754ffc2";
    const BASE_URL = "https://api.themoviedb.org/3/movie/";
    const URL = `${BASE_URL}upcoming?api_key=${key}&language=en&page=1`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          results: data.results
        });
      });
  }

  render() {
    const { title, releaseDate, description, image } = this.state;
    return (
      <div>
        <h1>Upcoming</h1>
        <h2>{title}</h2>
        <ul>
          <li>
            <img src={image} alt={title} />
          </li>
          <li>{releaseDate}</li>
          <li>{description}</li>
        </ul>
      </div>
    );
  }
}

export default Upcoming;
