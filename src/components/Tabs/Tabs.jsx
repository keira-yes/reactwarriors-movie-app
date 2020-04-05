import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import MovieDetail from './MovieDetail';

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    }
  }

  toggleActive = (tab) => {
    if (this.state.activeTab !== tab) this.setState({activeTab: tab});
  };

  render() {
    const {activeTab} = this.state;
    const {movie} = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink onClick={() => this.toggleActive('1')}>Детали</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.toggleActive('2')}>Видео</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => this.toggleActive('3')}>Актеры</NavLink>
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
            <div className="row">
              <div className="col-sm-6">
                123
              </div>
              <div className="col-sm-6">
                123
              </div>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="row">
              <div className="col-sm-12">
                <h4>Tab 3 Contents</h4>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default Tabs;