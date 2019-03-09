import React, { Component } from "react";

import { connect } from "react-redux";
import { userActions } from "../actions";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      submitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { email, password, submitted } = this.state;

    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                  {(submitted && !email) && 
                    <p className="help is-danger">Please enter an email</p>
                  }
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                  {(submitted && !password) && 
                    <p className="help is-danger">Please enter a password</p>
                  }
                </div>

                <div className="field">
                  <p className="control">
                    <button
                    className="button is-success"
                    type="submit">
                      Log in
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export {connectedLoginPage as LoginPage};
