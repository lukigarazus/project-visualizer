import { Connection, Edge } from "react-flow-renderer";

import {
  Entity,
  CALLER_TYPES,
  SUBSCRIBABLE_TYPES,
  REACTIVE_VALUE_TYPES,
  SETTER_TYPES,
  VALUE_TYPES,
  EntityType,
} from "../domain/types";
import { Elements, EntityNode } from "./types";

// const connectHandlersByType: Partial<
//   Record<EntityType["type"], Partial<Record<EntityType["type"], () => void>>>
// > = {
//     function: {},

// };

const pushIfNotExistsElseDelete = <T>(
  arr: T[],
  item: T,
  key?: keyof T
): T[] => {
  if (!(key ? arr.find((el) => el[key] === item[key]) : arr.includes(item))) {
    arr.push(item);
  } else {
    let index = key
      ? arr.findIndex((el) => el[key] === item[key])
      : arr.indexOf(item);
    while (index !== -1) {
      arr.splice(index, 1);
      index = key
        ? arr.findIndex((el) => el[key] === item[key])
        : arr.indexOf(item);
    }
  }
  return arr;
};

export const onConnect =
  (
    elements: Elements,
    setElements: (elements: Elements) => void,
    setEntities: (entities: Record<string, Entity>) => void
  ) =>
  ({ source, target }: Connection | Edge<any>) => {
    if (source && target) {
      const sourceEntity = elements.find(
        (el) => el.data?.entity.name === source
      )?.data.entity as Entity | void;
      const targetEntity = elements.find(
        (el) => el.data?.entity.name === target
      )?.data.entity as Entity | void;
      if (sourceEntity && targetEntity) {
        switch (targetEntity.type) {
          case "function":
            if (CALLER_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.calledBy,
                sourceEntity,
                "name"
              );
            } else if (SUBSCRIBABLE_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.subscribesTo,
                sourceEntity,
                "name"
              );
            }
            break;
          case "regularValue":
            if (SETTER_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.setBy,
                sourceEntity,
                "name"
              );
            } else if (VALUE_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.mappedTo,
                sourceEntity,
                "name"
              );
            }
            break;
          case "subject":
            if (CALLER_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.triggeredBy,
                sourceEntity,
                "name"
              );
            }
            break;
          case "socket":
            if (CALLER_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.calledBy,
                sourceEntity,
                "name"
              );
            } else if (sourceEntity.type === "messageType") {
              pushIfNotExistsElseDelete(
                targetEntity.messageTypes,
                sourceEntity,
                "name"
              );
            }
            break;
          case "computedValue":
            if (VALUE_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.uses,
                sourceEntity,
                "name"
              );
            }
            break;
          case "observableValue":
            if (SETTER_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.setBy,
                sourceEntity,
                "name"
              );
            } else if (VALUE_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.mappedTo,
                sourceEntity,
                "name"
              );
            }
            break;
          case "reaction":
          case "action":
            if (REACTIVE_VALUE_TYPES.includes(sourceEntity.type as any)) {
              pushIfNotExistsElseDelete(
                targetEntity.reactsTo,
                sourceEntity,
                "name"
              );
            }
            break;
          default:
            return;
        }
      }
    }
    const entities = elements.reduce((acc, el) => {
      if (el.data?.entity) {
        acc[el.data.entity.name] = el.data.entity;
      }
      return acc;
    }, {} as Record<string, Entity>);
    setEntities(entities);

    setElements([...elements]);
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
        x: position.x,
        y: position.y,
      };
    }

    setElements([...elements]);
  };
