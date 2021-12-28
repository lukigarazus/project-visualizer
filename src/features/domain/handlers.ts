import {
  Entity,
  CALLER_TYPES,
  SUBSCRIBABLE_TYPES,
  REACTIVE_VALUE_TYPES,
  SETTER_TYPES,
  VALUE_TYPES,
} from "./types";

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

export const onEntityConnect = (
  entities: Record<string, Entity>,
  setEntities: (entities: Record<string, Entity>) => void,
  source: Entity,
  target: Entity
) => {
  if (source && target) {
    switch (target.type) {
      case "function":
        if (CALLER_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.calledBy, source, "name");
        } else if (SUBSCRIBABLE_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.subscribesTo, source, "name");
        }
        break;
      case "regularValue":
        if (SETTER_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.setBy, source, "name");
        } else if (VALUE_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.mappedTo, source, "name");
        }
        break;
      case "subject":
        if (CALLER_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.triggeredBy, source, "name");
        }
        break;
      case "socket":
        if (CALLER_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.calledBy, source, "name");
        } else if (source.type === "messageType") {
          pushIfNotExistsElseDelete(target.messageTypes, source, "name");
        }
        break;
      case "computedValue":
        if (VALUE_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.uses, source, "name");
        }
        break;
      case "observableValue":
        if (SETTER_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.setBy, source, "name");
        } else if (VALUE_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.mappedTo, source, "name");
        }
        break;
      case "reaction":
      case "action":
        if (REACTIVE_VALUE_TYPES.includes(source.type as any)) {
          pushIfNotExistsElseDelete(target.reactsTo, source, "name");
        }
        break;
      default:
        return;
    }
  }

  setEntities({ ...entities });
};
