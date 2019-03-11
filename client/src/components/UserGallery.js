import React, { Component } from "react";
import UserCard from "./UserCard"

class UserGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_SERVICE_URL}/users`;
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({users: data}));
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let users = this.state.users;
    if (currentUser) {
      users = users.filter(user => user.userId !== currentUser.userId && user.gender === currentUser.interestedIn && user.interestedIn === currentUser.gender);
    }

    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-4">Candidate List</h3>
          <div className="columns is-multiline">
            {users.map(
              user => (
                <UserCard key={user.userId} user={user} />
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default UserGallery;
