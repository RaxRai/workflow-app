import React from 'react';
// import { Counter } from './features/counter/Counter';
import FlowChart from "./app/components/flowChart"
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './App.css';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <FlowChart />
      </div>
    </DndProvider>
  );
}

export default App;
