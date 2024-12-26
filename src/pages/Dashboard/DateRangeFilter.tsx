import React from 'react';
import { Calendar } from 'lucide-react';

export function DateRangeFilter() {
  return (
    <div className="flex items-center space-x-2">
      <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        <option value="today">Today</option>
        <option value="7days">Last 7 days</option>
        <option value="30days">Last 30 days</option>
        <option value="custom">Custom Range</option>
      </select>
      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Calendar className="h-4 w-4 mr-2" />
        Custom
      </button>
    </div>
  );
}
