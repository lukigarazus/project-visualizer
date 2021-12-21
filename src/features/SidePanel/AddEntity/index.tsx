import React from "react";

import { ALL_TYPES, Entity } from "../../domain/types";
import { entityFactory } from "../../domain/classes";

const AddEntity = ({
  onEntityAdd,
}: {
  onEntityAdd: (entity: Entity) => void;
}) => {
  const [entityType, setEntityType] = React.useState(ALL_TYPES[0]);
  const [entityName, setEntityName] = React.useState("");

  const reset = React.useCallback(() => {
    setEntityType(ALL_TYPES[0]);
    setEntityName("");
  }, []);
  const onEntityAddHandler = React.useCallback(() => {
    const entity = entityFactory(entityType, entityName);
    onEntityAdd(entity);
    reset();
  }, [entityType, entityName, onEntityAdd, reset]);

  return (
    <div>
      <input
        onChange={(e) => {
          setEntityName(e.target.value);
        }}
        value={entityName}
      />
      <select
        value={entityType}
        onChange={(e) => setEntityType(e.target.value as any)}
      >
        {ALL_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button disabled={!entityName} onClick={onEntityAddHandler}>
        Add Entity
      </button>
    </div>
  );
};

export default AddEntity;
