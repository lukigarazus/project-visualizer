import React, { useEffect } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
// import { ToastContainer, toast } from 'react-toastify';

import { Entity } from "./features/domain/types";
import FlowChart from "./features/FlowChart";
import SidePanel from "./features/SidePanel";
import Persister from "./features/Persister";
import Tabs from "./features/Tabs";

enum AppState {
  WAITING_FOR_TAB = "waiting for tab",
  WAITING_FOR_ENTITIES = "waiting for entities",
  READY = "ready",
}

// const KEY_MAP: KeyMap = {
//   "save-flowchart": "s",
//   "remove-entity": "del",
// };

function App() {
  const [appState, setAppState] = React.useState<AppState>(
    AppState.WAITING_FOR_TAB
  );

  useEffect(() => {
    console.log("appState changed", appState);
  }, [appState]);

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
  const removeEntity = React.useCallback(
    (entity: Entity) => {
      delete entities[entity.name];
      setEntities({ ...entities });
      if (selectedEntities.includes(entity)) {
        setSelectedEntities(selectedEntities.filter((e) => e !== entity));
      }
    },
    [entities, selectedEntities]
  );
  const onTabChange = React.useCallback((tab: string) => {
    Persister.setTab(tab);
    setAppState(AppState.WAITING_FOR_ENTITIES);
  }, []);

  const KEY_HANDLERS = React.useMemo(() => {
    return {
      "remove-entity": () => {
        if (selectedEntities.length === 1) {
          removeEntity(selectedEntities[0]);
        }
      },
    };
  }, [removeEntity, selectedEntities]);

  useEffect(() => {
    if (appState === AppState.READY) Persister.save("entities", entities);
  }, [entities, appState]);

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
    // <GlobalHotKeys keyMap={KEY_MAP} handlers={KEY_HANDLERS} allowChanges>
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
          removeEntity={removeEntity}
        />
      </div>
    </div>
    // </GlobalHotKeys>
  );
}

export default App;
