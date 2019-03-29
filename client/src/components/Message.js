import React from "react";

function Message(props) {
  return (
    <article className="media">
    
      <figure className="media-left">
        <p className="image is-32x32">
          <img src={props.message.fromUser.pictureUrl}
          alt={props.message.fromUser.name} />
        </p>
      </figure>

      <div className="media-content">
        <div className="content">
          <p>
            <strong className="has-text-danger">{props.message.fromUser.name}</strong> <small>{props.message.dateTime.date} {props.message.dateTime.time}</small>
            <br/>
            {props.message.content}
          </p>
        </div>
      </div>

    </article>
  );
}

export default Message;
