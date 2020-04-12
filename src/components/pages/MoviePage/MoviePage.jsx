import React from 'react';
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import Tabs from './Tabs/Tabs';
import {Loader} from '../../UIComponents/Loader';
import MovieInfo from "./MovieInfo";

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
      movieVideos,
      movieCredits
    } = this.state;

    const {movie_id} = this.props.match.params;

    return (
      <>
        {isLoading ? <Loader /> :
          <>
            <MovieInfo
              movieDetail={movieDetail}
              movie_id={movie_id}
            />
          <div className='container'>
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
            </>
        }
      </>
    )
  }
}

export default AppContextHOC(MoviePage);