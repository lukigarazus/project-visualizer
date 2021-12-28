import { Edge } from "react-flow-renderer";

import { Elements, EntityElementType } from "./types";
import {
  Entity,
  BaseEntity,
  ALL_PARENT_KEYS,
  ANIMATED_PARENT_KEYS,
} from "../domain/types";

const mapAndPush = <T extends BaseEntity>(
  entity: T,
  key: keyof T,
  nodes: Elements,
  modifier?: (entity: Entity) => Partial<Edge>
): void => {
  const els = entity[key] as unknown as Entity[];
  for (const el of els) {
    nodes.push({
      id: `${entity.name}_${el.name}`,
      source: el.name,
      target: entity.name,
      ...(modifier && modifier(el)),
    });
  }
};

export const mapEntityToElements = (
  entity: Entity,
  positions: Record<string, { x: number; y: number }> | null,
  edgesOnly = false
): Elements => {
  const parsedPositions = positions || {};

  const base = {
    id: entity.name,
    data: { label: entity.name, entity },
    position: parsedPositions[entity.name] || { x: 100, y: 100 },
    type: mapEntityTypeToElementType(entity.type),
  };
  const nodes: Elements = [];
  if (!edgesOnly) {
    nodes.push(base);
  }

  for (const key of ALL_PARENT_KEYS) {
    if (key in entity)
      mapAndPush(
        entity,
        key as any,
        nodes,
        ANIMATED_PARENT_KEYS.includes(key as any)
          ? () => ({ animated: true })
          : undefined
      );
  }

  return nodes;
};

export const mapEntityTypeToElementType = (
  entityType: Entity["type"]
): EntityElementType => {
  switch (entityType) {
    case "function":
    case "subject":
    case "messageType":
    case "socket":
    case "computedValue":
    case "observableValue":
    case "reaction":
    case "action":
    case "regularValue":
    case "server":
      return "entity";
    default:
      return "entity";
  }
};
