import React from "react";

import { Entity } from "../../domain/types";
import typeComponentFactory from "./typeComponentFactory";

const SelectedEntities = ({
  selectedEntities,
}: {
  selectedEntities: Entity[];
}) => {
  return (
    <div>
      <h3>Selected Entities</h3>
      <div>
        {selectedEntities.map((selectedEntity) => {
          const Component = typeComponentFactory(selectedEntity);
          return (
            <Component key={selectedEntity.name} entity={selectedEntity} />
          );
        })}
      </div>
    </div>
  );
};

export default SelectedEntities;
