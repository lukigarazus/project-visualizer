import React, { useEffect } from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";

import { Entity } from "../domain/types";
import { mapEntityToElements, mapEntityTypeToElementType } from "./mappers";
import { onConnect, onNodeDragStop } from "./handlers";
import { Elements, EntityNode } from "./types";
import EntityNodeComponent from "./Nodes/EntityNodeComponent";
import Persister from "../Persister";

import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

enum FlowChartState {
  WAITING_FOR_POSITIONS,
  READY,
}

type EntityMap = Record<string, Entity>;
type Entities = Entity[];

const useEntitiesToNodesAndEdges = (entities: EntityMap) => {
  useEffect(() => {
    (async () => {
      const positions = await Persister.load<
        Record<string, { x: number; y: number }>
      >("positions");

      const newNodes = [] as any;
      const newEdges = [] as any;

      for (const value of Object.values(entities)) {
        const mappedEntity = mappedEntities.find(
          (el) => el.data?.entity === value
        );
        if (mappedEntity) {
          // update only edges
          newNodes.push(mappedEntity);
          newEdges.push(...mapEntityToElements(value, positions, true));
        } else {
          newMappedEntities.push(...mapEntityToElements(value, positions));
        }
      }

      setFlowChartState(FlowChartState.READY);
      setMappedEntities(newMappedEntities);
    })();
  }, [entities]);
};

const FlowChart = ({
  entities,
  setEntities,
  setSelectedEntities,
}: {
  entities: EntityMap;
  setEntities: (entities: EntityMap) => void;
  setSelectedEntities: (entities: Entities) => void;
}) => {
  console.log("FlowChart", entities);

  const [flowChartState, setFlowChartState] = React.useState<FlowChartState>(
    FlowChartState.WAITING_FOR_POSITIONS
  );

  const [mappedEntities, setMappedEntities] = React.useState<Elements>([]);

  const setMappedEntitiesWrapped = React.useCallback(
    (elements: Elements) => {
      setMappedEntities(elements);
      setEntities(
        elements
          .map((el) => el.data?.entity)
          .filter(Boolean)
          .reduce((acc, el) => {
            acc[el.name] = el;
            return acc;
          }, {} as Record<string, Entity>)
      );
    },
    [setEntities]
  );
  const onSelectionChangeWrapped = React.useCallback(
    (nodes: any) => {
      // setSelectedEntities(
      //   nodes?.map((node: EntityNode) => node.data?.entity).filter(Boolean) ||
      //     []
      // );
    },
    [setSelectedEntities]
  );
  const onNodeDragStopWrapped = React.useCallback(
    onNodeDragStop(mappedEntities, setMappedEntitiesWrapped),
    [mappedEntities, setMappedEntitiesWrapped]
  );
  const onConnectPA = React.useCallback(onConnect(entities, setEntities), [
    entities,
    setEntities,
  ]);

  useEffect(() => {
    if (flowChartState === FlowChartState.READY)
      // save to local storage - start
      (async () => {
        let parsedPositions = {} as Record<string, { x: number; y: number }>;
        for (const node of mappedEntities) {
          if ("position" in node) {
            parsedPositions[node.data?.entity.name as string] = node.position;
          }
        }
        Persister.save("positions", parsedPositions);
      })();
    // save to local storage - end
  }, [mappedEntities]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        minZoom={0}
        nodeTypes={
          {
            // entity: EntityNodeComponent,
          }
        }
        onConnect={onConnectPA}
        onNodeDragStop={onNodeDragStopWrapped}
        onSelectionChange={onSelectionChangeWrapped}
        nodes={[]}
        edges={[]}
      />
    </ReactFlowProvider>
  );
};

export default FlowChart;
