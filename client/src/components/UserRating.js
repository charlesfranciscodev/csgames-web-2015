import React from "react";

function UserRating(props) {
  let stars = [];
  for (let i = 0; i < props.rating.stars; i++) {
    stars.push(
      <span key={i} className="icon has-text-warning">
        <i className="fas fa-star"></i>
      </span>
    );
  }

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={props.rating.fromUser.pictureUrl} alt={props.rating.fromUser.name} />
        </p>
      </figure>

      <div className="media-content">
        <div className="content">
          <p>
            <strong>{props.rating.fromUser.name}</strong>
            <br/>
            {stars}
            <br/>
            {props.rating.comment}
          </p>
        </div>
      </div>

      {/* <div className="media-right">
        <button className="delete"></button>
      </div> */}
    </article>
  );
}

export default UserRating;
