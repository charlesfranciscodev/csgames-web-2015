import React, { Component } from "react";
import Message from "./Message";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      error: ""
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const url = `${process.env.REACT_APP_SERVICE_URL}/messages`;

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
    .then(data => this.setState({ messages: data }))
    .catch(error => this.setState({ error: error }));
  }

  render() {
    const { messages, error } = this.state;

    const currentUser = JSON.parse(localStorage.getItem("user"));

    return (
      <div>
        { error || messages.length === 0 ? (
          <section className="section">
            <div className="container">
              <article className="message is-danger">
                <div className="message-body">
                  {this.state.error}
                </div>
              </article>
            </div>
          </section>
        ) : (
          // All Messages
          <div>
            <section className="section has-background-grey-lighter">
              <div className="container">
                <h1 className="title has-text-link">Public Chat</h1>
                <div>
                  {messages.map(
                    message => (
                      <Message key={message.messageId} message={message} />
                    )
                  )}
                </div>
              </div>
            </section>

            {currentUser &&
              <section className="section has-background-grey-lighter">
                <div className="container">
                  <article className="media">
                  <figure className="media-left">
                    <p className="image is-32x32">
                      <img src={currentUser.pictureUrl} />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea className="textarea" placeholder="Post your message..."></textarea>
                      </p>
                    </div>
                    <nav className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <a className="button is-info">Post</a>
                        </div>
                      </div>
                    </nav>
                  </div>
                  </article>
                </div>
              </section>
            }
            </div>

          // Post a new message in real time 
        )}
      </div>
    );
  }
}

export default Messages;
