import React, { useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';

import { Entity } from "./features/domain/types";
import FlowChart from "./features/FlowChart";
import SidePanel from "./features/SidePanel";

function App() {
  const [entities, setEntities] = React.useState(
    (localStorage.entities && JSON.parse(localStorage.entities)) || {}
  );
  const [selectedEntities, setSelectedEntities] = React.useState<Entity[]>([]);

  const addEntity = React.useCallback(
    (entity: Entity) => {
      if (entity.name in entities) {
        throw new Error("Entity already exists");
      } else {
        setEntities({ ...entities, [entity.name]: entity });
      }
    },
    [entities]
  );

  useEffect(() => {
    localStorage.entities = JSON.stringify(entities);
  }, [entities]);

  return (
    <div className="app" style={{ width: "100vw", height: "100vh" }}>
      <header style={{ height: "50px", backgroundColor: "grey" }}>
        <button
          onClick={() => {
            delete localStorage.entities;
          }}
        >
          Clear
        </button>
      </header>

      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          display: "grid",
          gridTemplateColumns: "auto 300px",
        }}
      >
        <FlowChart
          entities={entities}
          setEntities={setEntities}
          setSelectedEntities={setSelectedEntities}
        />
        <SidePanel
          entities={entities}
          selectedEntities={selectedEntities}
          addEntity={addEntity}
        />
      </div>
    </div>
  );
}

export default App;
