# Zalo Mini App - Hướng Nghiệp Á Âu

Ứng dụng Zalo Mini App cho Hướng Nghiệp Á Âu - Hệ thống đào tạo nghề chuẩn quốc tế.

## 🎨 Giao diện

- **Màu chủ đạo**: Xanh dương (#00529C) 
- **Màu phụ**: Cam (#F37021)
- **Style**: Modern, Clean, Professional
- **Design**: Giống Official Account của các trường đại học

## ✨ Tính năng chính

### 🏠 Trang chủ (Home)
- Header xanh dương với user info
- 4 Chức năng nhanh: Tin tức, Tuyển sinh, Đặt lịch, Liên hệ
- Banner quảng cáo
- Call-to-action Quan tâm OA
- Tin tuyển sinh nổi bật
- Tin tức mới nhất (grid 2 cột)

### 📚 Tab Khóa học (Courses)
- Danh sách tất cả khóa học
- Filter theo danh mục (CNTT, Thiết kế, Ngoại ngữ, Kỹ năng mềm)
- Hiển thị giá, thời lượng, lịch khai giảng
- Chi tiết khóa học với mô tả đầy đủ
- Chức năng đăng ký/mua khóa học

### 🔔 Tab Thông báo (Notifications)
- Tin tức hệ thống
- Thông báo khai giảng
- Workshop & sự kiện
- Ưu đãi đặc biệt
- Filter theo loại thông báo
- Badge màu sắc theo loại

### 👤 Tab Tài khoản (Account)
- Profile card với avatar gradient
- Chỉnh sửa thông tin cá nhân
- **Quick Actions:**
  - Ưu đãi / Quan tâm OA
  - Voucher giảm giá
  - Khóa học đã mua
  - Thời khóa biểu
- **Menu:**
  - Đơn hàng đã mua
  - Lịch chiêu sinh
  - Hỗ trợ trực tuyến
  - Chính sách bảo mật
- Hiển thị đơn hàng gần đây

## 📱 Các trang phụ (Đã tạo đầy đủ)

### 1. Tuyển sinh (/hnau/admissions)
- Phương thức xét tuyển
- Lịch khai giảng chi tiết
- Tin tuyển sinh

### 2. Đặt lịch (/hnau/schedule)
- Form đặt lịch tư vấn
- Chọn dịch vụ, ngày, giờ
- Tích hợp OA chat

### 3. Voucher (/hnau/vouchers)
- Danh sách voucher
- Sao chép mã giảm giá
- Hạn sử dụng
- Design giống voucher thật

### 4. Khóa học của tôi (/hnau/my-courses)
- Danh sách khóa đã mua
- Progress bar tiến độ
- Nút "Tiếp tục học"
- Thống kê học tập

### 5. Tìm kiếm (/hnau/search)
- Tìm kiếm khóa học & tin tức
- Tab chuyển đổi
- Real-time search

### 6. Chi tiết tin tức (/hnau/news/:id)
- Hero image
- Nội dung đầy đủ
- CTA buttons
- Tin liên quan

### 7. Chi nhánh (/hnau/branches)
- Danh sách chi nhánh
- Google Maps
- Thông tin liên hệ

### 8. Lịch khai giảng (/hnau/sessions)
- Danh sách lịch khai giảng
- Filter theo tháng
- Đăng ký nhanh

## 🎨 Màu sắc chính

```css
--color-primary: #00529C;        /* Xanh dương chủ đạo */
--color-primary-pressed: #003D75; /* Xanh đậm khi nhấn */
--color-secondary: #F37021;       /* Cam phụ */
--color-background: #F8FAFC;      /* Xám nhạt nền */
```

## 🔗 Zalo OA

**ID**: 3202842660808701267  
**Link**: https://zalo.me/3202842660808701267

## 📦 Cấu trúc dự án

```
src/
├── pages/              # Các trang chính
│   ├── home.hnau.tsx           # Trang chủ ✅
│   ├── courses.hnau.tsx        # Danh sách khóa học ✅
│   ├── notifications.hnau.tsx  # Thông báo ✅
│   ├── account.hnau.tsx        # Tài khoản ✅
│   ├── admissions.hnau.tsx     # Tuyển sinh ✅
│   ├── schedule.hnau.tsx       # Đặt lịch ✅
│   ├── vouchers.hnau.tsx       # Voucher ✅
│   ├── my-courses.hnau.tsx     # Khóa đã mua ✅
│   ├── search.hnau.tsx         # Tìm kiếm ✅
│   ├── news.detail.hnau.tsx    # Chi tiết tin tức ✅
│   └── ...
├── components/         # Components
│   ├── hnau-tabs.tsx           # Bottom navigation (4 tabs) ✅
│   └── ...
├── mock/              # Dữ liệu mẫu
│   └── hnau/
│       ├── courses.json        # 6 khóa học ✅
│       ├── news.json           # 4 tin tức ✅
│       └── sessions.json       # Lịch khai giảng ✅
└── css/               # Styles
    └── app.scss               # CSS màu xanh ✅
```

## 📝 Khóa học hiện có

1. **Lập trình Web Fullstack** - React & Node.js (12 tuần) - 4.5tr
2. **Thiết kế UI/UX** - Figma (8 tuần) - 2.7tr
3. **Digital Marketing** - Marketing Online (10 tuần) - 3.2tr
4. **Data Science & Machine Learning** (16 tuần) - 5.5tr
5. **Tiếng Anh giao tiếp** - Business English (12 tuần) - 2.5tr
6. **Kỹ năng thuyết trình và giao tiếp** (6 tuần) - 1.8tr

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build
```

## 🔧 Tích hợp Zalo SDK

- **openChat**: Mở chat với Zalo OA
- **followOA**: Quan tâm Zalo OA
- **getUserInfo**: Lấy thông tin người dùng

## ✅ Checklist hoàn thành

- [x] Trang chủ với giao diện xanh dương
- [x] 4 Tab navigation (Home, Courses, Notifications, Account)
- [x] Trang Tuyển sinh
- [x] Trang Đặt lịch
- [x] Trang Voucher
- [x] Trang Khóa đã mua
- [x] Trang Tìm kiếm
- [x] Trang Chi tiết tin tức
- [x] Tích hợp Zalo OA (Chat & Follow)
- [x] Màu sắc xanh dương professional
- [x] Responsive design
- [x] Mock data đầy đủ
- [x] All routes configured

## 📸 Screenshots

Giao diện được thiết kế dựa trên:
- Official Account của các trường đại học
- Material Design principles
- Zalo Mini App best practices

---

© 2026 Hướng Nghiệp Á Âu. All rights reserved.

