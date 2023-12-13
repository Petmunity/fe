"use client";
import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBlockLinkButton from "./DraggableButton";
import { TouchBackend } from "react-dnd-touch-backend";

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

  //   const moveItem = async (dragIndex, hoverIndex) => {
  //     setItems((prevItems) => {
  //       const newItems = [...prevItems];
  //       const draggedItem = newItems[dragIndex];

  //       newItems.splice(dragIndex, 1);
  //       newItems.splice(hoverIndex, 0, draggedItem);

  //       return newItems;
  //     });

  //     // API 요청을 보내서 아이템의 위치를 저장
  //     const response = await fetch("/api/save-item-position", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         itemId: items[dragIndex].id,
  //         newPosition: hoverIndex,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to save item position");
  //     }
  //   };

  console.log(items, "items");
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <DraggableBlockLinkButton
            key={item.title}
            id={item.title} // 고유한 아이디가 필요합니다.
            index={index} // 드래그 앤 드롭을 위한 인덱스입니다.
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
    </DndProvider>
  );
}
