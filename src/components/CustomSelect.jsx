import React, { useState, useRef, useEffect } from 'react';

const CustomSelect = ({ options = [], value, onChange, multiple = false, placeholder = 'Select...', disabledOptions = [], className = '' }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(search.toLowerCase()));

  const isSelected = (val) => {
    if (multiple) return Array.isArray(value) && value.includes(val);
    return value === val;
  };

  const handleSelect = (val) => {
    if (multiple) {
      if (isSelected(val)) {
        onChange(value.filter(v => v !== val));
      } else {
        onChange([...(value || []), val]);
      }
    } else {
      onChange(val);
      setOpen(false);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : '');
  };

  return (
    <div className={`relative max-w-[220px] ${className}`} ref={ref}>
      <div
        className="border border-gray_l rounded-[10px] px-4 py-2  flex items-center cursor-pointer  "
        onClick={() => setOpen(!open)}
      >
        <span className="flex-1 text-black text-base truncate">
          {multiple
            ? (Array.isArray(value) && value.length > 0
                ? options.filter(opt => value.includes(opt.value)).map(opt => opt.label).join(', ')
                : placeholder)
            : (options.find(opt => opt.value === value)?.label || placeholder)}
        </span>
        <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
      {open && (
        <div className="absolute z-50 left-0 mt-2 w-full bg-white rounded-xl shadow-lg p-4 flex flex-col gap-2 min-w-[220px]" style={{maxHeight: 320}}>
          <div className="flex items-center border rounded-lg px-2 py-1 mb-2 bg-gray-50">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              className="flex-1 bg-transparent outline-none border-none text-sm text-gray-700"
              placeholder="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto flex-1" style={{maxHeight: 180}}>
            {filteredOptions.length === 0 && (
              <div className="text-gray-400 text-center py-4">No options</div>
            )}
            {filteredOptions.map(opt => (
              <label key={opt.value} className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${disabledOptions.includes(opt.value) ? 'text-gray-300 cursor-not-allowed' : isSelected(opt.value) ? 'font-semibold' : ''}`}
                style={{userSelect: 'none'}}>
                <input
                  type={multiple ? 'checkbox' : 'radio'}
                  checked={isSelected(opt.value)}
                  disabled={disabledOptions.includes(opt.value)}
                  onChange={() => !disabledOptions.includes(opt.value) && handleSelect(opt.value)}
                  className="accent-main w-5 h-5"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
          <div
            className="flex justify-center items-center w-full  py-2 rounded-lg bg-lightFailed text-danger text-base font-medium hover:bg-red-100 transition"
            onClick={handleReset}
            type="button"
          >
            Reset
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect; 