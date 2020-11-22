import React from "react";
import {  useDrag } from 'react-dnd';

export default function DropItem(props) {
    const {name , type} = props;

    const [{isDragging} , dragCard] = useDrag({
        item : {
          type : type,
          name : name
        },
        collect : monitor => ({
            isDragging : !!monitor.isDragging()
        })
      })

  return (
    <>
      <div className="" ref={dragCard} style={{height: 20, width: 200 , border: "1px solid black", opacity: isDragging ? 0.1 : 1}}>
          {name}
      </div>
    </>

  );
}
