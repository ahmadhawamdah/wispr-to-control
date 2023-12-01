"use client";
import React, { useEffect, useState } from "react";

type BoxProps = {
  action: string | null;
};

const Box: React.FC<BoxProps> = ({ action }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  // Change the Box size and position
  useEffect(() => {
    const updateBox = () => {
      switch (action) {
        case "up":
          setPosition((prev) => ({ ...prev, top: prev.top - 10 }));
          break;
        case "down":
          setPosition((prev) => ({ ...prev, top: prev.top + 10 }));
          break;
        case "right":
          setPosition((prev) => ({ ...prev, left: prev.left + 10 }));
          break;
        case "left":
          setPosition((prev) => ({ ...prev, left: prev.left - 10 }));
          break;
        case "zero":
          setSize({ width: 50, height: 50 });
          break;
        case "one":
          setSize({ width: 100, height: 100 });
          break;
        case "two":
          setSize({ width: 120, height: 120 });
          break;
        case "three":
          setSize({ width: 150, height: 150 });
          break;
        case "four":
          setSize({ width: 170, height: 170 });
          break;
        default:
          break;
      }
    };
    updateBox();
  }, [action]);

  // Tailwind Class
  const boxClass =
    "relative transition-all ease duration-500 bg-black mb-5 rounded-lg";

  return (
    <div
      className={boxClass}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    ></div>
  );
};

export default Box;
