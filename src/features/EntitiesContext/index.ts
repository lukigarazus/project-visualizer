import React from "react";

import { Entity } from "../domain/types";

const EntitiesContext = React.createContext<{
  entities: Record<string, Entity>;
  addEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
  editEntity: (entity: Entity) => void;
  selectEntity: (entity: Entity) => void;
  selectedEntities: Entity[];
}>({
  entities: {},
  selectedEntities: [],
  addEntity: () => {},
  removeEntity: () => {},
  editEntity: () => {},
  selectEntity: () => {},
});

export default EntitiesContext;
