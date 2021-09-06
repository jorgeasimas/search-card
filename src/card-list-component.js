import React from "react";
import "./styles.scss";
import { Card } from "./card.component";

export const Cardlist = (props) => {
  return (
    <div className="card-list">
      {props.peopleList.map((newArray) => (
        <Card key={newArray.id} list={newArray} />
      ))}
    </div>
  );
};
