import React, { Component } from "react";

import { connect } from "react-redux";
import { userActions } from "../actions";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      allTags: [], // API
      email: "",
      name: "",
      birthdate: "",
      gender: "",
      interestedIn: "",
      description: "",
      pictureURL: "",
      password: "",
      tags: [],
      submitted: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const urlTags = `${process.env.REACT_APP_SERVICE_URL}/tags`;
    fetch(urlTags)
    .then(response => response.json())
    .then(data => this.setState({allTags: data}));
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSelectChange(e) {
    let options = e.target.options;
    let array = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        array.push(options[i].value);
      }
    }
    this.setState({
      tags: array
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });

    const user = {
      email: this.state.email,
      name: this.state.name,
      birthdate: this.state.birthdate,
      gender: this.state.gender,
      interestedIn: this.state.interestedIn,
      description: this.state.description,
      pictureURL: this.state.pictureURL,
      password: this.state.password,
      tags: this.state.tags
    };

    const { dispatch } = this.props;
    if (
      user.email && user.name && user.birthdate && user.gender &&
      user.interestedIn && user.description && user.pictureURL && user.password &&
      user.tags.length
    ) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { allTags, email, name, birthdate, gender, interestedIn, description, pictureURL, password, submitted } = this.state;

    const tagValues = allTags.map((tag) =>
      <option key={tag.tagId} value={tag.tagId}>{tag.name}</option>
    )

    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <form onSubmit={this.handleSubmit}>
                <h1 className="title has-text-info">
                  Create an Account
                </h1>

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
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </p>
                  {(submitted && !name) && 
                    <p className="help is-danger">Please enter a name</p>
                  }
                </div>

                <div className="field">
                  <label className="label">Birthdate</label>
                  <div className="control">
                    <input
                      className="input"
                      type="date"
                      name="birthdate"
                      value={birthdate}
                      onChange={this.onChange}/>
                  </div>
                  {(submitted && !birthdate) && 
                    <p className="help is-danger">Please enter a birthdate</p>
                  }
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      maxLength="1"
                      placeholder="Gender"
                      name="gender"
                      value={gender}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-transgender"></i>
                    </span>
                  </p>
                  {(submitted && !gender) && 
                    <p className="help is-danger">Please enter a gender</p>
                  }
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      maxLength="1"
                      placeholder="Interested In"
                      name="interestedIn"
                      value={interestedIn}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-transgender"></i>
                    </span>
                  </p>
                  {(submitted && !interestedIn) && 
                    <p className="help is-danger">Please enter what you're interested in</p>
                  }
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Description"
                      name="description"
                      value={description}
                      onChange={this.onChange}/>
                  </div>
                  {(submitted && !description) && 
                    <p className="help is-danger">Please enter a description</p>
                  }
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Picture URL"
                      name="pictureURL"
                      value={pictureURL}
                      onChange={this.onChange}/>
                    <span className="icon is-small is-left">
                      <i className="fas fa-user-circle"></i>
                    </span>
                  </p>
                  {(submitted && !pictureURL) && 
                    <p className="help is-danger">Please enter a picture URL</p>
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
                  <label className="label">Tags</label>
                  <div className="field is-narrow">
                    <div className="control is-expanded">
                      <div className="select is-fullwidth is-multiple">
                        <select
                        multiple
                        size={tagValues.length}
                        name="tags"
                        onChange={this.onSelectChange}>
                          { tagValues }
                        </select>
                      </div>
                    </div>
                    {(submitted && !this.state.tags.length) &&
                      <p className="help is-danger">Please pick at least one tag</p>
                    }
                  </div>
                </div>

                <div className="field">
                  <p className="control">
                    <button
                    className="button is-success"
                    type="submit">
                      Register
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
  const { registring } = state.authentication;
  return {
    registring
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};
