import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Layers } from 'lucide-react';

export function HeaderFilterBar({
  searchValue = '',
  onSearchChange,
  placeholder = "Search destinations, stories, activities...",
  groupOptions = [],
  activeGroup = '',
  onGroupChange,
  filterOptions = [],
  activeFilter = '',
  onFilterChange,
  sortOptions = [],
  activeSort = '',
  onSortChange,
  className = ''
}) {
  return (
    <div className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4 ${className}`}>
      {/* Left Search Bar (Rounded pill input) */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#76777d]" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#e6e3dc] rounded-full text-sm text-[#1c1c18] placeholder-[#76777d] focus:outline-none focus:border-[#1c1c18] focus:ring-1 focus:ring-[#1c1c18] transition-all shadow-2xs"
        />
      </div>

      {/* Right Controls: Group by, Filter, Sort by Pill Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        {groupOptions.length > 0 && (
          <div className="relative inline-flex items-center">
            <select
              value={activeGroup}
              onChange={(e) => onGroupChange && onGroupChange(e.target.value)}
              className="appearance-none bg-white border border-[#e6e3dc] hover:border-[#1c1c18] rounded-full pl-8 pr-7 py-2 text-xs font-medium text-[#46464c] hover:text-[#1c1c18] cursor-pointer focus:outline-none transition-colors"
            >
              <option value="">Group by: None</option>
              {groupOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Group by: {opt.label}</option>
              ))}
            </select>
            <Layers className="absolute left-3 w-3.5 h-3.5 text-[#76777d] pointer-events-none" />
          </div>
        )}

        {filterOptions.length > 0 && (
          <div className="relative inline-flex items-center">
            <select
              value={activeFilter}
              onChange={(e) => onFilterChange && onFilterChange(e.target.value)}
              className="appearance-none bg-white border border-[#e6e3dc] hover:border-[#1c1c18] rounded-full pl-8 pr-7 py-2 text-xs font-medium text-[#46464c] hover:text-[#1c1c18] cursor-pointer focus:outline-none transition-colors"
            >
              <option value="all">Filter: All</option>
              {filterOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Filter: {opt.label}</option>
              ))}
            </select>
            <SlidersHorizontal className="absolute left-3 w-3.5 h-3.5 text-[#76777d] pointer-events-none" />
          </div>
        )}

        {sortOptions.length > 0 && (
          <div className="relative inline-flex items-center">
            <select
              value={activeSort}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className="appearance-none bg-white border border-[#e6e3dc] hover:border-[#1c1c18] rounded-full pl-8 pr-7 py-2 text-xs font-medium text-[#46464c] hover:text-[#1c1c18] cursor-pointer focus:outline-none transition-colors"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Sort by: {opt.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-[#76777d] pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
}
