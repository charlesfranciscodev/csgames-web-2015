import React, { Component } from "react";
import Message from "./Message";

import SocketContext from "../socket-context";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      content: "",
      error: ""
    };
    this.getUser = this.getMessages.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  componentDidMount() {
    this.getMessages();

    this.props.socket.on("message_from_server", this.handleNewMessage);
  }

  handleNewMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  getMessages() {
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

  handlePost() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let payload = {
      "fromUserId": currentUser.userId,
      "content": this.state.content
    }
    if (payload.fromUserId && payload.content) {
      this.props.socket.emit("message_from_user", payload);
    }
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
                      <img src={currentUser.pictureUrl} alt={currentUser.name} />
                    </p>
                  </figure>

                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="textarea"
                          placeholder="Write your message..."
                          name="content"
                          value={this.state.content}
                          onChange={this.onChange}/>
                      </p>
                    </div>
                    <nav className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <button onClick={this.handlePost} className="button is-info">Post</button>
                        </div>
                      </div>
                    </nav>
                  </div>
                  </article>
                </div>
              </section>
            }
            </div>
        )}
      </div>
    );
  }
}

const MessagesWithSocket = props => (
  <SocketContext.Consumer>
    {socket => <Messages {...props} socket={socket} />}
  </SocketContext.Consumer>
)
  
export default MessagesWithSocket;
