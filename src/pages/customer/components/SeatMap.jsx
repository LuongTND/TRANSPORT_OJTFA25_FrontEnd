import React from 'react';

// Fallback local layout if API seats not provided - Layout xe 16 chỗ thực tế
const fallbackRows = [
  ['A1', 'A2', '', 'A3', 'A4'],  // Hàng A: 4 ghế, có lối đi ở giữa
  ['B1', 'B2', '', 'B3', 'B4'],  // Hàng B: 4 ghế
  ['C1', 'C2', '', 'C3', 'C4'],  // Hàng C: 4 ghế
  ['D1', 'D2', '', 'D3', 'D4'],  // Hàng D: 4 ghế
];
const fallbackOccupied = ['A2', 'B3', 'C1', 'D4'];

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
    <div className="inline-block p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200 shadow-lg">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Sơ đồ ghế xe</h3>
        <p className="text-sm text-gray-600">Chọn ghế mong muốn</p>
      </div>

      {/* Bus Layout */}
      <div className="relative">
        {/* Driver Area */}
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium text-gray-600">
            🚗 Khu vực tài xế
          </div>
        </div>

        {/* Seats Grid */}
        <div className="space-y-3">
          {seatsByRows.map((row, ri) => (
            <div key={ri} className="flex gap-3 justify-center">
              {row.map((seat, si) => {
                const code = typeof seat === 'string' ? seat : seat.seatNo;
                const booked = typeof seat === 'string' ? false : seat.isBooked;
                const isSelected = selected.includes(code);
                const isOccupied = booked;
                const isEmpty = !code || code === '';

                if (isEmpty) {
                  return (
                    <div key={`empty-${ri}-${si}`} className="w-12 h-12 flex items-center justify-center">
                      <div className="w-1 h-8 bg-gray-300 rounded"></div>
                    </div>
                  );
                }

                return (
                  <button
                    key={code}
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center font-semibold text-sm
                      transition-all duration-200 transform hover:scale-105
                      ${isOccupied
                        ? 'bg-gray-300 text-gray-400 cursor-not-allowed shadow-inner'
                        : isSelected
                        ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-300'
                        : 'bg-white text-green-700 border-2 border-green-400 hover:bg-green-100 hover:border-green-500 shadow-md'
                      }
                    `}
                    disabled={isOccupied || (!isSelected && selected.length >= max)}
                    onClick={() => onSelect(code)}
                    type="button"
                    title={isOccupied ? 'Ghế đã được đặt' : isSelected ? 'Bỏ chọn ghế' : 'Chọn ghế'}
                  >
                    {code}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Exit Sign */}
        <div className="text-center mt-4">
          <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
            🚪 Lối ra
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-lg shadow-sm"></div>
            <span className="text-gray-700 font-medium">Đã chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-lg shadow-inner"></div>
            <span className="text-gray-700 font-medium">Đã bán</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border-2 border-green-400 rounded-lg shadow-sm"></div>
            <span className="text-gray-700 font-medium">Còn trống</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SeatMap;
