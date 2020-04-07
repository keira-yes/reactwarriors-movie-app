import React from 'react';
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import FavoriteItem from '../../Movies/FavoriteItem';
import WatchListItem from '../../Movies/WatchListItem';
import Tabs from '../../Tabs/Tabs';
import {Loader} from '../../UIComponents/Loader';

class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetail: {},
      movieVideos: [],
      movieCredits: [],
      isLoading: true
    }
  }

  getMovieDetail = (id) => {
    CallApi.get(`/movie/${id}`, {
      params: {
        language: "ru-RU"
      }
    })
      .then(data => this.setState({movieDetail: data, isLoading: false}))
  };

  getMovieVideos = (id) => {
    CallApi.get(`/movie/${id}/videos`)
      .then(data => this.setState({movieVideos: data.results}))
  };

  getMovieCredits = (id) => {
    CallApi.get(`/movie/${id}/credits`)
      .then(data => this.setState({movieCredits: data.cast}))
  };

  getReleaseYear = (date) => {
    return new Date(date).getFullYear();
  };

  componentDidMount() {
    const {movie_id} = this.props.match.params;
    this.getMovieDetail(movie_id);
    this.getMovieVideos(movie_id);
    this.getMovieCredits(movie_id);
  }

  render() {
    const {
      isLoading,
      movieDetail,
      movieDetail: {
        poster_path,
        title,
        release_date,
        vote_average,
        budget,
        genres,
        overview
      },
      movieVideos,
      movieCredits
    } = this.state;

    const {movie_id} = this.props.match.params;

    return (
      <>
        {isLoading ? <Loader /> :
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
                <Tabs
                  movie_id={movie_id}
                  movieDetail={movieDetail}
                  movieVideos={movieVideos}
                  movieCredits={movieCredits}
                />
              </div>
            </div>
          </div>
        }
      </>
    )
  }
}

export default AppContextHOC(MoviePage);