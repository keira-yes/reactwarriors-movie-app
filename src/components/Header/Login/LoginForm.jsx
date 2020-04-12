import React from 'react';
import Input from '../../UIComponents/Input';
import CallApi from "../../../api/api";
import AppContextHOC from "./../../HOC/AppContextHOC";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      repeatPassword: "",
      errors: {},
      submitting: true
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }))
  };

  onValidate = () => {
    const {login, password, repeatPassword} = this.state;
    const errors = {};

    if (login.length === 0) errors.login = "Поле обязательно к заполнению!";
    if (password.length === 0) errors.password = "Поле обязательно к заполнению!";
    if (repeatPassword !== password) errors.repeatPassword = "Пароли должны совпадать!";
    return errors;
  };

  onBlur = (e) => {
    const {name} = e.target;
    const errors = this.onValidate();
    if(errors[name]) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: errors[name]
        }
      }))
    }
  };

  onSubmit = () => {
    const {login, password} = this.state;
    const {updateUser, updateSessionId, toggleModal} = this.props;

    this.setState({
      submitting: false
    });

    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: login,
            password: password,
            request_token: data.request_token
          }
        })
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        })
      })
      .then(data => {
        updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.setState({
          submitting: true
        }, () => {
          updateUser(user);
          toggleModal();
        });
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: true,
          errors: {
            base: error.status_message
          }
        })
      })
  };

  onLogin = (e) => {
    e.preventDefault();

    const errors = this.onValidate();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {login, password, repeatPassword, errors, submitting} = this.state;

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
          onBlur={this.onBlur}
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
          onBlur={this.onBlur}
          error={errors.password}
        />
        <Input
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          name="repeatPassword"
          value={repeatPassword}
          placeholder="Повторите пароль"
          onChange={this.onChange}
          onBlur={this.onBlur}
          error={errors.repeatPassword}
        />
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onLogin}
            disabled={!submitting}
          >
            Логин
          </button>
        </div>
        {errors.base ? <div className="invalid-feedback text-center">{errors.base}</div> : null}
      </form>
    );
  }
}

export default AppContextHOC(LoginForm);