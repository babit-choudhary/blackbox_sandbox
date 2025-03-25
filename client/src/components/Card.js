import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  actions,
  footer,
  className = '',
  noPadding = false,
  hoverable = false,
  loading = false
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow
        ${hoverable ? 'transition-shadow hover:shadow-lg' : ''}
        ${className}
      `}
    >
      {/* Card Header */}
      {(title || subtitle || icon || actions) && (
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="text-gray-400">
                <i className={icon}></i>
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Card Content */}
      <div className={!noPadding ? 'p-6' : ''}>
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          children
        )}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 border-t bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

// Card variants
export const InfoCard = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  className = '',
  loading = false
}) => {
  const getTrendColor = () => {
    if (!trend) return '';
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getTrendIcon = () => {
    if (!trend) return '';
    return trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
  };

  return (
    <Card className={className} noPadding loading={loading}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          </div>
          {icon && (
            <div className="p-3 bg-gray-100 rounded-full">
              <i className={`${icon} text-gray-600`}></i>
            </div>
          )}
        </div>
        {(trend || trendLabel) && (
          <div className="mt-4 flex items-center">
            {trend && (
              <span className={`${getTrendColor()} flex items-center text-sm`}>
                <i className={`${getTrendIcon()} mr-1`}></i>
                {Math.abs(trend)}%
              </span>
            )}
            {trendLabel && (
              <span className="text-gray-500 text-sm ml-2">
                {trendLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export const StatsCard = ({
  title,
  stats,
  className = '',
  loading = false
}) => {
  return (
    <Card className={className} loading={loading}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative bg-gray-50 pt-5 px-4 sm:pt-6 sm:px-6 rounded-lg"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.label}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stat.value}
            </dd>
            {stat.trend && (
              <div className="absolute bottom-4 inset-x-4 sm:inset-x-6">
                <div className="text-sm">
                  <span
                    className={`font-semibold ${
                      stat.trend > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                  </span>
                  {' '}
                  <span className="text-gray-500">{stat.trendLabel}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </dl>
    </Card>
  );
};

export const ProfileCard = ({
  name,
  title,
  avatar,
  stats,
  actions,
  className = '',
  loading = false
}) => {
  return (
    <Card className={className} loading={loading}>
      <div className="text-center">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>
        {title && (
          <p className="text-sm text-gray-500">{title}</p>
        )}
        {stats && (
          <div className="mt-4 flex justify-center space-x-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <span className="text-xl font-semibold text-gray-900">
                  {stat.value}
                </span>
                <span className="block text-sm text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
        {actions && (
          <div className="mt-6 flex justify-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </Card>
  );
};

// Example usage:
/*
import Card, { InfoCard, StatsCard, ProfileCard } from './components/Card';

// Basic Card
<Card
  title="Card Title"
  subtitle="Card subtitle"
  icon="fas fa-star"
  actions={
    <button className="btn-primary">
      Action
    </button>
  }
  footer={
    <div className="text-right">
      Footer content
    </div>
  }
>
  Card content goes here
</Card>

// Info Card
<InfoCard
  title="Total Revenue"
  value="₹45,231"
  icon="fas fa-rupee-sign"
  trend={12}
  trendLabel="vs last month"
/>

// Stats Card
<StatsCard
  title="Last 30 days"
  stats={[
    {
      label: "Total Sales",
      value: "₹35,600",
      trend: 12,
      trendLabel: "vs last month"
    },
    {
      label: "Orders",
      value: "156",
      trend: -3,
      trendLabel: "vs last month"
    }
  ]}
/>

// Profile Card
<ProfileCard
  name="John Doe"
  title="Software Engineer"
  avatar="path/to/avatar.jpg"
  stats={[
    { label: "Projects", value: "12" },
    { label: "Followers", value: "1.2k" }
  ]}
  actions={
    <>
      <button className="btn-primary">Follow</button>
      <button className="btn-secondary">Message</button>
    </>
  }
/>
*/

export default Card;