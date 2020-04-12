import React from 'react';
import {NavLink} from "react-router-dom";
import {NavItem} from 'reactstrap';

const TabsNavigation = ({movie_id}) => {
  return (
    <>
      <NavItem>
        <NavLink to={`/movie/${movie_id}/detail`} className="nav-link">Детали</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/movie/${movie_id}/videos`} className="nav-link">Видео</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/movie/${movie_id}/credits`} className="nav-link">Актеры</NavLink>
      </NavItem>
    </>
  )
};

export default TabsNavigation;