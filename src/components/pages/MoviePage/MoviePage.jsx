import React from 'react';
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import FavoriteItem from '../../Movies/FavoriteItem';
import WatchListItem from '../../Movies/WatchListItem';
import Tabs from '../../Tabs/Tabs';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: {}
    }
  }

  getReleaseYear = (date) => {
    return new Date(date).getFullYear();
  };

  componentDidMount() {
    const {movie_id} = this.props.match.params;
    CallApi.get(`/movie/${movie_id}`, {
      params: {
        language: "ru-RU"
      }
    })
      .then(data => this.setState({movie: data}))
  }

  render() {
    const {movie, movie: {poster_path, title, release_date, vote_average, budget, genres, overview}} = this.state;
    const {movie_id} = this.props.match.params;

    return (
      <div className='container'>
        <div className="row mt-5">
          <div className="col-4">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
          </div>
          <div className="col-8">
            <h1>{title} {release_date && `(${this.getReleaseYear(release_date)})`}</h1>
            <ul className="list-group list-group-horizontal-sm mt-3">
              <li className="list-group-item list-group-item-secondary">рейтинг {vote_average}</li>
              <li className="list-group-item list-group-item-success">бюджет ${budget}</li>
              <li className="list-group-item list-group-item-danger">
                {genres && genres.map(item => <span key={item.id} className="list-item">{item.name}</span>)}
              </li>
            </ul>
            <div className="mt-4">{overview}</div>
            <div className="mt-4">
              <FavoriteItem itemId={movie_id}/>
              <WatchListItem itemId={movie_id}/>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <Tabs movie={movie}/>
          </div>
        </div>
      </div>
    )
  }
}

export default AppContextHOC(MoviePage);