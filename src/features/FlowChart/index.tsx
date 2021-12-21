import React, { useEffect } from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";

import { Entity } from "../domain/types";
import { mapEntityToElements, mapEntityTypeToElementType } from "./mappers";
import { onConnect, onNodeDragStop } from "./handlers";
import { Elements, EntityNode } from "./types";
import EntityNodeComponent from "./Nodes/EntityNodeComponent";

import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";

const FlowChart = ({
  entities,
  setEntities,
  setSelectedEntities,
}: {
  entities: Record<string, Entity>;
  setEntities: (entities: Record<string, Entity>) => void;
  setSelectedEntities: (entities: Entity[]) => void;
}) => {
  const [mappedEntities, setMappedEntities] = React.useState<Elements>([]);
  const setMappedEntitiesWrapped = React.useCallback(
    (elements: Elements) => {
      setEntities(
        elements
          .map((el) => el.data?.entity)
          .filter(Boolean)
          .reduce((acc, el) => {
            acc[el.name] = el;
            return acc;
          }, {} as Record<string, Entity>)
      );
      setMappedEntities(elements);
    },
    [setMappedEntities, setEntities]
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
    const newMappedEntities = [] as any;

    for (const value of Object.values(entities)) {
      const mappedEntity = mappedEntities.find(
        (el) => el.data?.entity === value
      );
      if (mappedEntity) {
        newMappedEntities.push(mappedEntity);
        newMappedEntities.push(...mapEntityToElements(value, true));
      } else {
        newMappedEntities.push(...mapEntityToElements(value));
      }
    }

    setMappedEntities([...newMappedEntities]);
  }, [entities]);
  useEffect(() => {
    // save to local storage - start
    const parsedPositions = JSON.parse(
      localStorage.getItem("positions") || "{}"
    );
    for (const node of mappedEntities) {
      if ("position" in node) {
        parsedPositions[node.data?.entity.name as string] = node.position;
      }
    }
    const stringifiedPositions = JSON.stringify(parsedPositions);
    localStorage.setItem("positions", stringifiedPositions);
    // save to local storage - end
  }, [mappedEntities]);

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
