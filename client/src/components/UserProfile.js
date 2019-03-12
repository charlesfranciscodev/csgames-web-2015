import React, { Component } from "react";
import { age } from "../helpers/age";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      error: ""
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const url = `${process.env.REACT_APP_SERVICE_URL}/user/${params.userId}`;

    function handleResponse(response) {
      return response.json().then(data => {
        if (!response.ok) {
          return Promise.reject(data.message);
        }
        return data;
      });
    }

    fetch(url)
    .then(handleResponse)
    .then(data => this.setState({ user: data }))
    .catch(error => this.setState({ error: error }));
  }

  render() {
    const user = this.state.user;
    const years = age(user);

    return (
      <div>
      { this.state.user ? (
        <section className="section">
          <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-6 is-parent">
              <article class="tile is-child notification is-info">
                <div class="content">
                  <p class="title">{user.name}, {years} years old</p>
                  <p class="subtitle">
                    Tags: {user.tags.join(", ")}
                  </p>
                  <p class="subtitle">
                    Interested in: {user.interestedIn}
                  </p>
                  <div class="content">
                    {user.description}
                  </div>
                  <a class="button is-danger" href={"mailto:" + user.email}>
                    <span class="icon">
                      <i class="fas fa-envelope"></i>
                    </span>
                    <span>Email</span>
                  </a>
                </div>
              </article>
            </div>

            <div className="tile is-6 is-parent">
              <article className="tile is-child box">
                <figure className="image">
                  <img src={user.pictureUrl} alt={user.name} />
                </figure>
              </article>
            </div>
          </div>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container">
            <article className="message is-danger">
              <div className="message-body">
                {this.state.error}
              </div>
            </article>
          </div>
        </section>
      )}
      </div>
    );
  }
}

export default UserProfile;
