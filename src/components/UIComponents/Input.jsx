import React from 'react';

export default class Input extends React.Component {

  render() {
    const {id, label, type, name, value, placeholder, onChange, onBlur, error} = this.props;

    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          className={error ? 'form-control invalid' : 'form-control'}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {error ? <div className="invalid-feedback">{error}</div> : null}
      </div>
    );
  }
}