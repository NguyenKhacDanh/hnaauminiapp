import React, { useMemo, useState } from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import coursesData from '@/mock/hnau/courses.json'
import newsData from '@/mock/hnau/news.json'

export default function HnauSearch() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [activeTab, setActiveTab] = useState<'courses' | 'news'>('courses')
  const courses = coursesData.courses
  const news = newsData.news

  const filteredCourses = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return courses
    return courses.filter((c: any) => 
      c.title.toLowerCase().includes(term) || 
      c.tags.join(' ').toLowerCase().includes(term) ||
      c.description?.toLowerCase().includes(term)
    )
  }, [q, courses])

  const filteredNews = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return news
    return news.filter((n: any) => 
      n.title.toLowerCase().includes(term) || 
      n.summary?.toLowerCase().includes(term) ||
      n.type?.toLowerCase().includes(term)
    )
  }, [q, news])

  return (
    <Page restoreScroll className="bg-[#FFF5F0]">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-gradient-to-r from-[#F37021] to-[#FF8C42] px-4 pt-6 pb-8 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <button 
              onClick={() => navigate(-1)} 
              className="text-white bg-transparent border-0 active:opacity-70 transition"
            >
              <Icon icon="zi-arrow-left" size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white flex-1">Tìm kiếm</h2>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <input 
              value={q} 
              onChange={e => setQ(e.target.value)} 
              placeholder="Tìm khóa học, tin tức..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
              autoFocus
            />
            <Icon icon="zi-search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            {q && (
              <button 
                onClick={() => setQ('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Icon icon="zi-close-circle" size={20} />
              </button>
            )}
          </div>
        </div>

        <section className="px-4 pb-20">
          {/* ===== TABS ===== */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                activeTab === 'courses'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Khóa học ({filteredCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                activeTab === 'news'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              Tin tức ({filteredNews.length})
            </button>
          </div>

          {/* ===== SEARCH RESULTS ===== */}
          {activeTab === 'courses' && (
            <div className="space-y-3">
              {filteredCourses.map((c: any) => (
                <a 
                  key={c.id} 
                  href={`/hnau/course/${c.id}`} 
                  className="block bg-white p-4 rounded-2xl shadow-sm border border-orange-100 active:scale-[0.98] transition"
                >
                  <div className="flex gap-3">
                    <img 
                      src={c.imageUrl} 
                      alt={c.title} 
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base line-clamp-2 mb-1">{c.title}</h3>
                      <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Icon icon="zi-clock-1" size={12} />
                          {c.duration}
                        </span>
                        {c.tags[0] && (
                          <span className="bg-orange-50 text-primary px-2 py-0.5 rounded-full">
                            {c.tags[0]}
                          </span>
                        )}
                      </div>
                      <div className="text-primary font-bold text-sm">
                        {c.price.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </a>
              ))}
              
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Icon icon="zi-search" size={48} />
                  </div>
                  <p className="text-gray-500">
                    {q ? 'Không tìm thấy khóa học nào' : 'Nhập từ khóa để tìm kiếm'}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-3">
              {filteredNews.map((n: any) => (
                <a 
                  key={n.id} 
                  href={`/hnau/news/${n.id}`} 
                  className="block bg-white p-4 rounded-2xl shadow-sm border border-orange-100 active:scale-[0.98] transition"
                >
                  <div className="flex gap-3">
                    <img 
                      src={n.imageUrl} 
                      alt={n.title} 
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-primary font-semibold mb-1">
                        {n.type || 'Thông báo'}
                      </div>
                      <h3 className="font-bold text-sm line-clamp-2 mb-1">{n.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {n.summary}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
              
              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">
                    <Icon icon="zi-search" size={48} />
                  </div>
                  <p className="text-gray-500">
                    {q ? 'Không tìm thấy tin tức nào' : 'Nhập từ khóa để tìm kiếm'}
                  </p>
                </div>
              )}
            </div>
          )}
        </section>
      </PageContainer>
    </Page>
  )
}
