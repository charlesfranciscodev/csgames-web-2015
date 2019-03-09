import { userConstants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const userActions = {
  login,
  logout,
  register
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password)
      .then(
        user => {
          dispatch(success(user));
          history.push("/");
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
  };

  function request(user) {
    return {
      type: userConstants.LOGIN_REQUEST,
      user
    }
  }

  function success(user) {
    return {
      type: userConstants.LOGIN_SUCCESS,
      user
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGIN_FAILURE,
      error
    }
  }
}

function logout() {
  return dispatch => {
    dispatch(request());

    userService.logout()
    .then(
      data => {
        dispatch(success(data));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return {
      type: userConstants.LOGOUT_REQUEST
    }
  }

  function success(data) {
    return {
      type: userConstants.LOGOUT_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: userConstants.LOGOUT_FAILURE,
      error
    }
  }
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user)
      .then(
        data => {
          dispatch(success(data));
          history.push("/login");
          dispatch(alertActions.success("Registration successful"));
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error));
        }
      );
  };

  function request(user) {
    return {
      type: userConstants.REGISTER_REQUEST,
      user
    }
  }

  function success(data) {
    return {
      type: userConstants.REGISTER_SUCCESS,
      data
    }
  }

  function failure(error) {
    return {
      type: userConstants.REGISTER_FAILURE,
      error
    }
  }
}
