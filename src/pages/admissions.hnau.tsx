import React from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import newsData from '@/mock/hnau/news.json'
import sessionsData from '@/mock/hnau/sessions.json'
import coursesData from '@/mock/hnau/courses.json'

export default function HnauAdmissions() {
  const navigate = useNavigate()
  const admissionNews = newsData.news.filter((n: any) => n.type === 'Khai giảng' || n.type === 'Ưu đãi')

  return (
    <Page restoreScroll className="bg-[#F8FAFC]">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-br from-[#00529C] to-[#0066CC] px-4 pt-6 pb-8 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <button 
              onClick={() => navigate(-1)} 
              className="text-white bg-transparent border-0 active:opacity-70 transition"
            >
              <Icon icon="zi-arrow-left" size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white flex-1">Tuyển sinh</h2>
          </div>
          <p className="text-white/90 text-sm ml-10">Thông tin tuyển sinh và ưu đãi</p>
        </div>

        <section className="px-4 pb-20">
          {/* ===== THÔNG TIN TUYỂN SINH ===== */}
          <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
            <h3 className="font-bold text-lg mb-3 text-[#00529C]">
              Phương thức xét tuyển 2026
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon icon="zi-check" size={14} className="text-[#00529C]" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Phương thức 1:</div>
                  <div className="text-xs text-gray-600">
                    Xét tuyển kết quả kỳ thi THPT Quốc gia năm 2025
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon icon="zi-check" size={14} className="text-[#00529C]" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Phương thức 2:</div>
                  <div className="text-xs text-gray-600">
                    Xét tuyển kết quả học tập lớp 10, 11 và học kỳ 1 lớp 12
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon icon="zi-check" size={14} className="text-[#00529C]" />
                </div>
                <div>
                  <div className="font-semibold mb-1">Phương thức 3:</div>
                  <div className="text-xs text-gray-600">
                    Xét tuyển kết quả thi đánh giá năng lực các trường ĐHQG HCM năm 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== LỊCH KHAI GIẢNG ===== */}
          <h3 className="font-bold text-base mb-3 text-gray-800">
            Lịch khai giảng
          </h3>
          <div className="space-y-3 mb-5">
            {sessionsData.sessions.map((session: any) => {
              const course = coursesData.courses.find((c: any) => c.id === session.courseId)
              return (
                <div key={session.id} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-gray-900 mb-1">
                        {course?.title}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Icon icon="zi-calendar" size={12} />
                          {session.startDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon icon="zi-location" size={12} />
                          {session.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#00529C] font-bold text-base">
                        {course?.price.toLocaleString()}đ
                      </div>
                      {course?.discountPercent && (
                        <div className="text-[10px] text-red-500 font-semibold">
                          -{course.discountPercent}%
                        </div>
                      )}
                    </div>
                  </div>
                  <a
                    href={`/hnau/course/${course?.id}`}
                    className="block w-full bg-[#00529C] text-white text-center py-2 rounded-lg font-semibold text-sm active:scale-95 transition"
                  >
                    Đăng ký ngay
                  </a>
                </div>
              )
            })}
          </div>

          {/* ===== TIN TUYỂN SINH ===== */}
          <h3 className="font-bold text-base mb-3 text-gray-800">
            Tin tuyển sinh
          </h3>
          <div className="space-y-3">
            {admissionNews.map((n: any) => (
              <a
                key={n.id}
                href={`/hnau/news/${n.id}`}
                className="block bg-white rounded-xl overflow-hidden shadow-sm active:scale-[0.98] transition"
              >
                <img
                  src={n.imageUrl}
                  alt={n.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-[#00529C] px-2 py-1 rounded-full font-semibold">
                      {n.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      <Icon icon="zi-clock-1" size={12} className="inline mr-1" />
                      {n.publishedAt}
                    </span>
                  </div>
                  <h4 className="font-bold text-base line-clamp-2">
                    {n.title}
                  </h4>
                </div>
              </a>
            ))}
          </div>
        </section>
      </PageContainer>
    </Page>
  )
}
