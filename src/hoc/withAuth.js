import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import * as authActions from "../redux/auth/auth.actions";

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch)
});

export const withAuth = ComponentName => connect(mapStateToProps, mapDispatchToProps)(
  class WithAuth extends React.Component {
    render() {
      console.log(this.props)
      return <ComponentName {...this.props} />
    }
  }
);