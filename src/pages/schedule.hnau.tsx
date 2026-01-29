import React, { useState } from 'react'
import { Page, Icon } from 'zmp-ui'
import { PageContainer } from '@/components'
import { openChat } from 'zmp-sdk/apis'

export default function HnauSchedule() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: 'Tư vấn khóa học',
    note: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const services = [
    'Tư vấn khóa học',
    'Tham quan chi nhánh',
    'Đăng ký học thử',
    'Tư vấn tuyển sinh',
    'Khác'
  ]

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mở chat OA để xác nhận
    openChat({
      type: 'oa',
      id: '3202842660808701267',
      message: `Xin chào! Tôi muốn đặt lịch:\n- Họ tên: ${formData.name}\n- SĐT: ${formData.phone}\n- Dịch vụ: ${formData.service}\n- Ngày: ${formData.date}\n- Giờ: ${formData.time}`,
      success: () => {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      },
      fail: (error) => {
        console.error('Failed to open chat:', error)
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
      }
    })
  }

  return (
    <Page restoreScroll className="bg-[#F8FAFC]">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-br from-[#00529C] to-[#0066CC] px-4 pt-6 pb-8 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <a href="/hnau" className="text-white">
              <Icon icon="zi-arrow-left" size={24} />
            </a>
            <h2 className="text-2xl font-bold text-white flex-1">Đặt lịch</h2>
          </div>
          <p className="text-white/90 text-sm ml-10">Đặt lịch tư vấn hoặc tham quan</p>
        </div>

        <section className="px-4 pb-20">
          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="zi-check-circle" size={20} />
                <span className="font-semibold">Đã gửi yêu cầu thành công!</span>
              </div>
              <p className="text-sm mt-1">
                Chúng tôi sẽ liên hệ với bạn sớm nhất.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ===== THÔNG TIN CÁ NHÂN ===== */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Thông tin cá nhân
              </h3>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Họ và tên <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ tên"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Số điện thoại <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Nhập số điện thoại"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Nhập email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  />
                </label>
              </div>
            </div>

            {/* ===== THÔNG TIN ĐẶT LỊCH ===== */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-base mb-4 text-gray-800">
                Thông tin đặt lịch
              </h3>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Dịch vụ <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  >
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Ngày <span className="text-red-500">*</span>
                  </span>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Khung giờ <span className="text-red-500">*</span>
                  </span>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C]"
                  >
                    <option value="">Chọn khung giờ</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-700 mb-1 block">
                    Ghi chú
                  </span>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Ghi chú thêm..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00529C] resize-none"
                  />
                </label>
              </div>
            </div>

            {/* ===== SUBMIT BUTTON ===== */}
            <button
              type="submit"
              className="w-full bg-[#00529C] text-white py-4 rounded-xl font-bold text-base active:scale-95 transition shadow-lg"
            >
              Xác nhận đặt lịch
            </button>

            <div className="text-center text-xs text-gray-500">
              Hoặc liên hệ trực tiếp qua{' '}
              <a href="tel:1800 6148" className="text-[#00529C] font-semibold">
                Hotline: 1800 6148
              </a>
            </div>
          </form>
        </section>
      </PageContainer>
    </Page>
  )
}
