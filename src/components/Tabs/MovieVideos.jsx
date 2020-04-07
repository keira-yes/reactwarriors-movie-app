import React from 'react';

const MovieVideos = ({movieVideos}) => {
  return (
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
  )
};

export default MovieVideos;