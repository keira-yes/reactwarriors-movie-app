import React from 'react';
import CallApi from "../../../api/api";
import AppContextHOC from "../../HOC/AppContextHOC";
import TabsNavigation from './Tabs/TabsNavigation';
import {Loader} from '../../UIComponents/Loader';
import MovieInfo from "./MovieInfo";
import {Nav, TabContent, TabPane} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import MovieDetail from "./Tabs/MovieDetail";
import MovieVideos from "./Tabs/MovieVideos";
import MovieCredits from "./Tabs/MovieCredits";

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
    const {id} = this.props.match.params;
    this.getMovieDetail(id);
    this.getMovieVideos(id);
    this.getMovieCredits(id);
  }

  render() {
    const {
      isLoading,
      movieDetail,
      movieVideos,
      movieCredits
    } = this.state;

    const {id} = this.props.match.params;

    return (
      <>
        {isLoading ? <Loader /> :
          <div className="container">
            <div className="row mt-5">
              <MovieInfo
                movieDetail={movieDetail}
                movie_id={id}
              />
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <Nav tabs>
                  <TabsNavigation />
                </Nav>
                <TabContent>
                  <TabPane>
                    <div className="row mt-5 mb-5">
                      <Switch>
                        <Route exact path="/movie/:id/detail"><MovieDetail movieDetail={movieDetail}/></Route>
                        <Route path="/movie/:id/videos"><MovieVideos movieVideos={movieVideos}/></Route>
                        <Route path="/movie/:id/credits"><MovieCredits movieCredits={movieCredits}/></Route>
                      </Switch>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        }
      </>
    )
  }
}

export default AppContextHOC(MoviePage);