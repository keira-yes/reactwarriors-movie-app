import React from 'react';
import Select from '../UIComponents/Select';

export default class ReleaseYear extends React.Component {

  getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  render() {
    const {primary_release_year, onChangeFilters} = this.props;

    return (
      <Select
        label="Год выпуска:"
        id="primary_release_year"
        name="primary_release_year"
        value={primary_release_year}
        onChange={onChangeFilters}
      >
        {this.getYears().map(item => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Select>
    )
  }
}