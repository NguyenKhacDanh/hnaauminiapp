import React, { useState } from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import coursesData from '@/mock/hnau/courses.json'
import sessionsData from '@/mock/hnau/sessions.json'

export default function HnauCourses() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('all')
  const courses = coursesData.courses as any[]

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(c => c.tags.some((tag: string) => tag.toLowerCase().includes(filter.toLowerCase())))

  const categories = ['all', 'CNTT', 'Thiết kế', 'Ngoại ngữ', 'Kỹ năng mềm']

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-[#005EB8] px-4 pt-6 pb-6 -mx-4 -mt-4 mb-3">
          <h2 className="text-lg font-semibold text-white text-center">Khóa học</h2>
          <p className="text-white/80 text-xs mt-1 text-center">Khám phá các khóa học chất lượng cao</p>
        </div>

        <section className="px-3 pb-20">
          {/* ===== FILTER TABS ===== */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 -mx-3 px-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === cat
                    ? 'bg-[#005EB8] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat}
              </button>
            ))}
          </div>

          {/* ===== COURSE LIST ===== */}
          <div className="space-y-2.5">
            {filteredCourses.map(c => {
              const firstSession = (sessionsData.sessions as any[]).find(s => s.courseId === c.id)
              return (
                <button 
                  key={c.id} 
                  onClick={() => navigate(`/hnau/course/${c.id}`)}
                  className="block bg-white rounded-xl shadow-sm overflow-hidden active:opacity-80 transition w-full text-left border-0 p-0"
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={c.imageUrl} 
                        alt={c.title} 
                        className="w-full h-full object-cover rounded-lg" 
                      />
                      {c.discountPercent && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          -{c.discountPercent}%
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900 leading-tight">{c.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                          <span className="flex items-center gap-0.5">
                            <Icon icon="zi-clock-1" size={11} />
                            {c.duration}
                          </span>
                          {c.tags.length > 0 && (
                            <span className="bg-blue-50 text-[#005EB8] px-2 py-0.5 rounded-full font-medium">
                              {c.tags[0]}
                            </span>
                          )}
                        </div>
                        {firstSession && (
                          <div className="text-[10px] text-gray-600 flex items-center gap-0.5">
                            <Icon icon="zi-calendar" size={11} />
                            Khai giảng: {firstSession.startDate}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <div>
                          {c.originalPrice && c.originalPrice > c.price && (
                            <div className="text-[10px] text-gray-400 line-through">
                              {c.originalPrice.toLocaleString()}đ
                            </div>
                          )}
                          <div className="text-[#005EB8] font-bold text-sm">
                            {c.price.toLocaleString()}đ
                          </div>
                        </div>
                        <button className="bg-primary text-white text-sm px-4 py-2 rounded-lg font-semibold">
                          Chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-search" size={48} />
              </div>
              <p className="text-gray-500">Không tìm thấy khóa học nào</p>
            </div>
          )}
        </section>
      </PageContainer>
      <HnauTabs activeTab="courses" />
    </Page>
  )
}
