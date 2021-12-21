import React from "react";
import { Handle, Position } from "react-flow-renderer";

import { BaseEntity } from "../../domain/types";
import config from "../../config";
import { EntityNode } from "../types";

const getEntityStyleBasedOnType = (entity: BaseEntity) => {
  return {
    color: config.entityTypeToColorMap[entity.type],
    border: `1px solid ${config.entityTypeToColorMap[entity.type]}`,
    display: "inline-block",
    padding: "0 10px",
  };
};

const EntityComponent = ({ data, position }: EntityNode) => {
  const { entity = {} as any } = data || {};
  const { name, type } = entity;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        // onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={true}
      />
      <div style={getEntityStyleBasedOnType(entity)}>
        <h2>{name}</h2>
        <p>{type}</p>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={true}
      />
    </>
  );
};

export default EntityComponent;
