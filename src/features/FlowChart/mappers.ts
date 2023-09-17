import { Edge } from "react-flow-renderer";

import { EntityNode, EntityNodeType } from "./types";
import {
  Entity,
  BaseEntity,
  ALL_PARENT_KEYS,
  ANIMATED_PARENT_KEYS,
} from "../domain/types";

export const mapEntityToNode = (
  entity: Entity,
  positions: Record<string, { x: number; y: number }> | null
): EntityNode => {
  const parsedPositions = positions ?? {};
  const base = {
    id: entity.name,
    data: { label: entity.name, entity },
    position: parsedPositions[entity.name] || { x: 100, y: 100 },
    type: mapEntityTypeToElementType(entity.type),
  };
};
export const mapEntityToEdges = (entity: Entity): Edge[] => {
  const edges: Edge[] = [];
  for (const key of ALL_PARENT_KEYS) {
    if (key in entity) {
      const els = (entity as any)[key] as Entity[];
      for (const el of els) {
        nodes.push({
          id: `${entity.name}_${el.name}`,
          source: el.name,
          target: entity.name,
          ...(modifier && modifier(el)),
        });
      }
    }
    // mapAndPush(
    //   entity,
    //   key as any,
    //   nodes,
    //   ANIMATED_PARENT_KEYS.includes(key as any)
    //     ? () => ({ animated: true })
    //     : undefined
    // );
  }
  return edges;
};

export const mapEntityToNodesAndEdges = (
  entity: Entity,
  positions: Record<string, { x: number; y: number }> | null
): { node: EntityNode; edges: Edge[] } => {
  return nodes;
};

export const mapEntityTypeToElementType = (
  entityType: Entity["type"]
): EntityNodeType => {
  switch (entityType) {
    default:
      return "entity";
  }
};
