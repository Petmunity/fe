/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";
import { useState, useCallback, useEffect } from "react";
import Loading from "./DndLoading";
import { DndProvider } from "react-dnd";
import DndButton from "./DndButton";
import { TouchBackend } from "react-dnd-touch-backend";
import CustomDragLayer from "./CustomDragyer";

type buttonItemsType = {
  src: string;
  title: string;
  href: string;
  bgColor: string;
};

interface DndButtonContainerProps {
  buttonItems: buttonItemsType[];
}

export default function DndButtonContainer({
  buttonItems,
}: DndButtonContainerProps) {
  const [items, setItems] = useState<buttonItemsType[]>([]);
  const [canDrag, setCanDrag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleCanDrag = () => {
    setCanDrag((prev) => !prev);
  };

  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (canDrag) {
        setItems((items: buttonItemsType[]) => {
          const newItems = [...items];
          const draggedItem = newItems[dragIndex];

          newItems.splice(dragIndex, 1);
          newItems.splice(hoverIndex, 0, draggedItem);
          localStorage.setItem("buttonItems", JSON.stringify(newItems));

          return newItems;
        });
      }
    },
    [canDrag],
  );

  useEffect(() => {
    const loadItemsFromLocalStorage = () => {
      const savedItemsString = localStorage.getItem("buttonItems");
      if (savedItemsString) {
        setIsLoading(false);
        return JSON.parse(savedItemsString);
      }
      setIsLoading(false);
      return buttonItems;
    };

    setItems(loadItemsFromLocalStorage);
  }, [buttonItems]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <div
          className={`grid grid-cols-2 gap-4  ${
            canDrag && "motion-safe:animate-pulse"
          }`}
        >
          {items.map((item: buttonItemsType, index: number) => (
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
        <CustomDragLayer canDrag={canDrag} />
      </DndProvider>
    </>
  );
}
