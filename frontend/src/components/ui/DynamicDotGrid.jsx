import React, { useEffect, useRef } from 'react';

export default function DynamicDotGrid({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Mouse coordinates & hover states (strictly reactive on user hover)
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isHovering: false,
      hoverIntensity: 0 // 0 = calm rest, 1 = active on hover
    };

    const SPACING = 24; // Distance between notebook dots
    const HOVER_RADIUS = 200; // Interaction radius

    // Resize canvas
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.offsetWidth || window.innerWidth;
      height = parent.offsetHeight || window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inBounds = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      if (inBounds) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.isHovering = true;
        if (mouse.x < -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        }
      } else {
        mouse.isHovering = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const inBounds = (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        );

        if (inBounds) {
          mouse.targetX = touch.clientX - rect.left;
          mouse.targetY = touch.clientY - rect.top;
          mouse.isHovering = true;
          if (mouse.x < -1000) {
            mouse.x = mouse.targetX;
            mouse.y = mouse.targetY;
          }
        } else {
          mouse.isHovering = false;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    // Animation render loop
    const render = () => {
      if (mouse.isHovering) {
        mouse.hoverIntensity += (1 - mouse.hoverIntensity) * 0.15;
        mouse.x += (mouse.targetX - mouse.x) * 0.22;
        mouse.y += (mouse.targetY - mouse.y) * 0.22;
      } else {
        mouse.hoverIntensity += (0 - mouse.hoverIntensity) * 0.1;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle twilight-plum spotlight wash around cursor on hover
      if (mouse.hoverIntensity > 0.01) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          HOVER_RADIUS * 1.3
        );
        gradient.addColorStop(0, `rgba(71, 57, 130, ${0.05 * mouse.hoverIntensity})`);
        gradient.addColorStop(0.6, `rgba(71, 57, 130, ${0.015 * mouse.hoverIntensity})`);
        gradient.addColorStop(1, 'rgba(71, 57, 130, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Render Notebook Dotted Grid on Parchment
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;

          let radius = 1.0;
          let alpha = 0.12;
          let color = `rgba(1, 1, 27, ${alpha})`; // Ink Violet base

          if (mouse.hoverIntensity > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < HOVER_RADIUS) {
              const proximity = (1 - dist / HOVER_RADIUS) * mouse.hoverIntensity;
              const factor = Math.pow(proximity, 1.4);
              radius = 1.0 + factor * 2.2;
              alpha = 0.12 + factor * 0.65;
              color = `rgba(71, 57, 130, ${alpha})`; // Twilight plum bloom
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // 3. Dense sub-grid infill micro-dots near cursor on hover
          if (mouse.hoverIntensity > 0.01) {
            const subX = x + SPACING / 2;
            const subY = y + SPACING / 2;

            if (subX < width && subY < height) {
              const subDx = subX - mouse.x;
              const subDy = subY - mouse.y;
              const subDist = Math.sqrt(subDx * subDx + subDy * subDy);

              if (subDist < HOVER_RADIUS * 0.85) {
                const subProximity = (1 - subDist / (HOVER_RADIUS * 0.85)) * mouse.hoverIntensity;
                const subFactor = Math.pow(subProximity, 1.7);
                const subRadius = Math.max(0.6, subFactor * 1.8);
                const subAlpha = subFactor * 0.55;

                ctx.beginPath();
                ctx.arc(subX, subY, subRadius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(111, 99, 183, ${subAlpha})`; // Amethyst
                ctx.fill();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
