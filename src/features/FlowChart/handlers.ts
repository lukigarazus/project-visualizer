import { Connection, Edge } from "react-flow-renderer";

import { Entity } from "../domain/types";
import { onEntityConnect } from "../domain/handlers";
import { Elements, EntityNode } from "./types";

export const onConnect =
  (
    entities: Record<string, Entity>,
    setEntities: (entities: Record<string, Entity>) => void
  ) =>
  ({ source, target }: Connection | Edge<any>) => {
    if (source && target) {
      const sourceEntity = entities[source];
      const targetEntity = entities[target];
      if (sourceEntity && targetEntity) {
        onEntityConnect(entities, setEntities, sourceEntity, targetEntity);
      }
    }
    setEntities(entities);
  };

export const onNodeDragStop =
  (elements: Elements, setElements: (elements: Elements) => void) =>
  (event: any, change: EntityNode) => {
    const { position, data } = change;

    const element = elements.find(
      (el) => el.data?.entity.name === data?.entity.name
    );
    if (element && "position" in element) {
      element.position = {
        ...position,
      };
    }

    setElements([...elements]);
  };
