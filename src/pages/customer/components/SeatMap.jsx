import React from 'react';
const seatRows = [
  ['A1', 'A2', 'A3', 'A4', 'A5'],
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['C1', 'C2', 'C3', 'C4', 'C5'],
];
const occupied = ['A2', 'B3', 'C5'];

const SeatMap = ({ selected, onSelect, max=2 }) => (
  <div className="inline-block p-4 bg-green-50 rounded-lg border-2 border-green-200">
    <div className="grid gap-2">
      {seatRows.map((row, ri) => (
        <div key={ri} className="flex gap-2">
          {row.map(seat => {
            const isSelected = selected.includes(seat);
            const isOccupied = occupied.includes(seat);
            return (
              <button
                key={seat}
                className={
                  "seat w-10 h-10 rounded flex items-center justify-center " +
                  (isOccupied ? 'bg-gray-300 text-gray-400 cursor-not-allowed' :
                    isSelected ? 'bg-green-600 text-white' :
                    'bg-white text-green-600 border border-green-400 hover:bg-green-200')
                }
                disabled={isOccupied || (!isSelected && selected.length>=max)}
                onClick={()=>onSelect(seat)}
                type="button"
              >
                {seat}
              </button>
            )
          })}
        </div>
      ))}
    </div>
    <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
      <span className="w-4 h-4 bg-green-600 inline-block rounded align-middle" /> Ghế chọn &nbsp;
      <span className="w-4 h-4 bg-gray-300 inline-block rounded align-middle border" /> Đã bán
      <span className="w-4 h-4 ml-3 bg-white border border-green-400 inline-block rounded align-middle" /> Trống
    </div>
  </div>
);
export default SeatMap;
