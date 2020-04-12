import React from 'react';
import { Table } from 'reactstrap';

const MovieDetail = ({ movieDetail }) => {
  const {
    status,
    release_date,
    runtime,
    original_language,
    production_countries,
    budget,
    revenue,
    production_companies,
    genres
  } = movieDetail;

  return (
    <Table>
      <tbody>
      <tr>
        <td>Статус</td>
        <td>{status}</td>
      </tr>
      <tr>
        <td>Дата выхода</td>
        <td>{release_date}</td>
      </tr>
      <tr>
        <td>Продолжительность, мин</td>
        <td>{runtime}</td>
      </tr>
      <tr>
        <td>Язык оригинала</td>
        <td>{original_language}</td>
      </tr>
      <tr>
        <td>Страна</td>
        <td className="badge-list">
          {production_countries && production_countries.map((item, index) => {
            return <div key={index} className="badge badge-pill badge-secondary">
              {item.name}
            </div>
            }
          )}
        </td>
      </tr>
      <tr>
        <td>Бюджет</td>
        <td>${budget}</td>
      </tr>
      <tr>
        <td>Сборы</td>
        <td>${revenue}</td>
      </tr>
      <tr>
        <td>Компания</td>
        <td className="badge-list">
          {production_companies && production_companies.map((item) => {
            return <div key={item.id} className="badge badge-pill badge-secondary">
              {item.name}
            </div>
            }
          )}
        </td>
      </tr>
      <tr>
        <td>Жанр</td>
        <td className="badge-list">
          {genres && genres.map((item) => {
            return <div key={item.id} className="badge badge-pill badge-secondary">
              {item.name}
            </div>
            }
          )}
        </td>
      </tr>
      </tbody>
    </Table>
  )
};

export default MovieDetail;