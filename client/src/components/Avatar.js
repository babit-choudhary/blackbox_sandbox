import React from 'react';

const Avatar = ({
  src,
  alt,
  size = 'md',
  initials,
  status,
  shape = 'circle',
  bordered = false,
  className = ''
}) => {
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-xs';
      case 'sm':
        return 'w-8 h-8 text-sm';
      case 'lg':
        return 'w-12 h-12 text-lg';
      case 'xl':
        return 'w-16 h-16 text-xl';
      case '2xl':
        return 'w-20 h-20 text-2xl';
      default:
        return 'w-10 h-10 text-base';
    }
  };

  // Get status classes
  const getStatusClasses = () => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'offline':
        return 'bg-gray-400';
      case 'busy':
        return 'bg-red-400';
      case 'away':
        return 'bg-yellow-400';
      default:
        return '';
    }
  };

  // Get status size based on avatar size
  const getStatusSize = () => {
    switch (size) {
      case 'xs':
        return 'w-1.5 h-1.5';
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-3.5 h-3.5';
      case 'xl':
        return 'w-4 h-4';
      case '2xl':
        return 'w-5 h-5';
      default:
        return 'w-3 h-3';
    }
  };

  // Get background color for initials
  const getInitialsBackground = () => {
    const colors = [
      'bg-red-500',
      'bg-yellow-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500'
    ];
    
    if (!initials) return colors[0];
    
    // Use initials to deterministically select a color
    const index = initials
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    
    return colors[index];
  };

  return (
    <div className="relative inline-block">
      {src ? (
        // Image Avatar
        <img
          src={src}
          alt={alt}
          className={`
            object-cover
            ${getSizeClasses()}
            ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
            ${bordered ? 'border-2 border-white ring-2 ring-gray-200' : ''}
            ${className}
          `}
        />
      ) : (
        // Initials Avatar
        <div
          className={`
            flex items-center justify-center text-white font-medium
            ${getSizeClasses()}
            ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
            ${bordered ? 'border-2 border-white ring-2 ring-gray-200' : ''}
            ${getInitialsBackground()}
            ${className}
          `}
        >
          {initials}
        </div>
      )}

      {/* Status Indicator */}
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-white
            ${getStatusClasses()}
            ${getStatusSize()}
          `}
        />
      )}
    </div>
  );
};

// Avatar Group
export const AvatarGroup = ({
  avatars,
  max = 3,
  size = 'md',
  shape = 'circle',
  bordered = true,
  className = ''
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          shape={shape}
          bordered={bordered}
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            flex items-center justify-center bg-gray-200 text-gray-600 font-medium
            ${getSizeClasses(size)}
            ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'}
            ${bordered ? 'border-2 border-white ring-2 ring-gray-200' : ''}
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

// Example usage:
/*
import Avatar, { AvatarGroup } from './components/Avatar';

// Basic Avatar with Image
<Avatar
  src="path/to/image.jpg"
  alt="User Name"
  size="md"
/>

// Avatar with Initials
<Avatar
  initials="JD"
  size="lg"
/>

// Avatar with Status
<Avatar
  src="path/to/image.jpg"
  alt="User Name"
  status="online"
/>

// Square Avatar
<Avatar
  src="path/to/image.jpg"
  alt="User Name"
  shape="square"
/>

// Bordered Avatar
<Avatar
  src="path/to/image.jpg"
  alt="User Name"
  bordered
/>

// Different Sizes
<div className="space-x-2">
  <Avatar size="xs" initials="XS" />
  <Avatar size="sm" initials="SM" />
  <Avatar size="md" initials="MD" />
  <Avatar size="lg" initials="LG" />
  <Avatar size="xl" initials="XL" />
  <Avatar size="2xl" initials="2X" />
</div>

// Avatar Group
const avatars = [
  {
    src: "path/to/image1.jpg",
    alt: "User 1"
  },
  {
    src: "path/to/image2.jpg",
    alt: "User 2"
  },
  {
    initials: "JD",
    alt: "John Doe"
  },
  {
    src: "path/to/image4.jpg",
    alt: "User 4"
  }
];

<AvatarGroup
  avatars={avatars}
  max={3}
  size="md"
/>
*/

export default Avatar;