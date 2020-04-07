import React from 'react';
import { Route, Switch, NavLink } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';

const Tabs = ({movie_id, movieDetail, movieVideos, movieCredits}) => {

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink to={`/movie/${movie_id}/detail`} className="nav-link">Детали</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`/movie/${movie_id}/videos`} className="nav-link">Видео</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to={`/movie/${movie_id}/credits`} className="nav-link">Актеры</NavLink>
        </NavItem>
      </Nav>
      <TabContent>
        <TabPane>
          <div className="row mt-5 mb-5">
            <Switch>
              <Route exact path="/movie/:movie_id/detail"><MovieDetail movieDetail={movieDetail}/></Route>
              <Route path="/movie/:movie_id/videos"><MovieVideos movieVideos={movieVideos}/></Route>
              <Route path="/movie/:movie_id/credits"><MovieCredits movieCredits={movieCredits}/></Route>
            </Switch>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tabs;