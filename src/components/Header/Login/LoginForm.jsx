import React from 'react';
import Input from '../../UIComponents/Input';
import {API_KEY_3, API_URL} from "../../../api/api";

export default class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      errors: {}
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        [name]: null
      }
    }))
  };

  onValidate = () => {
    const {login, password} = this.state;
    const errors = {};

    if (login.length === 0) errors.login = "Поле обязательно к заполнению!";
    if (password.length === 0) errors.password = "Поле обязательно к заполнению!";
    return errors;
  };

  onBlurValidate = () => {
    const errors = this.onValidate();
    if(Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const {login, password} = this.state;

    const errors = this.onValidate();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    } else {

    }

    const fetchAPI = (url, options = {}) => {
      return new Promise((resolve, reject) => {
        fetch(url, options)
          .then(response => {
            if(response.status < 400) {
              return response.json();
            } else {
              throw response;
            }

          }, error => console.log(error)
          )
          .then(data => {
            resolve(data);
          })
          .catch(response => {
            response.json().then(error => {
              reject(error);
            })
          })
      })
    };

    if(Object.keys(errors).length > 0) {
      console.log("Errors! Don't submit!");
    } else {
      try {
        const data = await fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`);
        const result = await fetchAPI(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              username: {login},
              password: {password},
              request_token: data.request_token
            })
          });
        const {session_id} = await fetchAPI(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: result.request_token
            })
          });
        console.log(session_id);
      } catch(error) {
        console.log("error", error);
      }

      //   fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      //     .then(data => {
      //       return fetchAPI(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
      //         {
      //           method: "POST",
      //           mode: "cors",
      //           headers: {
      //             "content-type": "application/json"
      //           },
      //           body: JSON.stringify({
      //             username: "keira.kirillova",
      //             password: "9431505",
      //             request_token: data.request_token
      //           })
      //         })
      //     })
      //     .then(data => {
      //       return fetchAPI(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
      //     {
      //       method: "POST",
      //       mode: "cors",
      //       headers: {
      //         "content-type": "application/json"
      //       },
      //       body: JSON.stringify({
      //         request_token: data.request_token
      //       })
      //     })
      //     })
      //     .then(data => {
      //       console.log("session", data);
      //     })
      //     .catch(error => {
      //       console.log("error", error);
      //     })
    }
  };

  render() {
    const {login, password, errors} = this.state;

    return (
      <form>
        <h3 className="text-center">Авторизация</h3>
        <Input
          id="login"
          label="Логин"
          type="text"
          name="login"
          value={login}
          placeholder="Введите логин"
          onChange={this.onChange}
          onBlur={this.onBlurValidate}
          error={errors.login}
        />
        <Input
          id="password"
          label="Пароль"
          type="password"
          name="password"
          value={password}
          placeholder="Введите пароль"
          onChange={this.onChange}
          onBlur={this.onBlurValidate}
          error={errors.password}
        />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Отправить
          </button>
        </div>
      </form>
    );
  }
}