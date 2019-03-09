export const userService = {
  login,
  logout,
  register
}

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  }

  const url = `${process.env.REACT_APP_SERVICE_URL}/login`;
  return fetch(url, requestOptions)
  .then(handleResponse)
  .then(data => {
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  });
}

function logout() {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
  }

  const url = `${process.env.REACT_APP_SERVICE_URL}/logout`;
  return fetch(url, requestOptions)
  .then(handleResponse)
  .then(data => {
    localStorage.removeItem("user");
    return data;
  });
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(user)
  }

  const url = `${process.env.REACT_APP_SERVICE_URL}/register`;
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.json().then(data => {
    if (!response.ok) {
      return Promise.reject(data.message);
    }
    return data;
  });
}
