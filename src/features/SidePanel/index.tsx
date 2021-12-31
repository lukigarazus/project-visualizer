import React from "react";

import SelectedEntities from "./SelectedEntities";
import AddEntity from "./AddEntity";

const SidePanel = () => {
  return (
    <div
      style={{
        backgroundColor: "white",
        overflowY: "scroll",
        padding: "10px",
      }}
    >
      <AddEntity />
      <SelectedEntities />
    </div>
  );
};

export default SidePanel;
