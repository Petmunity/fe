"use client";
import { useRef, useLayoutEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import BlockLinkButton from "./BlockLinkButton";
import { DndItemType } from "@/types/dnd";

interface DraggableButtonProps {
  id: string;
  title: string;
  href: string;
  src: string;
  bgColor: string;
  index: number;
  moveItem?: (dragIndex: number, hoverIndex: number) => void;
  canDrag: boolean;
  toogleCanDrag?: () => void;
}

const DraggableButton = ({
  id,
  title,
  href,
  src,
  bgColor,
  index,
  moveItem,
  canDrag,
  toogleCanDrag,
}: DraggableButtonProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "button",
    item: { id, index, src, href, bgColor, title, width, height },
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
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      if (moveItem) {
        moveItem(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
    drop(item) {
      if (moveItem) {
        moveItem(item.index, index);
      }
    },
  });

  useLayoutEffect(() => {
    if (ref.current) {
      widthRef.current = ref.current?.offsetWidth;
      heightRef.current = ref.current?.offsetHeight;
      setWidth(widthRef.current);
      setHeight(heightRef.current);
    }
  }, []);

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drag(drop(node));
      }}
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

export default DraggableButton;
