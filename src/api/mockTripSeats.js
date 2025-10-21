// Mock data cho API /api/tripseats
// Theo database schema: TripSeats table với TripID, SeatNo, IsBooked

export const mockTripSeatsData = {
  // Tất cả các tuyến nội thành Đà Nẵng đều là xe nhỏ (4-7 chỗ) - không cần chọn ghế
  '1': [], // Cẩm Lệ - Thanh Khê (4 chỗ)
  '2': [], // Hải Châu - Ngũ Hành Sơn (7 chỗ)
  '3': [], // Sơn Trà - Hải Châu (4 chỗ)
  '4': [], // Liên Chiểu - Cẩm Lệ (4 chỗ)
  '5': [], // Ngũ Hành Sơn - Sơn Trà (7 chỗ)
  '6': [], // Thanh Khê - Liên Chiểu (4 chỗ)
  '7': [], // Hải Châu - Cẩm Lệ (7 chỗ)
  '8': [], // Sơn Trà - Ngũ Hành Sơn (4 chỗ)
  
  // Xe lớn - cần chọn ghế
  '9': [ // Đà Nẵng - Huế (45 chỗ)
    { SeatNo: 'A1', IsBooked: false },
    { SeatNo: 'A2', IsBooked: true },
    { SeatNo: 'A3', IsBooked: false },
    { SeatNo: 'A4', IsBooked: false },
    { SeatNo: 'B1', IsBooked: false },
    { SeatNo: 'B2', IsBooked: true },
    { SeatNo: 'B3', IsBooked: false },
    { SeatNo: 'B4', IsBooked: false },
    { SeatNo: 'C1', IsBooked: false },
    { SeatNo: 'C2', IsBooked: false },
    { SeatNo: 'C3', IsBooked: true },
    { SeatNo: 'C4', IsBooked: false },
    { SeatNo: 'D1', IsBooked: false },
    { SeatNo: 'D2', IsBooked: false },
    { SeatNo: 'D3', IsBooked: false },
    { SeatNo: 'D4', IsBooked: true },
  ],
  '10': [ // Đà Nẵng - Hội An (30 chỗ)
    { SeatNo: 'A1', IsBooked: false },
    { SeatNo: 'A2', IsBooked: false },
    { SeatNo: 'A3', IsBooked: true },
    { SeatNo: 'A4', IsBooked: false },
    { SeatNo: 'B1', IsBooked: false },
    { SeatNo: 'B2', IsBooked: true },
    { SeatNo: 'B3', IsBooked: false },
    { SeatNo: 'B4', IsBooked: false },
    { SeatNo: 'C1', IsBooked: false },
    { SeatNo: 'C2', IsBooked: false },
    { SeatNo: 'C3', IsBooked: false },
    { SeatNo: 'C4', IsBooked: true },
  ]
};

// Mock API function
export const getMockTripSeats = (tripId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const seats = mockTripSeatsData[tripId] || [];
      resolve({ data: seats });
    }, 500); // Simulate API delay
  });
};
