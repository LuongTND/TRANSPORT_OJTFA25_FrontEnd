import React, { useState, useRef, useEffect } from 'react';

const locations = [
  'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Nha Trang', 'Huế', 'Sài Gòn', 'Cần Thơ',
  'Thanh Khê', 'Hải Châu', 'Sơn Trà', 'Liên Chiểu', 'Cẩm Lệ', 'Ngũ Hành Sơn',
  'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7',
  'Bình Thạnh', 'Gò Vấp', 'Tân Bình', 'Tân Phú', 'Phú Nhuận', 'Thủ Đức'
];

const LocationInput = ({ value, onChange, placeholder, onSelect }) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = locations.filter(loc => 
        loc.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleSuggestionClick = (location) => {
    setInputValue(location);
    onChange(location);
    setShowSuggestions(false);
    if (onSelect) onSelect(location);
  };

  return (
    <div className="relative w-full md:w-48">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(inputValue.length > 0 && filteredLocations.length > 0)}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto"
        >
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => handleSuggestionClick(location)}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchBox = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
      <LocationInput
        value={from}
        onChange={setFrom}
        placeholder="Điểm đi"
      />
      <span className="mx-1 font-bold text-lg hidden md:inline">→</span>
      <LocationInput
        value={to}
        onChange={setTo}
        placeholder="Điểm đến"
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="input input-bordered w-full md:w-40"
      />
      <button className="btn btn-primary w-full md:w-auto">Tìm chuyến</button>
    </div>
  );
};

export default SearchBox;
