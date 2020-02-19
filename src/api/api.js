import queryString from "query-string";

export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "0e66e3cd5d8c014d6e406d8aba055a88";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTY2ZTNjZDVkOGMwMTRkNmU0MDZkOGFiYTA1NWE4OCIsInN1YiI6IjVkODFmYTg2ZDM0ZWIzMDAyNDUwMWU1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u-xDPzk-X949TUZrfWMmG1O78AwY50Ld3EG1UzMmOvY";

export const fetchAPI = (url, options = {}) => {
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

export default class CallApi {

  static get(url, options = {}) {
    const { params = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchAPI(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        mode: "cors",
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }

  static post(url, options = {}) {
    const { params = {}, body = {} } = options;
    const queryStringParams = {
      api_key: API_KEY_3,
      ...params
    };
    return fetchAPI(
      `${API_URL}${url}?${queryString.stringify(queryStringParams)}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
  }
};