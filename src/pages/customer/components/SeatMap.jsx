import React from 'react';

// Fallback local layout if API seats not provided
const fallbackRows = [
  ['A1', 'A2', 'A3', 'A4', 'A5'],
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['C1', 'C2', 'C3', 'C4', 'C5'],
];
const fallbackOccupied = ['A2', 'B3', 'C5'];

// seats prop format (API /tripseats expected theo database schema):
// [ { TripSeatID: 1, TripID: 123, SeatNo: 'A1', IsBooked: false }, ... ]
// hoặc flexible: { seatNo/SeatNo, isBooked/IsBooked }

const SeatMap = ({ seats = [], selected, onSelect, max = 2 }) => {
  const seatsByRows = React.useMemo(() => {
    if (!Array.isArray(seats) || seats.length === 0) {
      return fallbackRows.map((row) =>
        row.map((s) => ({ seatNo: s, isBooked: fallbackOccupied.includes(s) }))
      );
    }
    const groups = new Map();
    seats.forEach((s) => {
      // Ưu tiên SeatNo theo database schema, fallback flexible
      const seatNo = s.SeatNo || s.seatNo || s.name || s; 
      if (!seatNo) return;
      const rowKey = seatNo[0];
      if (!groups.has(rowKey)) groups.set(rowKey, []);
      // Ưu tiên IsBooked theo database schema
      groups.get(rowKey).push({ seatNo, isBooked: !!(s.IsBooked ?? s.isBooked) });
    });
    return Array.from(groups.keys())
      .sort()
      .map((k) => groups.get(k).sort((a, b) => a.seatNo.localeCompare(b.seatNo)));
  }, [seats]);

  return (
    <div className="inline-block p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="grid gap-2">
        {seatsByRows.map((row, ri) => (
          <div key={ri} className="flex gap-2">
            {row.map((seat) => {
              const code = typeof seat === 'string' ? seat : seat.seatNo;
              const booked = typeof seat === 'string' ? false : seat.isBooked;
              const isSelected = selected.includes(code);
              const isOccupied = booked;
              return (
                <button
                  key={code}
                  className={
                    "seat w-10 h-10 rounded flex items-center justify-center " +
                    (isOccupied
                      ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-green-600 border border-green-400 hover:bg-green-200')
                  }
                  disabled={isOccupied || (!isSelected && selected.length >= max)}
                  onClick={() => onSelect(code)}
                  type="button"
                >
                  {code}
                </button>
              );
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
};
export default SeatMap;
