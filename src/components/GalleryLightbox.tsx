"use client";

import { useEffect, useRef, useState } from "react";

type Photo = {
  src: string;
  alt: string;
};

export function GalleryLightbox({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const wasOpenRef = useRef(false);

  // Move focus to close button only on the closed -> open transition,
  // not on every index change while already open (arrow keys / prev/next).
  useEffect(() => {
    const isOpen = openIndex !== null;
    if (isOpen && !wasOpenRef.current && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
    wasOpenRef.current = isOpen;
  }, [openIndex]);

  // Return focus to thumbnail when lightbox closes
  useEffect(() => {
    if (openIndex === null && clickedIndex !== null) {
      const thumbnail = thumbnailRefs.current[clickedIndex];
      if (thumbnail) {
        thumbnail.focus();
      }
    }
  }, [openIndex, clickedIndex]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));

      // Focus trap for Tab key
      if (e.key === "Tab") {
        const focusableElements = [closeButtonRef.current, prevButtonRef.current, nextButtonRef.current].filter(Boolean);
        if (focusableElements.length === 0) return;

        const currentFocus = document.activeElement;
        const currentIndex = focusableElements.indexOf(currentFocus as HTMLButtonElement);

        if (e.shiftKey) {
          // Shift+Tab: move to previous element
          e.preventDefault();
          const nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
          (focusableElements[nextIndex] as HTMLButtonElement).focus();
        } else {
          // Tab: move to next element
          e.preventDefault();
          const nextIndex = currentIndex < 0 || currentIndex >= focusableElements.length - 1 ? 0 : currentIndex + 1;
          (focusableElements[nextIndex] as HTMLButtonElement).focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex, photos.length]);

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            ref={(el) => {
              thumbnailRefs.current[i] = el;
            }}
            type="button"
            className="gallery-cell"
            onClick={() => {
              setClickedIndex(i);
              setOpenIndex(i);
            }}
            aria-label={`Open photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpenIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="lightbox-close"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="5" y1="19" x2="19" y2="5" />
            </svg>
          </button>
          <button
            ref={prevButtonRef}
            type="button"
            className="lightbox-nav prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <img
            className="lightbox-image"
            src={photos[openIndex].src}
            alt={photos[openIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            ref={nextButtonRef}
            type="button"
            className="lightbox-nav next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
