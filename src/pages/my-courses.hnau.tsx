import React from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import coursesData from '@/mock/hnau/courses.json'

export default function HnauMyCourses() {
  const navigate = useNavigate()
  // Mock data khóa học đã mua
  const myCourses = [
    {
      ...coursesData.courses[0],
      enrolledDate: '2026-01-15',
      progress: 45,
      status: 'active'
    },
    {
      ...coursesData.courses[1],
      enrolledDate: '2026-01-10',
      progress: 78,
      status: 'active'
    }
  ]

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
            <h2 className="text-2xl font-bold text-white flex-1">Khóa học của tôi</h2>
          </div>
          <p className="text-white/90 text-sm ml-10">Quản lý các khóa học đã đăng ký</p>
        </div>

        <section className="px-4 pb-20">
          {myCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="zi-star" size={32} className="text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">Bạn chưa đăng ký khóa học nào</p>
              <button
                onClick={() => navigate('/hnau/courses')}
                className="inline-block bg-[#00529C] text-white px-6 py-3 rounded-lg font-semibold border-0 active:opacity-80 transition"
              >
                Khám phá khóa học
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myCourses.map((course: any) => (
                <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-md">
                  <div className="flex gap-4 p-4">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-28 h-28 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base line-clamp-2 mb-2">
                        {course.title}
                      </h3>
                      <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                        <Icon icon="zi-clock-1" size={12} />
                        Đăng ký: {course.enrolledDate}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600">Tiến độ</span>
                          <span className="text-xs font-bold text-[#00529C]">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#00529C] to-[#0066CC] h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={`/hnau/course/${course.id}`}
                          className="flex-1 bg-[#00529C] text-white text-center py-2 rounded-lg font-semibold text-xs active:scale-95 transition"
                        >
                          Tiếp tục học
                        </a>
                        <a
                          href={`/hnau/course/${course.id}/certificate`}
                          className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg font-semibold text-xs active:scale-95 transition"
                        >
                          Chứng chỉ
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== STATS ===== */}
          {myCourses.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#00529C] mb-1">
                  {myCourses.length}
                </div>
                <div className="text-xs text-gray-600">Khóa học</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#00529C] mb-1">
                  {Math.round(myCourses.reduce((sum, c) => sum + c.progress, 0) / myCourses.length)}%
                </div>
                <div className="text-xs text-gray-600">Hoàn thành</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#00529C] mb-1">
                  {myCourses.filter(c => c.progress >= 80).length}
                </div>
                <div className="text-xs text-gray-600">Sắp xong</div>
              </div>
            </div>
          )}
        </section>
      </PageContainer>
    </Page>
  )
}
