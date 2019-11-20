import React from 'react';
import Input from '../../UIComponents/Input';

export default class LoginForm extends React.Component {

  render() {
    return (
      <form>
        <h3 className="text-center">Авторизация</h3>
        <Input
          id="email"
          label="Логин"
          type="email"
          placeholder="Введите логин"
        />
        <Input
          id="password"
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
        />
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Отправить</button>
        </div>
      </form>
    );
  }
}