import React from "react";

import { Entity } from "../../domain/types";

const BaseComponent = ({ entity }: { entity: Entity }) => {
  return <div style={{ padding: "10px" }}>{entity.name}</div>;
};

export default BaseComponent;
