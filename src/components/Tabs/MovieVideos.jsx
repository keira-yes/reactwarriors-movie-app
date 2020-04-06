import React from 'react';
import CallApi from "../../api/api";

class MovieVideos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieVideos: []
    }
  }

  componentDidMount() {
    const {movie_id} = this.props;
    CallApi.get(`/movie/${movie_id}/videos`)
      .then(data => this.setState({movieVideos: data.results}))
  }

  render() {
    const {movieVideos} = this.state;
    return(
      <>
        {movieVideos.map(item => {
          return <div className="col-4 mb-5" key={item.id}>
            <p>{item.name}</p>
            <iframe width="100%" height="auto" src={`https://www.youtube.com/embed/${item.key}`} frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen title={item.name}/>
          </div>
        })}
      </>
    )
  }
}

export default MovieVideos;