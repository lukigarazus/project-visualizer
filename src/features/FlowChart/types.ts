import { Node, Edge } from "react-flow-renderer";

import { Entity } from "../domain/types";

export type EntityNode = Node<{ label: string; entity: Entity }>;

export type EntityNodeType = "entity";

export const ENTITY_ELEMENT_TYPES: EntityNodeType[] = ["entity"];
