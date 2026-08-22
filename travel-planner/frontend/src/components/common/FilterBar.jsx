import React from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Layers } from 'lucide-react';

export default function FilterBar({
  searchQuery = '',
  onSearchChange = () => {},
  searchPlaceholder = 'Search destinations, trips, or activities...',
  activeFilter = 'All',
  onFilterChange = () => {},
  filterOptions = ['All', 'Ongoing', 'Upcoming', 'Completed'],
  sortBy = 'Date',
  onSortChange = () => {},
  sortOptions = ['Date', 'Name', 'Budget', 'Duration'],
  showGroupBy = true,
  groupBy = 'None',
  onGroupByChange = () => {},
  groupByOptions = ['None', 'Region', 'Status', 'Season'],
}) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 py-4">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-11 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-black/10 rounded-full text-sm placeholder:text-ink-muted text-ink focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all shadow-sm"
        />
      </div>

      {/* Filter / Sort / Group Controls */}
      <div className="flex items-center flex-wrap gap-2">
        {/* Filter Pills */}
        {filterOptions && filterOptions.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-black/10 rounded-full">
            <SlidersHorizontal className="w-3.5 h-3.5 ml-2 text-ink-muted hidden sm:inline" />
            {filterOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => onFilterChange(opt)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === opt
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink hover:bg-black/5'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* Sort Pill Dropdown/Toggle */}
        {sortOptions && sortOptions.length > 0 && (
          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white/80 border border-black/10 hover:border-black/20 text-ink-secondary hover:text-ink pl-8 pr-8 py-2 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all shadow-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  Sort: {opt}
                </option>
              ))}
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-muted absolute left-3 pointer-events-none" />
          </div>
        )}

        {/* Group By Pill */}
        {showGroupBy && groupByOptions && groupByOptions.length > 0 && (
          <div className="relative inline-flex items-center">
            <select
              value={groupBy}
              onChange={(e) => onGroupByChange(e.target.value)}
              className="appearance-none bg-white/80 border border-black/10 hover:border-black/20 text-ink-secondary hover:text-ink pl-8 pr-8 py-2 rounded-full text-xs font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all shadow-sm"
            >
              {groupByOptions.map((opt) => (
                <option key={opt} value={opt}>
                  Group: {opt}
                </option>
              ))}
            </select>
            <Layers className="w-3.5 h-3.5 text-ink-muted absolute left-3 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
}
