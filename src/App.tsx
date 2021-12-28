import React, { useEffect } from "react";
// import { ToastContainer, toast } from 'react-toastify';

import { Entity } from "./features/domain/types";
import FlowChart from "./features/FlowChart";
import SidePanel from "./features/SidePanel";
import Persister from "./features/Persister";
import Tabs from "./features/Tabs";

enum AppState {
  WAITING_FOR_TAB,
  WAITING_FOR_ENTITIES,
  READY,
}

function App() {
  const [appState, setAppState] = React.useState<AppState>(
    AppState.WAITING_FOR_TAB
  );

  const [entities, setEntities] = React.useState<Record<string, Entity>>({});
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
  const onTabChange = React.useCallback((tab) => {
    Persister.setTab(tab);
    setAppState(AppState.WAITING_FOR_ENTITIES);
  }, []);

  useEffect(() => {
    if (appState === AppState.READY) Persister.save("entities", entities);
  }, [entities]);

  useEffect(() => {
    if (appState === AppState.WAITING_FOR_ENTITIES)
      (async () => {
        // entities
        const entities = await Persister.load<Record<string, Entity>>(
          "entities"
        );

        if (entities) {
          setEntities(entities);
        } else {
          // migration
          const entities = await Persister.load<Record<string, Entity>>(
            "entities",
            true
          );
          if (entities) {
            setEntities(entities);
          } else {
            setEntities({});
          }
        }
        setAppState(AppState.READY);
      })();
  }, [appState]);

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
        <Tabs onTabChange={onTabChange} />
      </header>

      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          display: "grid",
          gridTemplateColumns: "auto 300px",
        }}
      >
        {appState === AppState.READY ? (
          <FlowChart
            entities={entities}
            setEntities={setEntities}
            setSelectedEntities={setSelectedEntities}
          />
        ) : (
          <div>Loading...</div>
        )}

        <SidePanel
          entities={entities}
          selectedEntities={selectedEntities}
          addEntity={addEntity}
          editEntity={(entity) => {
            console.log("editEntity", entity);
            setEntities({ ...entities, [entity.name]: { ...entity } });
          }}
          removeEntity={(entity) => {
            delete entities[entity.name];
            setEntities({ ...entities });
            if (selectedEntities.includes(entity)) {
              setSelectedEntities(selectedEntities.filter((e) => e !== entity));
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
