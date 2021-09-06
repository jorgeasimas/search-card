import React from "react";

export const Card = (props) => (
  <div className="card-container">
    <img
      alt="monster"
      src={`https://picsum.photos/id/${props.list.id + 20}/200/200`}
    />
    <h2>{props.list.name}</h2>
    <p>{props.list.email}</p>
  </div>
);
