// src/api/paymentApi.js
import axiosClient from './axiosClient';

const paymentApi = {
  // === PAYMENT APIs ===
  
  // Tạo thanh toán mới
  createPayment: async (payload) => {
    // payload: { bookingId, amount, method: 'Momo'|'ZaloPay'|'VNPay' }
    const response = await axiosClient.post('/payments', payload);
    return response;
  },

  // Lấy thông tin thanh toán
  getPaymentById: async (paymentId) => {
    const response = await axiosClient.get(`/payments/${paymentId}`);
    return response;
  },

  // Xác nhận thanh toán (callback từ payment gateway)
  confirmPayment: async (paymentId, payload) => {
    // payload: { transactionId, status, ... }
    const response = await axiosClient.post(`/payments/${paymentId}/confirm`, payload);
    return response;
  },

  // Lấy danh sách thanh toán
  getPayments: async (params) => {
    // params: { userId, bookingId, status, method }
    const response = await axiosClient.get('/payments', { params });
    return response;
  },

  // === PAYMENT GATEWAY Integration ===
  
  // Tạo payment URL cho VNPay
  createVNPayUrl: async (payload) => {
    // payload: { bookingId, amount, returnUrl }
    const response = await axiosClient.post('/payments/vnpay/create', payload);
    return response;
  },

  // Tạo payment cho Momo
  createMomoPayment: async (payload) => {
    // payload: { bookingId, amount, returnUrl, notifyUrl }
    const response = await axiosClient.post('/payments/momo/create', payload);
    return response;
  },

  // Tạo payment cho ZaloPay
  createZaloPayPayment: async (payload) => {
    // payload: { bookingId, amount, returnUrl }
    const response = await axiosClient.post('/payments/zalopay/create', payload);
    return response;
  },

  // Callback xử lý từ VNPay
  handleVNPayCallback: async (queryParams) => {
    const response = await axiosClient.get('/payments/vnpay/callback', { params: queryParams });
    return response;
  },

  // Callback xử lý từ Momo
  handleMomoCallback: async (payload) => {
    const response = await axiosClient.post('/payments/momo/callback', payload);
    return response;
  },

  // Callback xử lý từ ZaloPay
  handleZaloPayCallback: async (payload) => {
    const response = await axiosClient.post('/payments/zalopay/callback', payload);
    return response;
  },

  // === REFUND APIs ===
  
  // Tạo yêu cầu hoàn tiền
  createRefund: async (payload) => {
    // payload: { paymentId, amount, reason }
    const response = await axiosClient.post('/refunds', payload);
    return response;
  },

  // Lấy thông tin hoàn tiền
  getRefundById: async (refundId) => {
    const response = await axiosClient.get(`/refunds/${refundId}`);
    return response;
  },

  // Lấy danh sách hoàn tiền
  getRefunds: async (params) => {
    const response = await axiosClient.get('/refunds', { params });
    return response;
  },

  // Xử lý hoàn tiền (admin)
  processRefund: async (refundId, payload) => {
    // payload: { status: 'Approved'|'Rejected', note }
    const response = await axiosClient.post(`/refunds/${refundId}/process`, payload);
    return response;
  },

  // === INVOICE APIs ===
  
  // Tạo hóa đơn
  createInvoice: async (payload) => {
    // payload: { paymentId, invoiceNumber, invoiceDate }
    const response = await axiosClient.post('/invoices', payload);
    return response;
  },

  // Lấy hóa đơn theo payment
  getInvoiceByPayment: async (paymentId) => {
    const response = await axiosClient.get(`/payments/${paymentId}/invoice`);
    return response;
  },

  // Lấy chi tiết hóa đơn
  getInvoiceById: async (invoiceId) => {
    const response = await axiosClient.get(`/invoices/${invoiceId}`);
    return response;
  },

  // Tải hóa đơn PDF
  downloadInvoice: async (invoiceId) => {
    const response = await axiosClient.get(`/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response;
  },

  // === TRANSACTION APIs ===
  
  // Lấy lịch sử giao dịch
  getTransactions: async (params) => {
    // params: { userId, type, startDate, endDate }
    const response = await axiosClient.get('/transactions', { params });
    return response;
  },

  // Lấy chi tiết giao dịch
  getTransactionById: async (transactionId) => {
    const response = await axiosClient.get(`/transactions/${transactionId}`);
    return response;
  }
};

export default paymentApi;