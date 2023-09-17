export enum EntityType {
  Function = "function",
  Subject = "subject",
  MessageType = "messageType",
  Socket = "socket",
  ComputedValue = "computedValue",
  ObservableValue = "observableValue",
  Reaction = "reaction",
  Action = "action",
  RegularValue = "regularValue",
  Server = "server",
  App = "app",
  Package = "package",
  Module = "module",
  Object = "object",
}

// -----------------------------------------------------------------------------

export type Function = BaseEntity & {
  calledBy: Caller[];
  subscribesTo: Subscribable[];
  type: EntityType.Function;
};

export const FUNCTION_PARENT_KEYS = ["calledBy", "subscribesTo"] as const;

// -----------------------------------------------------------------------------

export type Subject = BaseEntity & {
  triggeredBy: Caller[];
  type: EntityType.Subject;
};

export const SUBJECT_PARENT_KEYS = ["triggeredBy"] as const;

// -----------------------------------------------------------------------------

export type Server = BaseEntity & { type: EntityType.Server };

export type MessageType = BaseEntity & {
  type: EntityType.MessageType;
  emittedBy?: Server;
};

export const MESSAGE_TYPE_PARENT_KEYS = ["emittedBy"] as const;

export type Socket = BaseEntity & {
  messageTypes: MessageType[];
  calledBy: Caller[];
  type: EntityType.Socket;
};

export const SOCKET_PARENT_KEYS = ["messageTypes", "calledBy"] as const;

// -----------------------------------------------------------------------------

export type ComputedValue = BaseEntity & {
  uses: Value[];
  type: EntityType.ComputedValue;
};

export const COMPUTED_VALUE_PARENT_KEYS = ["uses"] as const;

export type ObservableValue = BaseEntity & {
  type: EntityType.ObservableValue;
  setBy: Setter[];
  mappedTo: Value[];
};

export const OBSERVABLE_VALUE_PARENT_KEYS = ["setBy", "mappedTo"] as const;

// -----------------------------------------------------------------------------

export type Reaction = BaseEntity & {
  reactsTo: ReactiveValue[];
  type: EntityType.Reaction;
};

export const REACTION_PARENT_KEYS = ["reactsTo"] as const;

export type Action = BaseEntity & {
  reactsTo: ReactiveValue[];
  type: EntityType.Action;
};

export const ACTION_PARENT_KEYS = ["reactsTo"] as const;

// -----------------------------------------------------------------------------

export type RegularValue = BaseEntity & {
  type: EntityType.RegularValue;
  setBy: Setter[];
  mappedTo: Value[];
};

export const REGULAR_VALUE_PARENT_KEYS = ["setBy", "mappedTo"] as const;

// -----------------------------------------------------------------------------

export type BaseContainer = BaseEntity & {
  entities: Entity[];
};

export type App = BaseContainer & {
  type: EntityType.App;
};

export type Package = BaseContainer & {
  type: EntityType.Package;
};

export type Module = BaseContainer & {
  type: EntityType.Module;
};

// this is a very general type, it encompasses classes, components and everything that can have keys in javascipt
export type Object = BaseContainer & {
  type: EntityType.Object;
};

// -----------------------------------------------------------------------------

// the most abstract types, should encompass all of the above types
export type ReactiveValue = ComputedValue | ObservableValue;
export type Value = ReactiveValue | RegularValue;
export type Subscribable = Subject | Socket;
export type Caller = Function | Reaction | Action;
export type Setter = Function | Reaction | Action;
export type Communication = MessageType;
export type DataSource = Server;
export type Emitter = Server;
export type Fetcher = Socket;
export type Container = App | Package | Module | Object;

export type Entity =
  | Value
  | Subscribable
  | Caller
  | Setter
  | Communication
  | DataSource
  | Fetcher
  | Container;

export const VALUE_TYPES = [
  EntityType.ComputedValue,
  EntityType.ObservableValue,
  EntityType.RegularValue,
];
export const REACTIVE_VALUE_TYPES = [
  EntityType.ComputedValue,
  EntityType.ObservableValue,
];
export const SUBSCRIBABLE_TYPES = [EntityType.Subject, EntityType.Socket];
export const CALLER_TYPES = [
  EntityType.Function,
  EntityType.Reaction,
  EntityType.Action,
];
export const SETTER_TYPES = [
  EntityType.Function,
  EntityType.Reaction,
  EntityType.Action,
];
export const COMMUNICATION_TYPES = [EntityType.MessageType];
export const DATA_SOURCE_TYPES = [EntityType.Server];
export const EMITTER_TYPES = [EntityType.Server];
export const FETCHER_TYPES = [EntityType.Socket];
export const CONTAINER_TYPES = [
  EntityType.App,
  EntityType.Package,
  EntityType.Module,
  EntityType.Object,
];

export const ALL_TYPES = Array.from(
  new Set<EntityType>([
    ...CALLER_TYPES,
    ...SETTER_TYPES,
    ...VALUE_TYPES,
    ...REACTIVE_VALUE_TYPES,
    ...SUBSCRIBABLE_TYPES,
    ...COMMUNICATION_TYPES,
    ...DATA_SOURCE_TYPES,
    ...EMITTER_TYPES,
    ...FETCHER_TYPES,
    ...CONTAINER_TYPES,
  ])
);

export const ALL_PARENT_KEYS = Array.from(
  new Set([
    ...FUNCTION_PARENT_KEYS,
    ...SUBJECT_PARENT_KEYS,
    ...MESSAGE_TYPE_PARENT_KEYS,
    ...SOCKET_PARENT_KEYS,
    ...COMPUTED_VALUE_PARENT_KEYS,
    ...OBSERVABLE_VALUE_PARENT_KEYS,
    ...REACTION_PARENT_KEYS,
    ...ACTION_PARENT_KEYS,
    ...REGULAR_VALUE_PARENT_KEYS,
  ] as const)
);

export const ANIMATED_PARENT_KEYS = ["subscribesTo"] as const;

// -----------------------------------------------------------------------------

// basic types
export type BaseEntity = {
  name: string;
  type: EntityType;
};
