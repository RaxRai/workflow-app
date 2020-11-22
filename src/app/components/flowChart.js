import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ReactFlow, { removeElements, addEdge, MiniMap, Controls, Background } from 'react-flow-renderer';
import { ItemTypes } from "../../utils/items";
import DropItem from './dropItem';


const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
  }
];

console.log(initialElements);

export default function FlowChart(){
  const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => {
    console.log(params);
    setElements((els) => addEdge(params, els));
  }

  const [{isOver} , drop] = useDrop({
    accept : [ItemTypes.CARD , ItemTypes.IF],
    drop : (item , monitor) => {
      console.log(item);
      if(item.type === "if"){
        handleIf(item.name);
        return
      }
      let newElements = [...elements];
      let newNode = {
        id: String(Math.random()),
        data: { label: item.name },
        position: { x: 500, y: 25+elements.length*45 },
      }
      newElements.push(newNode);
      setElements(newElements);

    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  })

  const handleIf =(itemName)=>{
    let newNodeId = String(Math.random());
    let newNode = {
      id: newNodeId,
      data: { label: itemName },
      position: { x: 500, y: 25+elements.length*45 },
    }
    let newElements = [...elements]
    let trueNodeId = String(Math.random())
    let trueNode = {
      id: trueNodeId,
      data: { label: "TRUE" },
      position: { x: 400, y: 105+elements.length*45 },
    }
    let falseNodeId = String(Math.random())
    let falseNode = {
      id: falseNodeId,
      data: { label: "False" },
      position: { x: 600, y: 105+elements.length*45 },
    }
    newElements.push(newNode);
    newElements.push(trueNode);
    newElements.push(falseNode);
    let leftNodeodeConnect = { id: String(Math.random()), source: newNodeId, target: trueNodeId, animated: true }
    let rightNodeodeConnect = { id: String(Math.random()), source: newNodeId, target: falseNodeId, animated: true }
    newElements.push(leftNodeodeConnect);
    newElements.push(rightNodeodeConnect);
    setElements(newElements);

  }

  return (
    <div className="container">
        <div className="canvas" ref={drop} style={{opacity : isOver?  "rgb(247, 234, 234)" : "white"}}>
          <ReactFlow
            elements={elements}
            zoomOnScroll={true}
            paneMoveable={true}
            onElementsRemove={onElementsRemove}
            onConnect={onConnect}
            deleteKeyCode={46} /* 'delete'-key */
          >
              <MiniMap />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
        <div className="toolbox">
            <DropItem name="Send Mail" type="card"/>
            <DropItem name="If/Else" type="if"/>
            <DropItem name="Go To" type="card"/>
            <DropItem name="Subscribe" type="card"/>
            <DropItem name="Unsubscribe" type="card"/>
            <DropItem name="Update Contact" type="card"/>
        </div>

    </div>

  );
}