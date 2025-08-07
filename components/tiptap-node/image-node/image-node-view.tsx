import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";

export const ImageNodeView: React.FC<NodeViewProps> = ({
  node,
  updateAttributes,
  selected,
  editor,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>("");
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startWidth, setStartWidth] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  // editable 상태 확인
  const isEditable = editor.isEditable;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, direction: string) => {
      if (imageRef.current && isEditable) {
        setIsResizing(true);
        setResizeDirection(direction);
        setStartX(e.pageX);
        setStartY(e.pageY);
        setStartWidth(imageRef.current.width);
        setStartHeight(imageRef.current.height);
        e.preventDefault();
      }
    },
    [isEditable]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing || !imageRef.current) return;

      const deltaX = e.pageX - startX;
      const deltaY = e.pageY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      // 종횡비 유지를 위한 계산
      const aspectRatio = startWidth / startHeight;

      switch (resizeDirection) {
        case "se": // 오른쪽 아래
          newWidth = Math.max(100, startWidth + deltaX);
          newHeight = newWidth / aspectRatio;
          break;
        case "sw": // 왼쪽 아래
          newWidth = Math.max(100, startWidth - deltaX);
          newHeight = newWidth / aspectRatio;
          break;
        case "ne": // 오른쪽 위
          newWidth = Math.max(100, startWidth + deltaX);
          newHeight = newWidth / aspectRatio;
          break;
        case "nw": // 왼쪽 위
          newWidth = Math.max(100, startWidth - deltaX);
          newHeight = newWidth / aspectRatio;
          break;
      }

      updateAttributes({
        width: `${newWidth}px`,
        height: `${newHeight}px`,
      });
    },
    [
      isResizing,
      resizeDirection,
      startX,
      startY,
      startWidth,
      startHeight,
      updateAttributes,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setResizeDirection("");
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const resizeHandleStyle = {
    position: "absolute" as const,
    width: "8px",
    height: "8px",
    background: "#0074D9",
    borderRadius: "50%",
    border: "1px solid white",
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  };

  return (
    <NodeViewWrapper
      className={`image-node-wrapper ${!isEditable ? "read-only" : ""}`}
      style={{ textAlign: node.attrs.textAlign }}
    >
      <div
        className="image-container"
        data-text-align={node.attrs.textAlign}
        style={{ display: "block", position: "relative" }}
      >
        <div style={{ display: "inline-block", position: "relative" }}>
          <img
            ref={imageRef}
            src={node.attrs.src}
            alt={node.attrs.alt}
            title={node.attrs.title}
            style={{
              width: node.attrs.width,
              height: node.attrs.height,
              display: "block",
            }}
            className={selected && isEditable ? "selected" : ""}
          />
          {selected && isEditable && (
            <>
              {/* 오른쪽 아래 */}
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "se")}
                style={{
                  ...resizeHandleStyle,
                  right: "-4px",
                  bottom: "-4px",
                  cursor: "se-resize",
                }}
              />
              {/* 왼쪽 아래 */}
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "sw")}
                style={{
                  ...resizeHandleStyle,
                  left: "-4px",
                  bottom: "-4px",
                  cursor: "sw-resize",
                }}
              />
              {/* 오른쪽 위 */}
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "ne")}
                style={{
                  ...resizeHandleStyle,
                  right: "-4px",
                  top: "-4px",
                  cursor: "ne-resize",
                }}
              />
              {/* 왼쪽 위 */}
              <div
                className="resize-handle"
                onMouseDown={(e) => handleMouseDown(e, "nw")}
                style={{
                  ...resizeHandleStyle,
                  left: "-4px",
                  top: "-4px",
                  cursor: "nw-resize",
                }}
              />
            </>
          )}
        </div>
        {selected && isEditable && (
          <div
            className="alignment-buttons flex gap-1 bg-white p-1 rounded-md border border-gray-200 shadow-sm"
            style={{
              position: "absolute",
              top: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => updateAttributes({ textAlign: "left" })}
              className={`p-1 rounded hover:bg-gray-100 ${
                node.attrs.textAlign === "left" ? "bg-gray-100" : ""
              }`}
              type="button"
            >
              <AlignLeftIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateAttributes({ textAlign: "center" })}
              className={`p-1 rounded hover:bg-gray-100 ${
                node.attrs.textAlign === "center" ? "bg-gray-100" : ""
              }`}
              type="button"
            >
              <AlignCenterIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateAttributes({ textAlign: "right" })}
              className={`p-1 rounded hover:bg-gray-100 ${
                node.attrs.textAlign === "right" ? "bg-gray-100" : ""
              }`}
              type="button"
            >
              <AlignRightIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
