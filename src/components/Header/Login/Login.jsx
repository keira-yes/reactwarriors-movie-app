import React from 'react';
import { API_URL, API_KEY_3 } from "../../../api/api";

export default class Login extends React.Component {

  sendPromises = () => {
    fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(response => response.json())
      .then(data =>
        fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              username: "keira.kirillova",
              password: "9431505",
              request_token: data.request_token
            })
          }
        )
          .then(response => response.json())
          .then(data =>
            fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  request_token: data.request_token
                })
              }
            )
              .then(response => response.json())
              .then(data => console.log("session", data))
          )
      )
  };

  render() {

    return (
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={this.sendPromises}
      >
        Login
      </button>
    )
  }
}