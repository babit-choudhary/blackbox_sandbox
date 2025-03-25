import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ImageGallery = ({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = '4/3',
  lightbox = true,
  thumbnails = true,
  className = ''
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          setSelectedIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setSelectedIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          );
          break;
        case 'Escape':
          setIsLightboxOpen(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  const openLightbox = (index) => {
    if (lightbox) {
      setSelectedIndex(index);
      setIsLightboxOpen(true);
    }
  };

  return (
    <div className={className}>
      {/* Grid Gallery */}
      <div
        className={`
          grid gap-${gap}
          grid-cols-1
          sm:grid-cols-2
          ${columns >= 3 ? 'lg:grid-cols-3' : ''}
          ${columns >= 4 ? 'xl:grid-cols-4' : ''}
        `}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`
              relative overflow-hidden rounded-lg
              ${lightbox ? 'cursor-pointer' : ''}
              group
            `}
            style={{ aspectRatio }}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="
                w-full h-full object-cover
                transition-transform duration-300
                group-hover:scale-110
              "
            />
            {image.caption && (
              <div className="
                absolute inset-x-0 bottom-0 p-4
                bg-gradient-to-t from-black/60 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
              ">
                <p className="text-white text-sm">
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && selectedIndex !== null && (
        <Lightbox
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={() => setSelectedIndex(prev => 
            prev === 0 ? images.length - 1 : prev - 1
          )}
          onNext={() => setSelectedIndex(prev =>
            prev === images.length - 1 ? 0 : prev + 1
          )}
          showThumbnails={thumbnails}
          onThumbnailClick={setSelectedIndex}
        />
      )}
    </div>
  );
};

// Lightbox Component
const Lightbox = ({
  images,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
  showThumbnails,
  onThumbnailClick
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
      >
        <i className="fas fa-times text-2xl"></i>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
      >
        <i className="fas fa-chevron-left text-2xl"></i>
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300"
      >
        <i className="fas fa-chevron-right text-2xl"></i>
      </button>

      {/* Main Image */}
      <div className="h-full flex items-center justify-center p-4">
        <img
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt || `Image ${selectedIndex + 1}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Caption */}
      {images[selectedIndex].caption && (
        <div className="absolute bottom-20 inset-x-0 text-center text-white p-4">
          <p>{images[selectedIndex].caption}</p>
        </div>
      )}

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50">
          <div className="flex justify-center items-center p-4 space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onThumbnailClick(index)}
                className={`
                  flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden
                  ${selectedIndex === index ? 'ring-2 ring-white' : ''}
                `}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

// Masonry Layout
export const MasonryGallery = ({
  images,
  columns = 3,
  gap = 4,
  className = ''
}) => {
  // Distribute images into columns
  const distributeImages = () => {
    const cols = Array.from({ length: columns }, () => []);
    images.forEach((image, index) => {
      cols[index % columns].push(image);
    });
    return cols;
  };

  return (
    <div
      className={`
        grid gap-${gap}
        grid-cols-1
        sm:grid-cols-2
        ${columns >= 3 ? 'lg:grid-cols-3' : ''}
        ${columns >= 4 ? 'xl:grid-cols-4' : ''}
        ${className}
      `}
    >
      {distributeImages().map((column, colIndex) => (
        <div key={colIndex} className={`flex flex-col gap-${gap}`}>
          {column.map((image, imgIndex) => (
            <div
              key={imgIndex}
              className="relative overflow-hidden rounded-lg group"
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt || `Image ${imgIndex + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.caption && (
                <div className="
                  absolute inset-x-0 bottom-0 p-4
                  bg-gradient-to-t from-black/60 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                ">
                  <p className="text-white text-sm">
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Example usage:
/*
import ImageGallery, { MasonryGallery } from './components/ImageGallery';

const images = [
  {
    src: '/path/to/image1.jpg',
    thumbnail: '/path/to/thumbnail1.jpg', // Optional
    alt: 'Image 1',
    caption: 'Beautiful landscape' // Optional
  },
  {
    src: '/path/to/image2.jpg',
    alt: 'Image 2'
  },
  // ... more images
];

// Basic Gallery
<ImageGallery
  images={images}
  columns={3}
  gap={4}
  aspectRatio="4/3"
  lightbox
  thumbnails
/>

// Masonry Gallery
<MasonryGallery
  images={images}
  columns={3}
  gap={4}
/>

// Gallery without lightbox
<ImageGallery
  images={images}
  columns={4}
  lightbox={false}
/>

// Gallery with custom layout
<ImageGallery
  images={images}
  columns={2}
  aspectRatio="16/9"
  className="max-w-4xl mx-auto"
/>
*/

export default ImageGallery;