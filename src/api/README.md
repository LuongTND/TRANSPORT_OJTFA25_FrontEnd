# API Backend Routes Documentation

## Base URL
```
http://localhost:3000/api
```

---

## 🔐 Authentication APIs (`authApi.js`)

### Login
- **POST** `/auth/login`
- Body: `{ email, password, role }`
- Response: `{ token, refreshToken, user }`

### Register
- **POST** `/auth/register`
- Body: `{ fullname, email, phone, password, role }`
- Response: `{ token, refreshToken, user }`

### Get Profile
- **GET** `/auth/me`
- Headers: `Authorization: Bearer {token}`
- Response: `{ user }`

### Logout
- **POST** `/auth/logout`
- Headers: `Authorization: Bearer {token}`

---

## 🧪 HƯỚNG DẪN TEST POSTMAN - AUTHENTICATION

### 1️⃣ Đăng ký tài khoản (Register)

**Endpoint:** `POST http://localhost:3000/api/auth/register`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "fullname": "Nguyen Van A",
  "email": "user@example.com",
  "phone": "0901234567",
  "password": "123456aA!",
  "role": "customer"
}
```

**Các role có thể dùng:**
- `customer` - Khách hàng
- `driver` - Tài xế
- `admin` - Quản trị viên (thường do hệ thống tạo)

**Response mẫu (Success - 201):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "fullname": "Nguyen Van A",
      "email": "user@example.com",
      "phone": "0901234567",
      "role": "customer",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  },
  "message": "Đăng ký thành công"
}
```

**Response mẫu (Error - 400):**
```json
{
  "success": false,
  "message": "Email đã tồn tại trong hệ thống",
  "errors": []
}
```

---

### 2️⃣ Đăng nhập (Login)

**Endpoint:** `POST http://localhost:3000/api/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "123456aA!",
  "role": "customer"
}
```

**Response mẫu (Success - 200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "fullname": "Nguyen Van A",
      "email": "user@example.com",
      "role": "customer"
    }
  },
  "message": "Đăng nhập thành công"
}
```

**Response mẫu (Error - 401):**
```json
{
  "success": false,
  "message": "Email hoặc mật khẩu không đúng",
  "errors": []
}
```

---

### 3️⃣ Lấy thông tin profile (Get Profile)

**Endpoint:** `GET http://localhost:3000/api/auth/me`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response mẫu (Success - 200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "fullname": "Nguyen Van A",
      "email": "user@example.com",
      "phone": "0901234567",
      "role": "customer",
      "avatar": null,
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

---

### 4️⃣ Đăng xuất (Logout)

**Endpoint:** `POST http://localhost:3000/api/auth/logout`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response mẫu (Success - 200):**
```json
{
  "success": true,
  "message": "Đăng xuất thành công"
}
```

---

## 📝 HƯỚNG DẪN TEST TRONG POSTMAN

### Bước 1: Đăng ký tài khoản mới
1. Tạo request mới trong Postman
2. Chọn method `POST`
3. Nhập URL: `http://localhost:3000/api/auth/register`
4. Vào tab **Body** → chọn **raw** → chọn **JSON**
5. Paste body JSON như mẫu trên
6. Click **Send**
7. **Lưu lại `token`** từ response để dùng cho các API khác

### Bước 2: Đăng nhập
1. Tạo request mới
2. Chọn method `POST`
3. URL: `http://localhost:3000/api/auth/login`
4. Body JSON như mẫu trên
5. Click **Send**
6. Copy `token` từ response

### Bước 3: Test API có xác thực (Protected Routes)
1. Tạo request mới (ví dụ: GET profile)
2. Vào tab **Headers**
3. Thêm header mới:
   - Key: `Authorization`
   - Value: `Bearer <paste_token_ở_đây>`
4. Click **Send**

### Bước 4: Tạo Environment trong Postman (Khuyến nghị)
1. Click vào icon ⚙️ (Settings) → **Manage Environments**
2. Tạo environment mới tên `Transport API`
3. Thêm biến:
   - `base_url`: `http://localhost:3000/api`
   - `token`: (để trống, sẽ set sau khi login)
4. Trong request, dùng `{{base_url}}/auth/login`
5. Sau khi login, vào tab **Tests** của request login, thêm script:
   ```javascript
   if (pm.response.code === 200) {
       var jsonData = pm.response.json();
       pm.environment.set("token", jsonData.data.token);
   }
   ```
6. Trong các request khác, dùng header: `Authorization: Bearer {{token}}`

---

## 🚗 Trip & Route APIs (`tripApi.js`)

### Search Trips
- **GET** `/trips/search?fromCity={}&toCity={}&date={}&vehicleTypeId={}&bookingType={}`
- Response: `{ trips: [] }`

### Get Trip Details
- **GET** `/trips/{tripId}`
- Response: `{ trip }`

### Get Available Seats
- **GET** `/trips/{tripId}/seats`
- Response: `{ seats: [] }`

### Create Trip
- **POST** `/trips`
- Body: `{ routeId, vehicleId, driverId, startTime, endTime }`
- Auth: Driver/Admin

### Update Trip Status
- **PATCH** `/trips/{tripId}/status`
- Body: `{ status: 'Scheduled'|'Ongoing'|'Completed'|'Canceled' }`
- Auth: Driver/Admin

### Get Driver Trips
- **GET** `/drivers/{driverId}/trips?status={}&date={}`
- Auth: Driver

### Get Trip Passengers
- **GET** `/trips/{tripId}/passengers`
- Auth: Driver

### Routes Management
- **GET** `/routes` - Get all routes
- **POST** `/routes` - Create route (Admin)
- **PUT** `/routes/{routeId}` - Update route (Admin)
- **DELETE** `/routes/{routeId}` - Delete route (Admin)

---

## 🎫 Booking APIs (`bookingApi.js`)

### Create Booking
- **POST** `/bookings`
- Body: 
```json
{
  "userId": 1,
  "tripId": 10,
  "bookingType": "Shared" | "Private",
  "seatIds": [1, 2],
  "passengerInfo": {
    "name": "Nguyen Van A",
    "phone": "0912345678",
    "email": "user@email.com"
  },
  "promotionCode": "DISCOUNT20"
}
```

### Get Bookings
- **GET** `/bookings?userId={}&tripId={}&status={}&bookingType={}`

### Get Booking Details
- **GET** `/bookings/{bookingId}`

### Cancel Booking
- **POST** `/bookings/{bookingId}/cancel`
- Body: `{ reason, refundMethod }`

### Confirm Booking (Driver)
- **POST** `/bookings/{bookingId}/confirm`
- Auth: Driver

### Get User Bookings
- **GET** `/users/{userId}/bookings?status={}&startDate={}&endDate={}`

### Calculate Booking Price
- **POST** `/bookings/calculate-price`
- Body: `{ tripId, bookingType, seatIds, promotionCode }`

### Booking Requests (Driver)
- **GET** `/drivers/{driverId}/booking-requests`
- **POST** `/bookings/{bookingId}/accept`
- **POST** `/bookings/{bookingId}/reject`

---

## 👨‍✈️ Driver & Vehicle APIs (`driverApi.js`)

### Driver Registration
- **POST** `/drivers/register`
- Body: `{ licenseNumber, licenseExpiry, experienceYears }`

### Get Driver Profile
- **GET** `/drivers/{driverId}`

### Get Driver Dashboard
- **GET** `/drivers/{driverId}/dashboard`
- Response: Today's trips, earnings, pending bookings

### Get Driver Earnings
- **GET** `/drivers/{driverId}/earnings?startDate={}&endDate={}&groupBy=day`

### Vehicle Management
- **POST** `/vehicles` - Register vehicle
- **GET** `/vehicles?companyId={}&typeId={}` - Get vehicles
- **GET** `/vehicles/{vehicleId}` - Get vehicle details
- **PUT** `/vehicles/{vehicleId}` - Update vehicle
- **DELETE** `/vehicles/{vehicleId}` - Delete vehicle

### Vehicle Types
- **GET** `/vehicle-types` - Get all vehicle types (4 chỗ, 7 chỗ, 16 chỗ...)

### Company Management
- **POST** `/companies` - Register transport company
- **GET** `/companies` - Get companies
- **GET** `/companies/{companyId}` - Get company details
- **PUT** `/companies/{companyId}` - Update company

---

## 💳 Payment APIs (`paymentApi.js`)

### Create Payment
- **POST** `/payments`
- Body: `{ bookingId, amount, method: 'VNPay'|'Momo'|'ZaloPay' }`

### Payment Gateway Integration
- **POST** `/payments/vnpay/create` - Create VNPay URL
- **POST** `/payments/momo/create` - Create Momo payment
- **POST** `/payments/zalopay/create` - Create ZaloPay payment

### Payment Callbacks
- **GET** `/payments/vnpay/callback`
- **POST** `/payments/momo/callback`
- **POST** `/payments/zalopay/callback`

### Refund Management
- **POST** `/refunds` - Create refund request
- **GET** `/refunds?paymentId={}` - Get refunds
- **POST** `/refunds/{refundId}/process` - Process refund (Admin)

### Invoice Management
- **POST** `/invoices` - Create invoice
- **GET** `/payments/{paymentId}/invoice` - Get invoice by payment
- **GET** `/invoices/{invoiceId}/download` - Download PDF

### Transactions
- **GET** `/transactions?userId={}&type={}&startDate={}&endDate={}`

---

## 🎁 Promotion & Pricing APIs (`promotionApi.js`)

### Promotions
- **GET** `/promotions?status=active` - Get active promotions
- **POST** `/promotions/validate/{code}` - Validate promo code
- **POST** `/promotions/apply` - Apply promotion
- **POST** `/promotions` - Create promotion (Admin)
- **PUT** `/promotions/{promotionId}` - Update promotion (Admin)
- **GET** `/promotions/usage?promotionId={}` - Usage history

### Pricing Rules
- **GET** `/pricing-rules?routeId={}&vehicleTypeId={}`
- **POST** `/pricing-rules/calculate` - Calculate trip price
- **POST** `/pricing-rules` - Create pricing rule (Admin)
- **PUT** `/pricing-rules/{ruleId}` - Update rule (Admin)

---

## ⭐ Rating & Feedback APIs (`ratingApi.js`)

### Ratings
- **POST** `/ratings` - Create rating
- **GET** `/bookings/{bookingId}/rating` - Get rating by booking
- **GET** `/drivers/{driverId}/ratings` - Get driver ratings
- **GET** `/drivers/{driverId}/rating-average` - Average rating

### Feedback/Complaints
- **POST** `/feedbacks` - Create feedback
- **GET** `/feedbacks?userId={}&tripId={}&status={}` - Get feedbacks
- **PATCH** `/feedbacks/{feedbackId}/status` - Update status (Admin)

### Support Tickets
- **POST** `/support-tickets` - Create ticket
- **GET** `/support-tickets?userId={}&status={}` - Get tickets
- **PATCH** `/support-tickets/{ticketId}/status` - Update status
- **PATCH** `/support-tickets/{ticketId}/assign` - Assign to admin
- **POST** `/support-tickets/{ticketId}/comments` - Add comment
- **POST** `/support-tickets/{ticketId}/close` - Close ticket

---

## 👤 User Management APIs (`userApi.js`)

### User Profile
- **GET** `/users/me` - Get current user
- **GET** `/users/{userId}` - Get user by ID
- **PUT** `/users/{userId}` - Update user
- **POST** `/users/change-password` - Change password
- **POST** `/users/avatar` - Upload avatar

### User Management (Admin)
- **GET** `/users?role={}&search={}&page={}&limit={}` - Get users
- **POST** `/users` - Create user
- **PATCH** `/users/{userId}/role` - Update role
- **PATCH** `/users/{userId}/status` - Lock/Unlock user
- **DELETE** `/users/{userId}` - Delete user

### Roles
- **GET** `/roles` - Get all roles
- **POST** `/roles` - Create role (Admin)
- **PUT** `/roles/{roleId}` - Update role (Admin)

### Notifications
- **GET** `/users/{userId}/notifications` - Get user notifications
- **PATCH** `/notifications/{notificationId}/read` - Mark as read
- **PATCH** `/users/{userId}/notifications/read-all` - Mark all as read
- **DELETE** `/notifications/{notificationId}` - Delete notification

---

## 🛠️ Admin APIs (`adminApi.js`)

### Dashboard
- **GET** `/admin/dashboard/stats` - Overview statistics
- **GET** `/admin/dashboard/revenue-chart?startDate={}&endDate={}&groupBy={}` 
- **GET** `/admin/dashboard/trip-chart?startDate={}&endDate={}`
- **GET** `/admin/dashboard/recent-activities?limit={}`

### Reports
- **GET** `/admin/reports/revenue?startDate={}&endDate={}&groupBy={}` 
- **GET** `/admin/reports/trips?startDate={}&endDate={}&status={}`
- **GET** `/admin/reports/users?startDate={}&endDate={}&role={}`
- **GET** `/admin/reports/bookings?startDate={}&endDate={}&status={}`
- **GET** `/admin/reports/payments?startDate={}&endDate={}&method={}`
- **GET** `/admin/reports/{reportType}/export` - Export to Excel

### Revenue Share
- **GET** `/admin/revenue-shares?tripId={}&companyId={}` 
- **POST** `/admin/revenue-shares` - Create revenue share
- **PUT** `/admin/revenue-shares/ratio` - Update ratio

### System Management
- **GET** `/admin/system-logs?userId={}&action={}&startDate={}` 
- **GET** `/admin/audit-logs?tableName={}&userId={}&action={}`
- **GET** `/admin/settings` - Get system settings
- **PUT** `/admin/settings` - Update settings

### Statistics
- **GET** `/admin/statistics?startDate={}&endDate={}` 
- **GET** `/admin/statistics/routes/{routeId}` 
- **GET** `/admin/statistics/drivers/{driverId}` 
- **GET** `/admin/statistics/top-drivers?sortBy={}&limit={}` 
- **GET** `/admin/statistics/top-routes?limit={}`

### Approvals
- **GET** `/admin/approvals/pending?type={}` 
- **POST** `/admin/vehicles/{vehicleId}/approve` 
- **POST** `/admin/drivers/{driverId}/approve` 
- **POST** `/admin/companies/{companyId}/approve` 

### Bulk Notifications
- **POST** `/admin/notifications/bulk` - Send to multiple users
- **POST** `/admin/notifications/by-role` - Send to all users of a role

---

## 📝 Common Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## 🔑 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer {your_jwt_token}
```

---

## 📊 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 💡 Tips cho việc test API

1. **Luôn kiểm tra backend đã chạy chưa**: `http://localhost:3000`
2. **Đăng ký trước khi đăng nhập**: Tạo tài khoản test với các role khác nhau
3. **Lưu token sau mỗi lần login**: Dùng cho các API cần xác thực
4. **Test theo thứ tự**: Register → Login → Get Profile → Các API khác
5. **Kiểm tra response status code**: 200/201 = success, 400/401/404/500 = error
6. **Đọc message trong response**: Backend thường trả lỗi chi tiết trong field `message`
