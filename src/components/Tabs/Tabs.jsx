import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import MovieDetail from './MovieDetail';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    }
  }

  toggleActiveTab = (tab) => {
    if (this.state.activeTab !== tab) this.setState({activeTab: tab});
  };

  render() {
    const {activeTab} = this.state;
    const {movie, movie_id} = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink onClick={() => this.toggleActiveTab('1')}>Детали</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.toggleActiveTab('2')}>Видео</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.toggleActiveTab('3')}>Актеры</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="row">
              <div className="col-sm-12">
                <MovieDetail movie={movie}/>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="row mt-4 mb-4">
              <MovieVideos movie_id={movie_id}/>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="row mt-4 mb-4">
              <MovieCredits movie_id={movie_id}/>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Tabs;