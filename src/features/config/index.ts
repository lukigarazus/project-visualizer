import { EntityType } from "../domain/types";

const config: { entityTypeToColorMap: Record<EntityType, string> } = {
  entityTypeToColorMap: Object.assign(localStorage.entityTypeToColorMap || {}, {
    function: "blue",
    subject: "red",
    dataSource: "yellow",
    messageType: "purple",
    socket: "green",
    computedValue: "pink",
    observableValue: "pink",
    reaction: "blue",
    action: "blue",
    regularValue: "white",
  }),
};

export default config;
