import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    };

  render() {
        const {label, id, name, value, onChange, children} = this.props;
        return (
            <div className="form-group">
                <label htmlFor={id}>{label}</label>
                <select
                    className="form-control"
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {children}
                </select>
            </div>
        )
    }
}