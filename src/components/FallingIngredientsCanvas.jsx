import React, { useEffect, useRef } from 'react';

export default function FallingIngredientsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const hero = canvas.parentElement;
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Image sources for raw Khizar Veelana cold-pressed ingredients
    const SOURCES = [
      '/assets/ingredients/amla.png',
      '/assets/ingredients/hibiscus.png',
      '/assets/ingredients/almond.png',
      '/assets/ingredients/coconut.png',
      '/assets/ingredients/rosemary.png',
    ];

    // 3 Parallax depth layers (Far, Mid, Near)
    const LAYERS = [
      { scale: 0.40, alpha: 0.35, speed: 0.35, blur: 2 },
      { scale: 0.70, alpha: 0.60, speed: 0.65, blur: 1 },
      { scale: 1.00, alpha: 0.90, speed: 1.00, blur: 0 },
    ];

    const rand = (min, max) => min + Math.random() * (max - min);

    let width = 0;
    let height = 0;
    let items = [];
    let sprites = [];
    let animFrameId = null;
    let isVisible = true;
    let observer = null;

    // Remove white background from generated images to create clean transparent sprites
    function createTransparentSprite(img) {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = img.naturalWidth || img.width || 100;
      offCanvas.height = img.naturalHeight || img.height || 100;
      const offCtx = offCanvas.getContext('2d');
      offCtx.drawImage(img, 0, 0);

      try {
        const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Key out background pixels near pure white or light grey background
          if (r > 230 && g > 230 && b > 230) {
            data[i + 3] = 0; // set alpha to transparent
          } else if (r > 210 && g > 210 && b > 210) {
            // Soft anti-aliased edge transparency
            const avg = (r + g + b) / 3;
            data[i + 3] = Math.round((255 - avg) * 4);
          }
        }
        offCtx.putImageData(imgData, 0, 0);
      } catch (e) {
        // Fallback if cross-origin canvas security blocks getImageData
      }
      return offCanvas;
    }

    // High-DPI canvas resizing
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth || window.innerWidth;
      height = hero.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Create a single ingredient item
    function makeItem(sprite, seeded = false) {
      const layer = LAYERS[Math.floor(rand(0, LAYERS.length))];
      const baseSize = rand(32, 54) * layer.scale;
      return {
        sprite,
        layer,
        x: rand(0, width),
        y: seeded ? rand(-40, height * 0.9) : rand(-height * 0.4, -40),
        size: baseSize,
        vy: rand(0.5, 1.2) * layer.speed,
        gravity: rand(0.015, 0.028) * layer.speed,
        angle: rand(0, Math.PI * 2),
        spin: rand(-0.015, 0.015),
        swayAmp: rand(8, 25) * layer.scale,
        swayRate: rand(0.005, 0.012),
        phase: rand(0, Math.PI * 2),
      };
    }

    // Populate scene with items (fewer on mobile for performance & clarity)
    function populate() {
      if (!sprites.length) return;
      const count = width < 768 ? 10 : 20;
      items = Array.from({ length: count }, () =>
        makeItem(sprites[Math.floor(rand(0, sprites.length))], true)
      );
    }

    // Main Draw loop
    function draw(timeSec) {
      ctx.clearRect(0, 0, width, height);

      for (const it of items) {
        const sway = Math.sin(timeSec * it.swayRate + it.phase) * it.swayAmp;

        ctx.save();
        ctx.globalAlpha = it.layer.alpha;
        if (it.layer.blur && ctx.filter) {
          ctx.filter = `blur(${it.layer.blur}px)`;
        } else {
          ctx.filter = 'none';
        }

        ctx.translate(it.x + sway, it.y);
        ctx.rotate(it.angle);
        ctx.drawImage(it.sprite, -it.size / 2, -it.size / 2, it.size, it.size);
        ctx.restore();
      }
    }

    // Physics step
    function step(timestamp) {
      const timeSec = timestamp * 0.001;

      for (const it of items) {
        it.vy += it.gravity;
        it.y += it.vy;
        it.angle += it.spin;

        // Reset past bottom of hero canvas
        if (it.y - it.size > height) {
          const fresh = makeItem(it.sprite, false);
          Object.assign(it, fresh);
        }
      }

      draw(timeSec);
      if (isVisible && !reducedMotion) {
        animFrameId = requestAnimationFrame(step);
      }
    }

    function start() {
      if (animFrameId !== null || reducedMotion) return;
      animFrameId = requestAnimationFrame(step);
    }

    function stop() {
      if (animFrameId !== null) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    // Load Image Promise
    function loadImage(src) {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(createTransparentSprite(img));
        img.onerror = () => resolve(null);
        img.src = src;
      });
    }

    // Load all ingredients and launch
    Promise.all(SOURCES.map(loadImage)).then((loaded) => {
      sprites = loaded.filter(Boolean);
      if (!sprites.length) return;

      resize();
      populate();

      if (reducedMotion) {
        draw(0);
        return;
      }

      // Intersection Observer to pause when scrolled out of hero view
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          isVisible ? start() : stop();
        }, { threshold: 0.1 });
        observer.observe(hero);
      } else {
        start();
      }

      // Tab visibility change
      const handleVisibilityChange = () => {
        if (document.hidden) {
          stop();
        } else if (isVisible) {
          start();
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      // Window resize debounce
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          resize();
          populate();
        }, 150);
      };
      window.addEventListener('resize', handleResize);
    });

    // Cleanup on component unmount
    return () => {
      stop();
      if (observer) observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="ingredient-fall"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
