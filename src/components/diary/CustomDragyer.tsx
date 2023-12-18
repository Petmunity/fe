"use client";
import { useDragLayer } from "react-dnd";
import DraggableButton from "./DraggableButton";

function getItemStyles(
  currentOffset: {
    x: number;
    y: number;
  } | null,
) {
  if (!currentOffset) {
    return { display: "none" };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = (props: any) => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }),
  );

  return isDragging && itemType === "button" && props.canDrag ? (
    <div
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 100,
        left: 0,
        top: 0,
      }}
    >
      <div
        style={{
          ...getItemStyles(currentOffset),
          width: item.width,
        }}
      >
        <DraggableButton
          id={item.id}
          title={item.title}
          index={item.index}
          src={item.src}
          href={item.href}
          bgColor={item.bgColor}
          canDrag={props.canDrag}
        />
      </div>
    </div>
  ) : null;
};

export default CustomDragLayer;
