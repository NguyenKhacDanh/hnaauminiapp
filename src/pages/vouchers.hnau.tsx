import React, { useState } from 'react'
import { Page, Icon } from 'zmp-ui'
import { PageContainer } from '@/components'

export default function HnauVouchers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const vouchers = [
    {
      id: 'v-1',
      code: 'HNAU2026',
      title: 'Giảm 15% học phí tất cả khóa học',
      description: 'Áp dụng cho đăng ký trong tháng 2/2026',
      discount: '15%',
      expiry: '28/02/2026',
      status: 'active'
    },
    {
      id: 'v-2',
      code: 'FULLSTACK50',
      title: 'Giảm 500K khóa Fullstack',
      description: 'Áp dụng cho khóa Lập trình Web Fullstack',
      discount: '500.000đ',
      expiry: '15/03/2026',
      status: 'active'
    },
    {
      id: 'v-3',
      code: 'UIUX300',
      title: 'Giảm 300K khóa UI/UX',
      description: 'Áp dụng cho khóa Thiết kế UI/UX',
      discount: '300.000đ',
      expiry: '20/03/2026',
      status: 'active'
    },
    {
      id: 'v-4',
      code: 'WELCOME10',
      title: 'Giảm 10% cho học viên mới',
      description: 'Áp dụng cho đăng ký lần đầu',
      discount: '10%',
      expiry: '31/12/2026',
      status: 'active'
    },
    {
      id: 'v-5',
      code: 'FRIEND200',
      title: 'Giảm 200K khi giới thiệu bạn bè',
      description: 'Cả bạn và bạn bè đều được giảm',
      discount: '200.000đ',
      expiry: '31/03/2026',
      status: 'active'
    }
  ]

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <Page restoreScroll className="bg-[#F8FAFC]">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-br from-[#00529C] to-[#0066CC] px-4 pt-6 pb-8 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <a href="/hnau/account" className="text-white">
              <Icon icon="zi-arrow-left" size={24} />
            </a>
            <h2 className="text-2xl font-bold text-white flex-1">Voucher ưu đãi</h2>
          </div>
          <p className="text-white/90 text-sm ml-10">Mã giảm giá và ưu đãi đặc biệt</p>
        </div>

        <section className="px-4 pb-20">
          {/* ===== INFO CARD ===== */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-heart" size={20} className="text-[#00529C]" />
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900 mb-1">
                  Cách sử dụng voucher
                </div>
                <div className="text-xs text-gray-600">
                  Sao chép mã voucher và nhập khi đăng ký khóa học để được giảm giá
                </div>
              </div>
            </div>
          </div>

          {/* ===== VOUCHERS LIST ===== */}
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md"
              >
                <div className="relative">
                  <div className="bg-gradient-to-r from-[#00529C] to-[#0066CC] px-5 py-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="text-white font-bold text-base mb-1">
                          {voucher.title}
                        </div>
                        <div className="text-white/80 text-xs">
                          {voucher.description}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg px-3 py-2">
                        <div className="text-[#00529C] font-bold text-lg text-center">
                          {voucher.discount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative circles */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#F8FAFC] rounded-full"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#F8FAFC] rounded-full"></div>
                </div>

                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">Mã voucher:</div>
                      <div className="font-mono font-bold text-lg text-[#00529C]">
                        {voucher.code}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(voucher.code)}
                      className="bg-[#00529C] text-white px-4 py-2 rounded-lg font-semibold text-sm active:scale-95 transition flex items-center gap-2"
                    >
                      {copiedCode === voucher.code ? (
                        <>
                          <Icon icon="zi-check" size={16} />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Icon icon="zi-copy" size={16} />
                          Sao chép
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Icon icon="zi-clock-1" size={12} />
                      HSD: {voucher.expiry}
                    </div>
                    <a
                      href="/hnau/courses"
                      className="text-[#00529C] text-sm font-semibold"
                    >
                      Sử dụng ngay →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== FOOTER NOTE ===== */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Điều khoản và điều kiện áp dụng</p>
            <a href="/hnau/account" className="text-[#00529C] font-semibold">
              Xem chi tiết
            </a>
          </div>
        </section>
      </PageContainer>
    </Page>
  )
}
