import React from 'react';
import no_poster from "../../../../images/no_poster.png";

const MovieCredits = ({movieCredits}) => {
  return (
    <>
      {movieCredits.length > 0 ?
        movieCredits.map(item => {
        return <div className="col-2 mb-3" key={item.cast_id}>
          <div className="card" style={{ width: "100%", height: "100%" }}>
            <img
              height="200"
              style={{width: "100%", maxWidth: "none", objectFit: "cover"}}
              className="card-img-top card-img--height"
              src={item.profile_path ? `https://image.tmdb.org/t/p/w500${item.profile_path}` : no_poster}
              alt={item.name}
            />
            <div className="card-body">
              <h6 className="card-title mb-0">{item.name}</h6>
            </div>
          </div>
        </div>
      }) : <p>К сожалению, информация об актерах отсутствует.</p>
      }
    </>
  )
};

export default MovieCredits;