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

const FlowChart = ({
  entities,
  setEntities,
  setSelectedEntities,
}: {
  entities: Record<string, Entity>;
  setEntities: (entities: Record<string, Entity>) => void;
  setSelectedEntities: (entities: Entity[]) => void;
}) => {
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
    (nodes) => {
      setSelectedEntities(
        nodes?.map((node: EntityNode) => node.data?.entity).filter(Boolean) ||
          []
      );
    },
    [setSelectedEntities]
  );
  const onNodeDragStopWrapped = React.useCallback(
    onNodeDragStop(mappedEntities, setMappedEntitiesWrapped),
    [mappedEntities, setMappedEntitiesWrapped]
  );
  const onConnectPA = React.useCallback(
    onConnect(mappedEntities, setMappedEntitiesWrapped, setEntities),
    [mappedEntities, setMappedEntitiesWrapped]
  );

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
  useEffect(() => {
    (async () => {
      const positions = await Persister.load<
        Record<string, { x: number; y: number }>
      >("positions");

      const newMappedEntities = [] as any;

      for (const value of Object.values(entities)) {
        const mappedEntity = mappedEntities.find(
          (el) => el.data?.entity === value
        );
        if (mappedEntity) {
          newMappedEntities.push(mappedEntity);
          newMappedEntities.push(
            ...mapEntityToElements(value, positions, true)
          );
        } else {
          newMappedEntities.push(...mapEntityToElements(value, positions));
        }
      }

      setFlowChartState(FlowChartState.READY);
      setMappedEntities(newMappedEntities);
    })();
  }, [entities]);

  return (
    <ReactFlowProvider>
      <ReactFlow
        minZoom={0}
        nodeTypes={{
          entity: EntityNodeComponent,
        }}
        onConnect={onConnectPA}
        onNodeDragStop={onNodeDragStopWrapped}
        elements={mappedEntities}
        onSelectionChange={onSelectionChangeWrapped}
      />
    </ReactFlowProvider>
  );
};

export default FlowChart;
