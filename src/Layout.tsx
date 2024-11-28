import React, { useEffect, useRef } from "react";
import sphere1 from "./assets/1.png";
import sphere2 from "./assets/2.png";
import sphere3 from "./assets/3.png";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const trackerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveElements = (e: MouseEvent) => {
      const shapes = document.querySelectorAll<HTMLImageElement>(".shape");
      const tracker = trackerRef.current;

      if (tracker) {
        tracker.style.top = `${e.clientY}px`;
        tracker.style.left = `${e.clientX}px`;
        tracker.style.opacity = "1";
      }

      shapes.forEach((shape) => {
        const shapeOffset = parseFloat(
          shape.getAttribute("data-offset") || "0"
        );

        const offsetX = (window.innerWidth - e.clientX) * shapeOffset;
        const offsetY = (window.innerHeight - e.clientY) * shapeOffset;

        shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    document.addEventListener("mousemove", moveElements);

    return () => {
      document.removeEventListener("mousemove", moveElements);
    };
  }, []);

  return (
    <div className="relative min-h-screen showcase">
      <div className="border-box"></div>
      <div className="border-box-2"></div>
      {children}
      <img
        src={sphere1}
        alt=""
        className="shape has-in-common sm-hidden"
        data-offset=".05"
      />
      <img
        src={sphere2}
        alt=""
        className="shape shape-md has-in-common sm-hidden"
        data-offset=".025"
      />
      <img
        src={sphere3}
        alt=""
        className="shape shape-lg has-in-common sm-hidden"
        data-offset=".02"
      />
    </div>
  );
};
