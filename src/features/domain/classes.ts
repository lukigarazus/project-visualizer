import {
  Function,
  BaseEntity,
  Subject,
  Socket,
  Server,
  ComputedValue,
  ObservableValue,
  MessageType,
  Reaction,
  Action,
  RegularValue,
  App,
  Package,
  Module,
  Object,
  BaseContainer,
  ALL_TYPES,
  EntityType,
} from "./types";

// classes for all of the types declared in types.ts

abstract class EntityImpl implements BaseEntity {
  abstract type: EntityType;
  constructor(public name: string) {}
}

export class FunctionImpl extends EntityImpl implements Function {
  calledBy = [];
  subscribesTo = [];
  type = EntityType.Function as const;
}

export class SubjectImpl extends EntityImpl implements Subject {
  triggeredBy = [];
  type = EntityType.Subject as const;
}

export class ServerImpl extends EntityImpl implements Server {
  type = EntityType.Server as const;
}

export class MessageTypeImpl extends EntityImpl implements MessageType {
  type = EntityType.MessageType as const;
  emittedBy?: Server;
}

export class SocketImpl extends EntityImpl implements Socket {
  messageTypes = [];
  calledBy = [];
  type = EntityType.Socket as const;
}

export class ComputedValueImpl extends EntityImpl implements ComputedValue {
  uses = [];
  type = EntityType.ComputedValue as const;
}

export class ObservableValueImpl extends EntityImpl implements ObservableValue {
  setBy = [];
  mappedTo = [];
  type = EntityType.ObservableValue as const;
}

export class ReactionImpl extends EntityImpl implements Reaction {
  reactsTo = [];
  type = EntityType.Reaction as const;
}

export class ActionImpl extends EntityImpl implements Action {
  reactsTo = [];
  type = EntityType.Action as const;
}

export class RegularValueImpl extends EntityImpl implements RegularValue {
  setBy = [];
  type = EntityType.RegularValue as const;
  mappedTo = [];
}

abstract class ContainerImpl extends EntityImpl implements BaseContainer {
  entities = [];
}

export class AppImpl extends ContainerImpl implements App {
  type = EntityType.App as const;
}

export class PackageImpl extends ContainerImpl implements Package {
  type = EntityType.Package as const;
}

export class ModuleImpl extends ContainerImpl implements Module {
  type = EntityType.Module as const;
}

export class ObjectImpl extends ContainerImpl implements Object {
  type = EntityType.Object as const;
}

export const ENTITY_IMPLS = {
  function: FunctionImpl,
  subject: SubjectImpl,
  server: ServerImpl,
  messageType: MessageTypeImpl,
  socket: SocketImpl,
  computedValue: ComputedValueImpl,
  observableValue: ObservableValueImpl,
  reaction: ReactionImpl,
  action: ActionImpl,
  regularValue: RegularValueImpl,
  app: AppImpl,
  package: PackageImpl,
  module: ModuleImpl,
  object: ObjectImpl,
} as const;

export const entityFactory = (type: EntityType, name: string) => {
  if (ALL_TYPES.includes(type)) {
    return new ENTITY_IMPLS[type](name);
  } else {
    throw new Error(`Unknown type: ${type}`);
  }
};
