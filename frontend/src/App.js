import React, { useMemo, useState, useEffect, useCallback } from 'react';
import './App.css';

/**
 * Ocean Professional theme constants
 */
const THEME = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
};

/**
 * Sample assets local to the app (placed in public/assets)
 * We keep a stable initial array as a lightweight data model.
 */
const DEFAULT_IMAGES = [
  { id: 'img1', src: '/assets/sample1.jpg', alt: 'Ocean cliffs' },
  { id: 'img2', src: '/assets/sample2.jpg', alt: 'Amber sunrise' },
  { id: 'img3', src: '/assets/sample3.jpg', alt: 'Blue waters' },
  { id: 'img4', src: '/assets/sample4.jpg', alt: 'Sailing boats' },
  { id: 'img5', src: '/assets/sample5.jpg', alt: 'City skyline' },
  { id: 'img6', src: '/assets/sample6.jpg', alt: 'Forest path' },
  { id: 'img7', src: '/assets/sample7.jpg', alt: 'Mountain ridge' },
];

/**
 * DockItem component: a single thumbnail that magnifies on hover.
 */
// PUBLIC_INTERFACE
function DockItem({ image, isActive, onSelect, hoverIndex, index, baseSize = 56, scaleRange = 1.8, radius = 14 }) {
  /** Compute scale based on distance from hoverIndex for a subtle macOS dock effect */
  const scale = useMemo(() => {
    if (hoverIndex == null) return 1;
    const distance = Math.abs(index - hoverIndex);
    if (distance === 0) return scaleRange;
    if (distance === 1) return 1 + (scaleRange - 1) * 0.6;
    if (distance === 2) return 1 + (scaleRange - 1) * 0.25;
    return 1;
  }, [hoverIndex, index, scaleRange]);

  const size = baseSize * scale;

  return (
    <button
      className="dock-item"
      onClick={() => onSelect(image)}
      aria-label={`Select ${image.alt || 'image'}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        boxShadow: isActive
          ? `0 8px 24px rgba(37, 99, 235, 0.25), 0 2px 6px rgba(0,0,0,0.12)`
          : `0 6px 18px rgba(0,0,0,0.12)`,
        transform: `translateY(${isActive ? '-2px' : '0'})`,
        border: isActive ? `2px solid ${THEME.primary}` : '2px solid transparent',
        backgroundImage: `url('${image.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundColor: THEME.surface,
      }}
    />
  );
}

/**
 * Dock component: fixed bar at the bottom with magnifying thumbnails.
 */
// PUBLIC_INTERFACE
function Dock({ images, currentId, onSelect }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseLeave = () => setHoverIndex(null);

  return (
    <div className="dock-container" role="toolbar" aria-label="Image dock">
      <div
        className="dock"
        onMouseLeave={handleMouseLeave}
      >
        {images.map((img, i) => (
          <div
            className="dock-item-wrapper"
            key={img.id}
            onMouseEnter={() => setHoverIndex(i)}
          >
            <DockItem
              image={img}
              isActive={img.id === currentId}
              onSelect={onSelect}
              index={i}
              hoverIndex={hoverIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * PreviewPane: shows currently selected image above the dock with transitions.
 */
// PUBLIC_INTERFACE
function PreviewPane({ image }) {
  return (
    <div className="preview-pane" aria-live="polite">
      <div className="preview-card">
        <div className="preview-media" style={{ backgroundImage: `url('${image?.src}')` }} />
        <div className="preview-meta">
          <h1 className="preview-title">{image?.alt || 'Selected Image'}</h1>
        </div>
      </div>
    </div>
  );
}

/**
 * Controls: next/prev + index indicator
 */
// PUBLIC_INTERFACE
function Controls({ onPrev, onNext, currentIndex, total }) {
  return (
    <div className="controls">
      <button className="btn" onClick={onPrev} aria-label="Previous image">
        ‹ Prev
      </button>
      <span className="counter" aria-label={`Image ${currentIndex + 1} of ${total}`}>
        {currentIndex + 1} / {total}
      </span>
      <button className="btn btn-primary" onClick={onNext} aria-label="Next image">
        Next ›
      </button>
    </div>
  );
}

/**
 * Root App: orchestrates image list, selection, preview and dock
 */
// PUBLIC_INTERFACE
function App() {
  /**
   * The model: a simple, static array that can be extended to use env/config later.
   * We do not depend on env vars for basic functionality.
   */
  const [images] = useState(DEFAULT_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = images[currentIndex];

  // Keyboard navigation (left/right arrows)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, images.length]);

  const selectById = useCallback((img) => {
    const idx = images.findIndex((i) => i.id === img.id);
    if (idx >= 0) setCurrentIndex(idx);
  }, [images]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  return (
    <div className="ocean-app">
      <div className="app-gradient" />
      <main className="content">
        <PreviewPane image={current} />
        <Controls
          onPrev={prev}
          onNext={next}
          currentIndex={currentIndex}
          total={images.length}
        />
      </main>
      <Dock images={images} currentId={current?.id} onSelect={selectById} />
    </div>
  );
}

export default App;
