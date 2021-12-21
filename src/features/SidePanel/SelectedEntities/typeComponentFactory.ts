import React from "react";

import BaseComponent from "../typeComponents/BaseComponent";
import TypeComponentCurried from "../typeComponents/TypeComponentCurried";
import { ALL_PARENT_KEYS, Entity } from "../../domain/types";

const typeComponentFactory = (entity: Entity): React.FC<{ entity: Entity }> => {
  const parentKeys = ALL_PARENT_KEYS.filter((key) => key in entity);
  if (!parentKeys.length) {
    return BaseComponent;
  }
  return TypeComponentCurried(parentKeys);
};

export default typeComponentFactory;
