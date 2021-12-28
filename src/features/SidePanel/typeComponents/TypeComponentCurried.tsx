import React from "react";

import BaseComponent from "./BaseComponent";
import { Entity, ALL_PARENT_KEYS } from "../../domain/types";

const TypeComponentCurried =
  (parentKeys: typeof ALL_PARENT_KEYS) =>
  ({
    entity,
    editEntity,
    removeEntity,
  }: {
    entity: Entity;
    editEntity: (entity: Entity) => void;
    removeEntity: (entity: Entity) => void;
  }) => {
    return (
      <div
        style={{
          padding: "10px",
          border: "1px solid black",
        }}
      >
        <BaseComponent
          entity={entity}
          onRemove={() => {
            removeEntity(entity);
          }}
        />
        <div style={{ padding: "10px" }}>
          {parentKeys.map((key) => (
            <div>
              <div>{key}</div>
              {((entity as any)[key] as any).map((parentEntity: Entity) => {
                return (
                  <BaseComponent
                    key={parentEntity.name}
                    entity={parentEntity}
                    onRemove={() => {
                      // @ts-ignore
                      entity[key] = entity[key].filter(
                        (e: Entity) => e !== parentEntity
                      );
                      console.log("REMOVE CONNECTION", parentEntity);

                      editEntity(parentEntity);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default TypeComponentCurried;
