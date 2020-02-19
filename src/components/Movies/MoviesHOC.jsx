import React from "react";
import CallApi from "../../api/api";
import {Loader} from '../Loader';

export default ComponentArg =>
  class MoviesHOC extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        movies: [],
        isLoading: true
      };
    }

    getMovies = (filters, page) => {
      const {sort_by, primary_release_year, with_genres} = filters;
      const queryStringParams = {
        language: "ru-RU",
        sort_by,
        primary_release_year,
        page,
        with_genres: with_genres.join(',')
      };
      CallApi.get("/discover/movie", {
        params: queryStringParams
      }).then(data => {
        this.setState({
          movies: data.results,
          isLoading: false
        });
        this.props.onChangeTotalPages(data.total_pages);
        });
    };

    componentDidMount() {
      const {filters, page} = this.props;
      this.getMovies(filters, page);
    }

    componentDidUpdate(prevProps) {
      const {
        filters,
        onChangePage,
        page
      } = this.props;
      if (filters !== prevProps.filters) {
        this.setState({
          isLoading: true
        });
        onChangePage(1);
        this.getMovies(filters, 1);
      }
      if (page !== prevProps.page) {
        this.setState({
          isLoading: true
        });
        this.getMovies(filters, page);
      }
    }

    render() {
      const {movies, isLoading} = this.state;
      return (
        <div className="row">
          {isLoading ? <Loader/> :
            <ComponentArg movies={movies}/>
          }
        </div>
      );
    }
  }
