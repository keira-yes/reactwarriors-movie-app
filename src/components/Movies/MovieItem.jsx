import React from 'react';
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteSelected: false,
      watchlistSelected: false
    }
  }

  // toggleFavorite = () => {
  //   const {user, session_id, item} = this.props;
  //   const {favoriteSelected} = this.state;
  //   this.setState({
  //     favoriteSelected: !favoriteSelected
  //   });
  //   CallApi.post(`/account/${user.id}/favorite`, {
  //     params: {
  //       session_id: session_id
  //     },
  //     body: {
  //       media_type: "movie",
  //       media_id: item.id,
  //       favorite: favoriteSelected
  //     }
  //   })
  // };

  addToFavorite = () => {
    const {user, session_id, item, getFavoriteMovies} = this.props;
    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: true
      }
    }).then(() => getFavoriteMovies(user, session_id));
    console.log('Добавлен в избранные')
  };

  removeFromFavorite = () => {
    const {user, session_id, item, getFavoriteMovies} = this.props;
    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: false
      }
    }).then(() => getFavoriteMovies(user, session_id));
    console.log('Удален из избранных')
  };

  // toggleWatchlistSelected = () => {
  //   this.setState(prevState => ({
  //     watchlistSelected: !prevState.watchlistSelected
  //   }))
  // };

  // componentDidMount() {
  //   const {favoriteList, item} = this.props;
  //   console.log(favoriteList)
  //   if (favoriteList.indexOf(item.id) !== -1) {
  //     this.setState({
  //       favoriteSelected: true
  //     })
  //   }
  // }

  render() {
    const {item, favoriteList} = this.props;
    // const {favoriteSelected, watchlistSelected} = this.state;
    return (
      <>
        <div className="card" style={{ width: "100%" }}>
          <img
            className="card-img-top card-img--height"
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
            alt=""
          />
          <div className="card-body">
            <h6 className="card-title">{item.title}</h6>
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            {favoriteList.indexOf(item.id) !== -1 ?
              <span onClick={this.addToFavorite}><StarBorder/></span> :
              <span onClick={this.removeFromFavorite}><Star/></span>
            }
            {/*<span onClick={this.toggleFavorite}>*/}
            {/*  {favoriteSelected ? <Star/> : <StarBorder/>}*/}
            {/*</span>*/}
            {/*<span onClick={this.toggleWatchlistSelected}>*/}
            {/*  {watchlistSelected ? <Bookmark/> : <BookmarkBorder/>}*/}
            {/*</span>*/}
          </div>
        </div>
      </>
    );
  }
}

export default AppContextHOC(MovieItem);
