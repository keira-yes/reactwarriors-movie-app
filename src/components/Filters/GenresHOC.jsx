import React from 'react';
import CallApi from "../../api/api";

export default ComponentArg =>
  class GenresHOC extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        genres: []
      }
    }

    getGenres = () => {
      CallApi.get("/genre/movie/list", {
        params: {
          language: "ru-Ru"
        }
      }).then(data => {
        this.setState({
          genres: data.genres
        });
      })
    };

    onChangeGenres = (event) => {
      const {with_genres, onChangeFilters} = this.props;
      const updatedGenres = [...with_genres];
      const value = event.target.value;

      if(with_genres.indexOf(value) === -1) {
        updatedGenres.push(value);
        this.isChecked(true);
      } else {
        let index = updatedGenres.indexOf(value);
        updatedGenres.splice(index, 1);
        this.isChecked(false);
      }

      onChangeFilters({
        target: {
          name: "with_genres",
          value: updatedGenres
        }
      })
    };

    isChecked = (result) => {
      return result
    };

    componentDidMount() {
      this.getGenres();
    }

    render() {
      const {genres} = this.state;
      return (
        <ComponentArg
          genres={genres}
          onChangeGenres={this.onChangeGenres}
          isChecked={this.isChecked()}
        />
      )
    }
  };