import React from "react";
import { age } from "../helpers/age";

function UserCard(props) {
  const years = age(props.user);

  return (
    <div className="column is-one-quarter-desktop is-half-tablet">
      <div className="card">
        <a href={"/user/" + props.user.userId}>
          <div className="card-image">
            <figure className="image">
              <img src={props.user.pictureUrl} alt={props.user.name}/>
            </figure>
          </div>
        </a>

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
            {years}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
