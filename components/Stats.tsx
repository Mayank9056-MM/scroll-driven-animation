"use client";

import React, { forwardRef } from "react";

interface StatCardProps {
  percentage: string;
  description: string;
  bgColor: string;
  textColor: string;
  descColor: string;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ percentage, description, bgColor, textColor, descColor }, ref) => {
    return (
      <div
        ref={ref}
        className="rounded-2xl p-12 min-w-[300px] shadow-lg opacity-0"
        style={{ backgroundColor: bgColor }}
      >
        <div
          className="text-6xl font-bold leading-none mb-3"
          style={{ color: textColor, fontFamily: "Inter, sans-serif" }}
        >
          {percentage}
        </div>
        <div
          className="text-base font-medium leading-snug"
          style={{ color: descColor }}
        >
          {description}
        </div>
      </div>
    );
  },
);

StatCard.displayName = "StatCard";

interface StatsProps {
  stat1Ref: React.RefObject<HTMLDivElement>;
  stat2Ref: React.RefObject<HTMLDivElement>;
  stat3Ref: React.RefObject<HTMLDivElement>;
  stat4Ref: React.RefObject<HTMLDivElement>;
}

const Stats: React.FC<StatsProps> = ({
  stat1Ref,
  stat2Ref,
  stat3Ref,
  stat4Ref,
}) => {
  return (
    <>
      {/* Top stats - positioned above the road */}
      <div
        className="absolute top-0 left-1/2 flex gap-12 z-20"
        style={{ transform: "translateX(-50%)" }}
      >
        {/* These are absolutely positioned via JS refs */}
      </div>

      {/* Stat 1 - yellow-green, top-left of center */}
      <StatCard
        ref={stat1Ref}
        percentage="58%"
        description="Increase in pick up point use"
        bgColor="#d4f542"
        textColor="#1a1a1a"
        descColor="#2a2a2a"
      />

      {/* Stat 2 - dark, top-right of center */}
      <StatCard
        ref={stat2Ref}
        percentage="27%"
        description="Increase in pick up point use"
        bgColor="#2a2a2a"
        textColor="#ffffff"
        descColor="#cccccc"
      />

      {/* Stat 3 - light blue, bottom-left */}
      <StatCard
        ref={stat3Ref}
        percentage="23%"
        description="Decreased in customer phone calls"
        bgColor="#a8d8f0"
        textColor="#1a1a1a"
        descColor="#2a2a2a"
      />

      {/* Stat 4 - orange, bottom-right */}
      <StatCard
        ref={stat4Ref}
        percentage="40%"
        description="Decreased in customer phone calls"
        bgColor="#f5a442"
        textColor="#1a1a1a"
        descColor="#2a2a2a"
      />
    </>
  );
};

export default Stats;
