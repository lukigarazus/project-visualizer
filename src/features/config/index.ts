import { EntityType } from "../domain/types";

const defaultEntityTypeToColorMap: Record<EntityType, string> = {
  function: "blue",
  subject: "red",
  messageType: "purple",
  socket: "green",
  computedValue: "pink",
  observableValue: "pink",
  reaction: "blue",
  action: "blue",
  regularValue: "white",
  server: "green",
  app: "green",
  package: "green",
  module: "green",
  object: "green",
};

const entityTypeToColorMap: Record<EntityType, string> = Object.assign(
  localStorage.entityTypeToColorMap || {},
  defaultEntityTypeToColorMap
);

const config: { entityTypeToColorMap: Record<EntityType, string> } = {
  entityTypeToColorMap,
};

export default config;
