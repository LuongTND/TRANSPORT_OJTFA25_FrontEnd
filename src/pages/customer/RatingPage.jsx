import React, { useState } from 'react';

const RatingPage = () => {
  const [star, setStar] = useState(0);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-green-800 mb-4">Đánh giá chuyến đi</h1>
      <div className="bg-white rounded shadow p-6">
        {sent ? (
          <div className="text-green-700 font-bold text-center py-6">Cảm ơn bạn đã đánh giá! ❤️</div>
        ) : (
        <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="space-y-5">
          <div>
            <div className="mb-2 font-semibold">Cho điểm dịch vụ:</div>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <button key={s} type="button" className={
                  'text-2xl '+(star>=s?'text-green-500':'text-gray-400')
                } onClick={()=>setStar(s)}>
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea className="input input-bordered w-full min-h-[80px]" placeholder="Ý kiến đánh giá..." value={text} onChange={e=>setText(e.target.value)} />
          <button className="btn btn-success w-full" disabled={!star || !text.trim()}>Gửi đánh giá</button>
        </form>)}
      </div>
    </div>
  );
};
export default RatingPage;
