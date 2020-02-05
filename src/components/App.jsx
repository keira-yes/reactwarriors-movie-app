import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import {Header} from './Header/Header';
import {API_KEY_3, API_URL, fetchAPI} from "../api/api";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      session_id: null,
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2019',
        with_genres: []
      },
      page: 1,
      total_pages: ''
    }
  }

  updateUser = (user) => {
    this.setState({
      user
    })
  };

  updateSessionId = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000
    });
    this.setState({
      session_id
    })
  };

  onChangePage = (page) => {
    this.setState({
      page
    });
  };

  onChangeTotalPages = (value) => {
    this.setState({
      total_pages: value
    })
  };

  onReset = () => {
    this.setState({
      filters: {
        sort_by: 'popularity.desc',
        primary_release_year: '2019',
        with_genres: []
      },
      page: 1,
      total_pages: ''
    })
  };

  onChangeFilters = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value
      }
    }));
  };

  componentDidMount() {
    const session_id = cookies.get("session_id");
    if(session_id) {
      fetchAPI(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
        .then(user => {
          this.updateUser(user);
        })
    }
  }

  render() {
    const {filters, page, total_pages, user} = this.state;

    return (
      <AppContext.Provider value={{
        user: user,
        updateUser: this.updateUser,
        updateSessionId: this.updateSessionId
      }}>
        <>
          <Header
            user={user}
            updateUser={this.updateUser}
            updateSessionId={this.updateSessionId}
          />
          <div className="container">
            <div className="row mt-4">
              <div className="col-4">
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <h3>Фильтры:</h3>
                    <Filters
                      filters={filters}
                      page={page}
                      total_pages={total_pages}
                      onReset={this.onReset}
                      onChangeFilters={this.onChangeFilters}
                      onChangePage={this.onChangePage}
                    />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <MoviesList
                  filters={filters}
                  page={page}
                  onChangeTotalPages={this.onChangeTotalPages}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          </div>
        </>
      </AppContext.Provider>
    );
  }
}
