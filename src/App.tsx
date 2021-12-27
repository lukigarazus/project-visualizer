import React, { useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';

import { Entity } from "./features/domain/types";
import FlowChart from "./features/FlowChart";
import SidePanel from "./features/SidePanel";
import Persister from "./features/Persister";
import Tabs from "./features/Tabs";

function App() {
  const [entities, setEntities] = React.useState<Record<string, Entity>>({});
  const [selectedEntities, setSelectedEntities] = React.useState<Entity[]>([]);
  const [tab, setTab] = React.useState<null | string>(null);

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
    Persister.save("entities", entities);
  }, [entities]);

  useEffect(() => {
    (async () => {
      Persister.setTab(tab);
      // entities
      const entities = await Persister.load<Record<string, Entity>>("entities");

      if (entities) setEntities(entities);
      else {
        // migration
        const entities = await Persister.load<Record<string, Entity>>(
          "entities",
          true
        );
        if (entities) setEntities(entities);
      }
    })();
  }, [tab]);

  console.log(entities);

  return (
    <div className="app" style={{ width: "100vw", height: "100vh" }}>
      <header style={{ height: "50px", backgroundColor: "grey" }}>
        <button
          onClick={() => {
            Persister.remove("entities");
          }}
        >
          Clear
        </button>
        <Tabs onTabChange={setTab} />
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
