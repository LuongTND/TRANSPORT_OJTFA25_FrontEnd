import React from 'react';
import { Link } from 'react-router-dom';
import RatingDisplay from '../../common/components/RatingDisplay';

const TripCard = ({ trip }) => (
  <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col gap-2 border-l-8 border-green-500">
    <div className="flex justify-between items-center mb-2">
      <span className="text-green-700 font-bold text-lg">{trip.from} → {trip.to}</span>
      <span className="text-gray-500 text-sm font-semibold">{trip.time}</span>
    </div>
    <div className="flex gap-3 items-center mb-2 flex-wrap">
      <span className="bg-green-100 text-green-900 text-xs px-2 py-1 rounded">{trip.vehicle}</span>
      {trip.type === 'nội thành' ? (
        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200 ml-2">Nội thành</span>
      ) : (
        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded border border-indigo-200 ml-2">Liên tỉnh</span>
      )}
      {trip.carpool && trip.type==='nội thành' && (
        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-1 font-bold">Đang ghép ({trip.passengers}/{trip.maxPassengers})</span>
      )}
      {!trip.carpool && trip.type==='nội thành' && (
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs ml-1">Chuyến riêng</span>
      )}
      <span className="text-gray-400 text-xs">
        {trip.seatCapacity >= 30 ? `Còn ${trip.seats} ghế` : `Còn ${trip.seats} chỗ`}
      </span>
      {/* Rating display */}
      {trip.rating && (
        <RatingDisplay 
          rating={trip.rating} 
          totalReviews={trip.totalReviews}
          size="sm"
          showText={false}
        />
      )}
    </div>
    <div className="flex justify-between items-center">
      <span className="text-xl font-extrabold text-green-700">{trip.price.toLocaleString()}đ</span>
      <Link 
        to={`/booking?tripId=${trip.id}`} 
        className="btn btn-success px-4 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
      >
        Đặt vé
      </Link>
    </div>
  </div>
);

export default TripCard;
