import React from 'react';
import CallApi from "../../../../api/api";
import {Loader} from "../../../UIComponents/Loader";

class MovieVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieVideos: [],
      isLoading: true
    }
  }

  getMovieVideos = (id) => {
    CallApi.get(`/movie/${id}/videos`)
      .then(data => this.setState({movieVideos: data.results, isLoading: false}))
  };

  componentDidMount() {
    const {movie_id} = this.props.match.params;
    this.getMovieVideos(movie_id);
  }

  render() {
    const { movieVideos, isLoading } = this.state;

    return (
      <>
        {isLoading ? <Loader /> :
          <>
            {movieVideos.length > 0 ?
              movieVideos.map(item => {
                return <div className="col-4 mb-5" key={item.id}>
                  <iframe width="100%"
                          height="200px"
                          src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen title={item.name}/>
                </div>
              }) : <p>К сожалению, видео отсутствует.</p>
            }
          </>
        }
      </>
    )
  }
}

export default MovieVideos;