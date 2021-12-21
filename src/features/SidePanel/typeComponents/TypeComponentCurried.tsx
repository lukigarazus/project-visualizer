import React from "react";

import BaseComponent from "./BaseComponent";
import { Entity, ALL_PARENT_KEYS } from "../../domain/types";

const TypeComponentCurried =
  (parentKeys: typeof ALL_PARENT_KEYS) =>
  ({ entity }: { entity: Entity }) => {
    return (
      <div>
        <BaseComponent entity={entity} />
        <div style={{ padding: "10px" }}>
          {parentKeys.map((key) => (
            <div>
              <div>{key}</div>
              {((entity as any)[key] as any).map((entity: Entity) => {
                return <BaseComponent key={entity.name} entity={entity} />;
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default TypeComponentCurried;
