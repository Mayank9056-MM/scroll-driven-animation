"use client";

import React, { forwardRef } from "react";

interface CarSceneProps {
  className?: string;
}

const CarScene = forwardRef<HTMLDivElement, CarSceneProps>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        style={{ lineHeight: 0, display: "block" }}
      >
        <img
          src="/car.png"
          alt="McLaren"
          draggable={false}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  },
);

CarScene.displayName = "CarScene";

export default CarScene;
