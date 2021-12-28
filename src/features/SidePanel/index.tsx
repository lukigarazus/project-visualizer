import React from "react";

import { Entity } from "../domain/types";
import SelectedEntities from "./SelectedEntities";
import AddEntity from "./AddEntity";

const SidePanel = ({
  entities,
  selectedEntities,
  addEntity,
  editEntity,
  removeEntity,
}: {
  entities: Record<string, Entity>;
  selectedEntities: Entity[];
  addEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
  editEntity: (entity: Entity) => void;
}) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        overflowY: "scroll",
        padding: "10px",
      }}
    >
      <AddEntity onEntityAdd={addEntity} />
      <SelectedEntities
        editEntity={editEntity}
        removeEntity={removeEntity}
        selectedEntities={selectedEntities}
      />
    </div>
  );
};

export default SidePanel;
