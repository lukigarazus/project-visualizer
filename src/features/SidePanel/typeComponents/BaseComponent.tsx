import React from "react";

import { Entity } from "../../domain/types";

const BaseComponent = ({
  entity,
  onRemove,
  editable = false,
}: {
  entity: Entity;
  onRemove: (entity: Entity) => void;
  editable?: boolean;
}) => {
  return (
    <div style={{ padding: "10px", display: "flex" }}>
      <div style={{ width: "100%" }}>
        {!editable ? (
          entity.name
        ) : (
          <input
            style={{ width: "100%" }}
            value={entity.name}
            onChange={(ev) => {
              entity.name = ev.target.value;
            }}
          />
        )}
      </div>
      <button onClick={() => onRemove(entity)}>X</button>
    </div>
  );
};

export default BaseComponent;
