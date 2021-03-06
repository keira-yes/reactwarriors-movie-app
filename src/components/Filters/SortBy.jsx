import React from 'react';
import Select from '../UIComponents/Select';

export default class SortBy extends React.PureComponent {

  render() {
    const {sort_by, onChangeFilters, options} = this.props;
    return (
      <Select
        label="Сортировать по:"
        id="sort_by"
        name="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </Select>
    )
  }
}

SortBy.defaultProps = {
  options: [
    {
      label: 'Популярные по убыванию',
      value: 'popularity.desc'
    },
    {
      label: 'Популярные по возрастанию',
      value: 'popularity.asc'
    },
    {
      label: 'Рейтинг по убыванию',
      value: 'vote_average.desc'
    },
    {
      label: 'Рейтинг по возрастанию',
      value: 'vote_average.asc'
    }
  ]
};