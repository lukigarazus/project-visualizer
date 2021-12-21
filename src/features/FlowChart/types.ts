import { Node, Edge } from "react-flow-renderer";

import { Entity } from "../domain/types";

export type EntityNode = Node<{ label: string; entity: Entity }>;

export type Elements = (EntityNode | Edge)[];

export type EntityElementType = "entity";

export const ENTITY_ELEMENT_TYPES: EntityElementType[] = ["entity"];
