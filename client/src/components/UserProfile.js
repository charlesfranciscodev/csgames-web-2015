import React, { Component } from "react";
import UserRating from "./UserRating";
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

    let stars = [];
    for (let i = 0; i < user.averageStars; i++) {
      stars.push(
        <span key={i} className="icon has-text-warning is-large">
          <i className="fas fa-star fa-2x"></i>
        </span>
      );
    }

    return (
      <div>
      { this.state.user ? (
        <div>
          <section className="section">
            <div className="container">
              <div className="tile is-ancestor">
                <div className="tile is-6 is-parent">
                  <article className="tile is-child notification is-info">
                    <div className="content">
                      <p className="title">{user.name}, {years} years old</p>
                      <p className="subtitle">
                        Tags: {user.tags.join(", ")}
                      </p>
                      <p className="subtitle">
                        Interested in: {user.interestedIn}
                      </p>
                      <p>{stars}</p>
                      <div className="content">
                        {user.description}
                      </div>
                      <a className="button is-danger" href={"mailto:" + user.email}>
                        <span className="icon">
                          <i className="fas fa-envelope"></i>
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

              {user.allRatings.map(
                rating => (
                  <UserRating key={rating.fromUser.userId} rating={rating} />
                )
              )}
            </div>
          </section>
        </div>
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
