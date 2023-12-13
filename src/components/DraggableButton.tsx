"use client";
import { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import BlockLinkButton from "./BlockLinkButton";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DndItemType } from "@/types/dnd";

interface DraggableBlockLinkButtonProps {
  id: string;
  title: string;
  href: string;
  src: string;
  bgColor: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  canDrag: boolean;
  toogleCanDrag: () => void;
}

const DraggableBlockLinkButton = ({
  id,
  title,
  href,
  src,
  bgColor,
  index,
  moveItem,
  canDrag,
  toogleCanDrag,
}: DraggableBlockLinkButtonProps) => {
  const ref = useRef(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "button",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "button",
    hover(item: DndItemType) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      console.log(dragIndex, "!!!!");
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
    drop(item) {
      moveItem(item.index, index);
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <BlockLinkButton
        key={id}
        src={src}
        title={title}
        href={href}
        bgColor={bgColor}
        canDrag={canDrag}
        toogleCanDrag={toogleCanDrag}
      />
    </div>
  );
};

export default DraggableBlockLinkButton;
