import React, { Component } from "react";
import UserRating from "./UserRating";
import { age } from "../helpers/age";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      error: "",
      modalIsActive: false,
      stars: 2,
      comment: "",
      submitted: false
    };
    this.getUser = this.getUser.bind(this);
    this.toggleModalIsActive = this.toggleModalIsActive.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.createNewStars = this.createNewStars.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
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

  toggleModalIsActive() {
    this.setState({
      modalIsActive: !this.state.modalIsActive
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onStarClick(value) {
    this.setState({
      stars: value
    });
  }

  createNewStars(stars) {
    let newStars = [];
    for (let i = 1; i <= 5; i++) {
      let icon = (i <= stars ? "fas fa-star fa-2x" : "far fa-star fa-2x");
      let key = icon + ' ' + i;
      newStars.push(
        <span key={key} onClick={() => this.onStarClick(i)} className="icon has-text-warning is-large">
          <i className={icon}></i>
        </span>
      );
    }
    return newStars;
  }

  handlePost() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    this.setState({ submitted: true });

    const rating = {
      fromUserId: currentUser.userId,
      toUserId: this.state.user.userId,
      stars: this.state.stars,
      comment: this.state.comment
    };

    if (rating.fromUserId && rating.toUserId && rating.stars && rating.comment) {
      const url = `${process.env.REACT_APP_SERVICE_URL}/rating`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(rating)
      }

      function handleResponse(response) {
        return response.json().then(data => {
          if (!response.ok) {
            return Promise.reject(data.message);
          }
          return data;
        });
      }

      this.toggleModalIsActive();
  
      fetch(url, requestOptions)
      .then(handleResponse)
      .then(data => this.getUser())
      .catch(error => this.setState({ error: error }));
    }
  }

  render() {
    const { user, stars, comment, submitted} = this.state;
    const years = age(user);

    const currentUser = JSON.parse(localStorage.getItem("user"));

    let averageStars = [];
    for (let i = 0; i < user.averageStars; i++) {
      averageStars.push(
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
              {/* Profile */}
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
                      <p>{averageStars}</p>
                      <div className="content">
                        {user.description}
                      </div>

                      { currentUser && currentUser.userId !== user.userId &&
                        <button onClick={this.toggleModalIsActive} className="button is-danger is-medium modal-button">
                          <span className="icon">
                            <i className="fas fa-star"></i>
                          </span>
                          <span>Rate</span>
                        </button>
                      }

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

              {/* All Ratings */}
              {user.allRatings.map(
                rating => (
                  <UserRating key={rating.fromUser.userId} rating={rating} />
                )
              )}
            </div>
          </section>

          {/* New Rating Modal */}
          <div className="container">
            <div className={"modal " + (this.state.modalIsActive ? "is-active": null)}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Rate {user.name}</p>
                  <button onClick={this.toggleModalIsActive} className="delete" aria-label="close"></button>
                </header>

                <section className="modal-card-body">
                    <form>
                      <div className="field">
                        <p>{this.createNewStars(stars)}</p>
                      </div>
                      <div className="field">
                        <label className="label">Comment</label>
                        <div className="control">
                          <textarea
                            className="textarea"
                            placeholder="Comment"
                            name="comment"
                            value={comment}
                            onChange={this.onChange}/>
                        </div>
                        {(submitted && !comment) && 
                          <p className="help is-danger">Please enter a comment</p>
                        }
                      </div>
                    </form>
                </section>

                <footer className="modal-card-foot">
                  <button onClick={this.handlePost} className="button is-danger">Post</button>
                  <button onClick={this.toggleModalIsActive} className="button">Cancel</button>
                </footer>
              </div>
            </div>
          </div>
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
