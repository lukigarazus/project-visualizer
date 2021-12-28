import React from "react";

import { Entity } from "../../domain/types";

const BaseComponent = ({
  entity,
  onRemove,
}: {
  entity: Entity;
  onRemove: (entity: Entity) => void;
}) => {
  return (
    <div style={{ padding: "10px", display: "flex" }}>
      <div style={{ width: "100%" }}>{entity.name}</div>
      <button onClick={() => onRemove(entity)}>X</button>
    </div>
  );
};

export default BaseComponent;
