"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import DndButton from "./DndButton";
import { TouchBackend } from "react-dnd-touch-backend";
import CustomDragLayer from "./CustomDragyer";

interface DndButtonContainerProps {
  buttonItems: {
    src: string;
    title: string;
    href: string;
    bgColor: string;
  }[];
}

export default function DndButtonContainer({
  buttonItems,
}: DndButtonContainerProps) {
  const [items, setItems] = useState(buttonItems);
  const [canDrag, setCanDrag] = useState(false);

  const toggleCanDrag = () => {
    setCanDrag((prev) => !prev);
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (canDrag) {
        setItems((items) => {
          const newItems = [...items];
          const draggedItem = newItems[dragIndex];

          newItems.splice(dragIndex, 1);
          newItems.splice(hoverIndex, 0, draggedItem);

          return newItems;
        });
      }
    },
    [canDrag],
  );

  return (
    <>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, index) => (
            <DndButton
              key={item.title + index}
              id={item.title}
              index={index}
              src={item.src}
              title={item.title}
              href={item.href}
              bgColor={item.bgColor}
              moveItem={moveItem}
              canDrag={canDrag}
              toogleCanDrag={toggleCanDrag}
            />
          ))}
        </div>
        <CustomDragLayer
          moveItem={moveItem}
          canDrag={canDrag}
          toogleCanDrag={toggleCanDrag}
        />
      </DndProvider>
    </>
  );
}
