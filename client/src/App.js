import React, { Component } from "react";
import { NavBar } from "./components/NavBar";
import HomePage from "./components/HomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import UserProfile from "./components/UserProfile";
import Messaging from "./components/Messaging";

import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "./helpers";
import { alertActions } from "./actions";

import SocketContext from "./socket-context";
import * as io from "socket.io-client";

const url = `${process.env.REACT_APP_SERVICE_URL}/messages`;
const socket = io(url);

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
    this.alertButtonClick = this.alertButtonClick.bind(this);
  }

  alertButtonClick() {
    const { dispatch } = this.props;
    dispatch(alertActions.clear());
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <SocketContext.Provider value={socket}>
          <Router history={history}>
            <div>
              <NavBar />

              {alert.message &&
                <div className="container">
                  <div
                  className={`notification + ${alert.type}`}>
                    <button className="delete" onClick={this.alertButtonClick} />
                    { alert.message }
                  </div>
                </div>
              }

              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/user/:userId" component={UserProfile} />
              <Route path="/messages" component={Messaging} />
            </div>
          </Router>
        </SocketContext.Provider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
