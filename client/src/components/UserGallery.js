import React, { Component } from "react";
import UserCard from "./UserCard"
import { age } from "../helpers/age";

class UserGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [], // API
      allTags: [], // API
      minimumAge: 0,
      maximumAge: 99,
      tags: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.filterUser = this.filterUser.bind(this);
  }

  componentDidMount() {
    const urlUsers = `${process.env.REACT_APP_SERVICE_URL}/users`;
    fetch(urlUsers)
    .then(response => response.json())
    .then(data => this.setState({users: data}));

    const urlTags = `${process.env.REACT_APP_SERVICE_URL}/tags`;
    fetch(urlTags)
    .then(response => response.json())
    .then(data => this.setState({allTags: data}));
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: Number(e.target.value)
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

  filterUser(user, currentUser) {
    const years = age(user);
    if (years < this.state.minimumAge || years > this.state.maximumAge) {
      return false;
    }
    if (!this.state.tags.every(tag => user.tags.indexOf(tag) !== -1)) {
      return false;
    }
    let currentUserMatch = true;
    if (currentUser) {
      currentUserMatch = user.userId !== currentUser.userId && user.gender === currentUser.interestedIn && user.interestedIn === currentUser.gender;
    }
    return currentUserMatch;
  }

  render() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    let users = this.state.users.filter(user => this.filterUser(user, currentUser));
    users.sort(function(userA, userB) {
      var nameA = userA.name.toUpperCase();
      var nameB = userB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    const { allTags } = this.state;

    const tagValues = allTags.map((tag) =>
      <option key={tag.tagId} value={tag.name}>{tag.name}</option>
    )

    return (
      <section className="section">
        <div className="container">
          <h3 className="title is-4">Filters</h3>

          <div className="columns is-centered">
            <div className="column">
              <div className="field">
                <label className="label">Minimum Age</label>
                <div className="control">
                  <input
                  className="input"
                  type="number"
                  name="minimumAge"
                  value={this.state.minimumAge}
                  onChange={this.onChange}/>
                </div>
              </div>

              <div className="field">
                <label className="label">Maximum Age</label>
                <div className="control">
                  <input
                  className="input"
                  type="number"
                  name="maximumAge"
                  value={this.state.maximumAge}
                  onChange={this.onChange}/>
                </div>
              </div>
            </div>

            <div className="field column">
              <label className="label">Tags</label>
              <div className="field is-narrow">
                <div className="control is-expanded">
                  <div className="select is-fullwidth is-multiple">
                    <select
                    multiple
                    size="3"
                    name="tags"
                    onChange={this.onSelectChange}>
                      { tagValues }
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
