import React from "react";
import moment from "moment";

function UserCard(props) {
  const birthdateString = props.user.birthdate;
  const birthdate = moment.utc(birthdateString);
  const now = moment.utc();
  const age = now.diff(birthdate, "years");

  return (
    <div className="column is-one-quarter-desktop is-half-tablet">
      <div className="card">
        <div className="card-image">
          <figure className="image">
            <img src={props.user.pictureUrl} alt={props.user.name}/>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{props.user.name}</p>
              <p className="subtitle is-6">{props.user.email}</p>
            </div>
          </div>

          <div className="content">
            {props.user.tags.join(", ")}
            <br />
            <span className="icon">
              <i className="fas fa-birthday-cake"></i>
            </span>
            {age}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
