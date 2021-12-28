import React from "react";

import BaseComponent from "./BaseComponent";
import TypeComponentCurried from "./TypeComponentCurried";
import { ALL_PARENT_KEYS, Entity } from "../../domain/types";

const typeComponentFactory = (entity: Entity): React.FC<any> => {
  const parentKeys = ALL_PARENT_KEYS.filter((key) => key in entity);
  if (!parentKeys.length) {
    return BaseComponent;
  }
  return TypeComponentCurried(parentKeys);
};

export default typeComponentFactory;
