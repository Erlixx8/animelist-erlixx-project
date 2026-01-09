import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Tag, Check } from 'lucide-react';

const CustomSelect = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between bg-[#0b1622] text-sm font-medium rounded-lg border px-4 py-3 transition-all ${isOpen ? 'border-yellow-500/50 ring-1 ring-yellow-500/50' : 'border-white/10 hover:border-white/20'} ${value ? 'text-white' : 'text-gray-400'}`}
        >
          <span className="truncate">{value || "Any"}</span>
          <ChevronDown className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} size={16} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-[#0b1622] border border-white/10 rounded-lg shadow-xl shadow-black/50 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-100">
            <div 
              onClick={() => { onChange(""); setIsOpen(false); }}
              className="px-4 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition-colors border-b border-white/5"
            >
              Any
            </div>
            {options.map((opt) => (
              <div 
                key={opt} 
                onClick={() => { onChange(opt); setIsOpen(false); }}
                className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${value === opt ? 'bg-yellow-500/10 text-yellow-500' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="truncate">{typeof opt === 'string' ? opt.replace('_', ' ') : opt}</span>
                {value === opt && <Check size={14} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Filters = ({ filters, setFilters }) => {
  
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: '' }));
  };

  const clearAll = () => {
    setFilters(prev => ({ ...prev, keyword: '', genre: '', year: '', season: '', format: '', page: 1 }));
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1943; year--) years.push(year);
  
  const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", 
    "Horror", "Mahou Shoujo", "Mecha", "Music", "Mystery", 
    "Psychological", "Romance", "Sci-Fi", "Slice of Life", 
    "Sports", "Supernatural", "Thriller"
  ];
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const formats = ["TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA"];

  const activeFilters = Object.entries(filters).filter(([key, value]) => value !== '' && key !== 'page');

  return (
    <div className="bg-[#152232] border border-white/5 rounded-2xl p-4 sm:p-6 mb-8 shadow-xl shadow-black/20 relative z-40">
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 mb-4">
        
        <div className="space-y-2 col-span-2 lg:col-span-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Search</label>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Type..." 
              value={filters.keyword}
              onChange={(e) => handleChange('keyword', e.target.value)}
              className="w-full bg-[#0b1622] text-white text-sm font-medium rounded-lg border border-white/10 pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all placeholder:text-gray-600"
            />
          </div>
        </div>

        <CustomSelect 
          label="Genres" 
          value={filters.genre} 
          options={genres} 
          onChange={(val) => handleChange('genre', val)} 
        />

        <CustomSelect 
          label="Year" 
          value={filters.year} 
          options={years} 
          onChange={(val) => handleChange('year', val)} 
        />

        <CustomSelect 
          label="Season" 
          value={filters.season} 
          options={seasons} 
          onChange={(val) => handleChange('season', val)} 
        />

        <CustomSelect 
          label="Format" 
          value={filters.format} 
          options={formats} 
          onChange={(val) => handleChange('format', val)} 
        />

      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/5 animate-fade-in">
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mr-2">
             <Tag size={14} /> Active Filters:
          </div>
          {activeFilters.map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 bg-[#3db4f2] text-[#0b1622] px-3 py-1.5 rounded-lg text-xs font-bold uppercase shadow-lg shadow-blue-500/20 transition-all hover:bg-[#3db4f2]/90">
              <span>{key === 'keyword' ? `"${value}"` : value.toString().replace('_', ' ')}</span>
              <button onClick={() => clearFilter(key)} className="bg-black/20 hover:bg-black/40 text-white rounded-full p-0.5 transition-colors">
                <X size={12} />
              </button>
            </div>
          ))}
          <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-300 font-bold underline decoration-dotted underline-offset-4 ml-auto">
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;