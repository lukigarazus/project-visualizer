import React from "react";

import { Entity } from "../../domain/types";
import typeComponentFactory from "../typeComponents/typeComponentFactory";

const SelectedEntities = ({
  selectedEntities,
  editEntity,
  removeEntity,
}: {
  selectedEntities: Entity[];
  editEntity: (entity: Entity) => void;
  removeEntity: (entity: Entity) => void;
}) => {
  return (
    <div>
      <h3>Selected Entities</h3>
      <div>
        {selectedEntities.map((selectedEntity) => {
          const Component = typeComponentFactory(selectedEntity);
          return (
            <Component
              key={selectedEntity.name}
              entity={selectedEntity}
              editEntity={editEntity}
              removeEntity={removeEntity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SelectedEntities;
