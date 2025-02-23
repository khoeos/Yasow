// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// TODO all the canvas handling, this is partially working

'use client';

import React, { useMemo } from 'react';
import ReactFlow, { MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';

export default function CanvasViewer({ canvasData }) {
  const nodes = useMemo(() => {
    return canvasData.nodes.map((node) => {
      return {
        id: node.id,
        position: { x: node.x, y: node.y },
        data: { text: node.text },
        type: 'obsidianNode',
      };
    });
  }, [canvasData]);

  const edges = useMemo(() => {
    return canvasData.edges.map((edge) => ({
      id: edge.id,
      source: edge.fromNode,
      target: edge.toNode,
      type: 'smoothstep',
      style: { stroke: 'black', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'red',
        strokeWidth: 2,
        width: 20,
        height: 20,
      },
    }));
  }, [canvasData]);

  const nodeTypes = useMemo(
    () => ({
      obsidianNode: ObsidianNode,
    }),
    [],
  );

  return (
    <div style={{ width: '100%', height: '1000px' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
}

function ObsidianNode({ data }) {
  return (
    <div
      style={{
        border: '1px solid #aaa',
        borderRadius: '6px',
        padding: '0.5rem 1rem',
        backgroundColor: 'white',
        minWidth: 100,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: data.text }} />
    </div>
  );
}
