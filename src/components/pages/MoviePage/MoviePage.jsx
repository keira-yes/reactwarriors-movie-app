import React from 'react';
import CallApi from "../../../api/api";

export default class MoviePage extends React.Component {
  componentDidMount() {
    CallApi.get(`/movie/${this.props.match.params.movie_id}`)
      .then(data => console.log(data))
  }

  render() {
    return <div>Go to Movie page = {this.props.match.params.movie_name}</div>
  }
}