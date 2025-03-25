import React, { useRef, useState } from 'react';

const FileUpload = ({
  accept,
  multiple = false,
  maxSize = 5242880, // 5MB
  maxFiles = 5,
  onUpload,
  onError,
  preview = true,
  dragDrop = true,
  className = ''
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // Check file type
    if (accept && !accept.split(',').some(type => file.type.match(type.trim()))) {
      throw new Error(`File type ${file.type} is not supported`);
    }

    // Check file size
    if (file.size > maxSize) {
      throw new Error(`File size exceeds ${formatBytes(maxSize)}`);
    }
  };

  const handleFiles = (fileList) => {
    setError(null);

    try {
      const newFiles = Array.from(fileList);

      // Check number of files
      if (!multiple && newFiles.length > 1) {
        throw new Error('Only one file can be uploaded');
      }

      if (multiple && newFiles.length + files.length > maxFiles) {
        throw new Error(`Maximum ${maxFiles} files can be uploaded`);
      }

      // Validate each file
      newFiles.forEach(validateFile);

      // Add files to state
      const updatedFiles = multiple
        ? [...files, ...newFiles]
        : newFiles;

      setFiles(updatedFiles);
      onUpload?.(updatedFiles);
    } catch (err) {
      setError(err.message);
      onError?.(err.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload?.(updatedFiles);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'fas fa-image';
    if (type.startsWith('video/')) return 'fas fa-video';
    if (type.startsWith('audio/')) return 'fas fa-music';
    if (type.includes('pdf')) return 'fas fa-file-pdf';
    if (type.includes('word')) return 'fas fa-file-word';
    if (type.includes('excel') || type.includes('sheet')) return 'fas fa-file-excel';
    return 'fas fa-file';
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
          ${dragDrop ? 'cursor-pointer' : ''}
        `}
        onClick={() => dragDrop && fileInputRef.current?.click()}
        onDragOver={dragDrop ? handleDragOver : undefined}
        onDragLeave={dragDrop ? handleDragLeave : undefined}
        onDrop={dragDrop ? handleDrop : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="space-y-2">
          <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
          <div className="text-gray-600">
            {dragDrop ? (
              <>
                <span className="font-medium text-indigo-600">
                  Click to upload
                </span>{' '}
                or drag and drop
              </>
            ) : (
              <span className="font-medium text-indigo-600">
                Click to upload
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {accept && `Supported formats: ${accept}`}
            {maxSize && ` • Max size: ${formatBytes(maxSize)}`}
            {multiple && ` • Max files: ${maxFiles}`}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </div>
      )}

      {/* File Preview */}
      {preview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <i className={`${getFileIcon(file.type)} text-gray-400`}></i>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatBytes(file.size)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Image Upload
export const ImageUpload = ({
  value,
  onChange,
  aspectRatio,
  preview = true,
  maxSize = 5242880,
  className = ''
}) => {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (file) => {
    setError(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`Image size exceeds ${formatBytes(maxSize)}`);
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        // Create image element to check dimensions
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          if (aspectRatio) {
            const ratio = img.width / img.height;
            const expectedRatio = eval(aspectRatio);
            if (Math.abs(ratio - expectedRatio) > 0.1) {
              setError(`Please upload an image with ${aspectRatio} aspect ratio`);
              return;
            }
          }
          onChange(e.target.result);
        };
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
    }
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {/* Upload Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          />
          
          {value && preview ? (
            <div className="relative group">
              <img
                src={value}
                alt="Preview"
                className={`
                  rounded-lg object-cover
                  ${aspectRatio === '1/1' ? 'w-32 h-32' : 'w-48 h-32'}
                `}
              />
              <div className="
                absolute inset-0 flex items-center justify-center
                bg-black bg-opacity-50 rounded-lg opacity-0
                group-hover:opacity-100 transition-opacity
              ">
                <span className="text-white text-sm">Change Image</span>
              </div>
            </div>
          ) : (
            <div className={`
              flex flex-col items-center justify-center
              border-2 border-dashed border-gray-300 rounded-lg
              ${aspectRatio === '1/1' ? 'w-32 h-32' : 'w-48 h-32'}
              hover:border-indigo-500 hover:bg-indigo-50
            `}>
              <i className="fas fa-camera text-gray-400 text-2xl mb-2"></i>
              <span className="text-sm text-gray-500">Upload Image</span>
            </div>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          <i className="fas fa-exclamation-circle mr-1"></i>
          {error}
        </div>
      )}

      {/* Requirements */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        {aspectRatio && `Aspect ratio: ${aspectRatio} •`}
        {` Max size: ${formatBytes(maxSize)}`}
      </div>
    </div>
  );
};

// Example usage:
/*
import FileUpload, { ImageUpload } from './components/FileUpload';

// Basic File Upload
<FileUpload
  accept=".pdf,.doc,.docx"
  onUpload={(files) => console.log('Uploaded files:', files)}
  onError={(error) => console.error('Upload error:', error)}
/>

// Multiple File Upload
<FileUpload
  multiple
  maxFiles={3}
  maxSize={10485760} // 10MB
  accept="image/*"
/>

// Image Upload with Aspect Ratio
<ImageUpload
  value={imageUrl}
  onChange={setImageUrl}
  aspectRatio="1/1"
  maxSize={5242880} // 5MB
/>

// Customized File Upload
<FileUpload
  accept="image/*,video/*"
  multiple
  maxSize={20971520} // 20MB
  maxFiles={10}
  preview={true}
  dragDrop={true}
  className="max-w-xl mx-auto"
  onUpload={(files) => {
    console.log('Uploaded files:', files);
    // Handle file upload to server
  }}
  onError={(error) => {
    console.error('Upload error:', error);
    // Show error message to user
  }}
/>
*/

export default FileUpload;