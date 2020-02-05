import React from 'react';
import {AppContext} from "../App";

export default ComponentArg =>
  class AppContextHOC extends React.Component {
    render() {
      return (
        <AppContext.Consumer>
          {context => <ComponentArg {...this.props} {...context}/>}
        </AppContext.Consumer>
      )
    }
  }