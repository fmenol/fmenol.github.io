'use client';

import { useEffect, useState } from 'react';

export default function RoboticArm() {
  const [position, setPosition] = useState(0);
  const positions = [
    { x: 80, y: 60, label: 'A1' },
    { x: 120, y: 60, label: 'A2' },
    { x: 160, y: 60, label: 'A3' },
    { x: 160, y: 90, label: 'B3' },
    { x: 120, y: 90, label: 'B2' },
    { x: 80, y: 90, label: 'B1' },
    { x: 80, y: 120, label: 'C1' },
    { x: 120, y: 120, label: 'C2' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % positions.length);
    }, 800);
    return () => clearInterval(interval);
  }, [positions.length]);

  const current = positions[position];
  const armBaseX = 220;
  const armBaseY = 150;

  // Calculate arm segments
  const elbowX = armBaseX - 30;
  const elbowY = armBaseY - 60;
  const shoulderX = armBaseX;
  const shoulderY = armBaseY - 20;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 280 180"
        className="w-full max-w-md"
        style={{ fontFamily: 'inherit' }}
      >
        {/* Background plate */}
        <rect
          x="60"
          y="45"
          width="130"
          height="100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Well plate grid */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <g key={`${row}-${col}`}>
              <circle
                cx={80 + col * 40}
                cy={60 + row * 30}
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              <text
                x={80 + col * 40}
                y={60 + row * 30 + 3}
                textAnchor="middle"
                fontSize="6"
                fill="currentColor"
                opacity="0.3"
              >
                {String.fromCharCode(65 + row)}{col + 1}
              </text>
            </g>
          ))
        )}

        {/* Highlight current well */}
        <circle
          cx={current.x}
          cy={current.y}
          r="12"
          fill="currentColor"
          opacity="0.15"
          className="transition-all duration-500"
        />

        {/* Robot base/gantry */}
        <rect
          x="200"
          y="140"
          width="60"
          height="30"
          fill="currentColor"
          opacity="0.2"
        />
        <text
          x="230"
          y="160"
          textAnchor="middle"
          fontSize="8"
          fill="currentColor"
          opacity="0.5"
        >
          GANTRY
        </text>

        {/* Vertical rail */}
        <line
          x1="230"
          y1="30"
          x2="230"
          y2="140"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.3"
        />

        {/* Horizontal rail (moves along Y) */}
        <line
          x1="50"
          y1={current.y}
          x2="230"
          y2={current.y}
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.4"
          className="transition-all duration-500"
        />

        {/* Carriage on vertical rail */}
        <rect
          x="223"
          y={current.y - 8}
          width="14"
          height="16"
          fill="currentColor"
          opacity="0.5"
          className="transition-all duration-500"
        />

        {/* Carriage on horizontal rail */}
        <rect
          x={current.x - 6}
          y={current.y - 10}
          width="12"
          height="20"
          fill="currentColor"
          opacity="0.5"
          className="transition-all duration-500"
        />

        {/* Pipette head */}
        <g className="transition-all duration-500" style={{ transform: `translate(${current.x}px, ${current.y}px)` }}>
          <line
            x1="0"
            y1="-10"
            x2="0"
            y2="25"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Pipette tip */}
          <polygon
            points="0,25 -3,35 3,35"
            fill="currentColor"
            opacity="0.7"
          />
          {/* Droplet animation */}
          <circle
            cx="0"
            cy="40"
            r="2"
            fill="#6c2e2e"
            opacity="0.8"
            className="animate-pulse"
          />
        </g>

        {/* Status display */}
        <rect
          x="200"
          y="10"
          width="70"
          height="25"
          fill="currentColor"
          opacity="0.1"
          rx="2"
        />
        <text
          x="235"
          y="20"
          textAnchor="middle"
          fontSize="6"
          fill="currentColor"
          opacity="0.5"
        >
          POSITION
        </text>
        <text
          x="235"
          y="30"
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          opacity="0.8"
          fontWeight="bold"
        >
          {current.label}
        </text>

        {/* Label */}
        <text
          x="125"
          y="170"
          textAnchor="middle"
          fontSize="10"
          fill="currentColor"
          opacity="0.6"
          letterSpacing="0.15em"
        >
          LIQUID HANDLER
        </text>
      </svg>

      <p className="text-muted text-xs tracking-wider">
        c y b e r g e n e t i c s
      </p>
    </div>
  );
}
