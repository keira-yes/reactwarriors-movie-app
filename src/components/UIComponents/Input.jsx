import React from 'react';

export default class Input extends React.Component {

  render() {
    const {id, label, type, placeholder} = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
        />
      </div>
    );
  }
}