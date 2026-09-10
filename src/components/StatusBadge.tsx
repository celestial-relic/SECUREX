import React from 'react';

export type BadgeVariant = 
  | 'critical' | 'high' | 'medium' | 'low' 
  | 'active' | 'verified' | 'restricted' 
  | 'confidential' | 'secret' | 'internal' 
  | 'info' | 'success' | 'warning' | 'danger';

interface StatusBadgeProps {
  label: string;
  variant: BadgeVariant;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, variant }) => {
  const getBadgeClass = (v: BadgeVariant) => {
    switch (v) {
      case 'critical':
      case 'danger':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
      case 'warning':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'active':
      case 'success':
      case 'verified':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'restricted':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'confidential':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'secret':
        return 'bg-gray-800 text-red-400 border-gray-700';
      case 'internal':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getBadgeClass(variant)}`}>
      {label}
    </span>
  );
};
