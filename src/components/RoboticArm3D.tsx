'use client';

import { useEffect, useRef } from 'react';

export default function RoboticArm3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const width = 400;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Animation parameters
    let time = 0;
    let animationId: number;
    const baseX = width / 2;
    const baseY = height - 60;

    // Arm segment lengths
    const seg1 = 80;
    const seg2 = 70;
    const seg3 = 50;

    // 3D projection helpers
    const perspective = 400;
    const cameraY = -50;

    function project3D(x: number, y: number, z: number) {
      const scale = perspective / (perspective + z);
      return {
        x: baseX + (x * scale),
        y: baseY + ((y + cameraY) * scale),
        scale,
      };
    }

    function drawLine3D(
      context: CanvasRenderingContext2D,
      x1: number, y1: number, z1: number,
      x2: number, y2: number, z2: number,
      lineWidth: number,
      color: string
    ) {
      const p1 = project3D(x1, y1, z1);
      const p2 = project3D(x2, y2, z2);

      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.strokeStyle = color;
      context.lineWidth = lineWidth * ((p1.scale + p2.scale) / 2);
      context.lineCap = 'round';
      context.stroke();
    }

    function drawJoint3D(context: CanvasRenderingContext2D, x: number, y: number, z: number, radius: number, color: string) {
      const p = project3D(x, y, z);
      context.beginPath();
      context.arc(p.x, p.y, radius * p.scale, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
    }

    function drawGripper3D(context: CanvasRenderingContext2D, x: number, y: number, z: number, angle: number, rotY: number, grip: number) {
      const gripLen = 20;
      const spread = 0.3 + grip * 0.4;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosR = Math.cos(rotY);
      const sinR = Math.sin(rotY);

      // Left finger
      const lx = -gripLen * Math.sin(spread);
      const ly = gripLen * Math.cos(spread);
      const lx3d = lx * cosR;
      const lz3d = lx * sinR;
      const lxFinal = lx3d * cosA - ly * sinA;
      const lyFinal = lx3d * sinA + ly * cosA;

      drawLine3D(context, x, y, z, x + lxFinal, y + lyFinal, z + lz3d, 4, '#555');

      // Right finger
      const rx = gripLen * Math.sin(spread);
      const ry = gripLen * Math.cos(spread);
      const rx3d = rx * cosR;
      const rz3d = rx * sinR;
      const rxFinal = rx3d * cosA - ry * sinA;
      const ryFinal = rx3d * sinA + ry * cosA;

      drawLine3D(context, x, y, z, x + rxFinal, y + ryFinal, z + rz3d, 4, '#555');
    }

    function drawBase(context: CanvasRenderingContext2D) {
      const baseRadius = 40;
      const baseHeight = 15;

      // Draw ellipse for 3D effect
      context.beginPath();
      context.ellipse(baseX, baseY + 5, baseRadius, baseRadius * 0.3, 0, 0, Math.PI * 2);
      context.fillStyle = '#444';
      context.fill();

      // Base cylinder top
      context.beginPath();
      context.ellipse(baseX, baseY - baseHeight, baseRadius, baseRadius * 0.3, 0, 0, Math.PI * 2);
      context.fillStyle = '#666';
      context.fill();
      context.strokeStyle = '#555';
      context.lineWidth = 2;
      context.stroke();

      // Base sides
      context.beginPath();
      context.moveTo(baseX - baseRadius, baseY - baseHeight);
      context.lineTo(baseX - baseRadius, baseY + 5);
      context.moveTo(baseX + baseRadius, baseY - baseHeight);
      context.lineTo(baseX + baseRadius, baseY + 5);
      context.strokeStyle = '#555';
      context.stroke();
    }

    function animate() {
      if (!ctx) return;
      time += 0.02;

      // Clear canvas
      ctx.fillStyle = '#f5f4e9';
      ctx.fillRect(0, 0, width, height);

      // Draw base
      drawBase(ctx);

      // Animated angles
      const baseAngle = Math.sin(time * 0.5) * 0.8;
      const shoulder = -Math.PI / 4 + Math.sin(time * 0.7) * 0.3;
      const elbow = Math.PI / 3 + Math.sin(time * 0.9 + 1) * 0.4;
      const wrist = Math.sin(time * 1.1 + 2) * 0.5;
      const grip = (Math.sin(time * 2) + 1) / 2;

      // Calculate joint positions in 3D
      const j0 = { x: 0, y: -20, z: 0 };

      // First segment (shoulder)
      const cosBase = Math.cos(baseAngle);
      const sinBase = Math.sin(baseAngle);
      const cosShoulder = Math.cos(shoulder);
      const sinShoulder = Math.sin(shoulder);

      const j1 = {
        x: j0.x + seg1 * sinShoulder * cosBase,
        y: j0.y - seg1 * cosShoulder,
        z: j0.z + seg1 * sinShoulder * sinBase,
      };

      // Second segment (elbow)
      const totalAngle1 = shoulder + elbow;
      const cosElbow = Math.cos(totalAngle1);
      const sinElbow = Math.sin(totalAngle1);

      const j2 = {
        x: j1.x + seg2 * sinElbow * cosBase,
        y: j1.y - seg2 * cosElbow,
        z: j1.z + seg2 * sinElbow * sinBase,
      };

      // Third segment (wrist)
      const totalAngle2 = totalAngle1 + wrist;
      const cosWrist = Math.cos(totalAngle2);
      const sinWrist = Math.sin(totalAngle2);

      const j3 = {
        x: j2.x + seg3 * sinWrist * cosBase,
        y: j2.y - seg3 * cosWrist,
        z: j2.z + seg3 * sinWrist * sinBase,
      };

      // Draw arm segments
      drawLine3D(ctx, j0.x, j0.y, j0.z, j1.x, j1.y, j1.z, 12, '#666');
      drawJoint3D(ctx, j0.x, j0.y, j0.z, 10, '#777');

      drawLine3D(ctx, j1.x, j1.y, j1.z, j2.x, j2.y, j2.z, 10, '#555');
      drawJoint3D(ctx, j1.x, j1.y, j1.z, 8, '#6c2e2e');

      drawLine3D(ctx, j2.x, j2.y, j2.z, j3.x, j3.y, j3.z, 8, '#444');
      drawJoint3D(ctx, j2.x, j2.y, j2.z, 6, '#6c2e2e');

      // Gripper
      drawGripper3D(ctx, j3.x, j3.y, j3.z, totalAngle2, baseAngle, grip);
      drawJoint3D(ctx, j3.x, j3.y, j3.z, 5, '#6c2e2e');

      // Draw shadow
      ctx.beginPath();
      ctx.ellipse(
        baseX + j3.x * 0.3,
        baseY + 15,
        20 + Math.abs(j3.x) * 0.1,
        5,
        0, 0, Math.PI * 2
      );
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        className="w-full max-w-md"
        style={{ imageRendering: 'auto' }}
      />
      <p className="text-muted text-xs tracking-wider">
        c y b e r g e n e t i c s
      </p>
    </div>
  );
}
