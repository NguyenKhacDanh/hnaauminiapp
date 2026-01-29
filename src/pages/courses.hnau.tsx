import React, { useState, useEffect } from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

interface Academy {
  Id: number
  Name: string
}

interface Course {
  Id: number
  HocVien?: string
  ChuongTrinh?: string
  HinhThucDaoTao?: string
  CapDo?: string
  ChiNhanh?: string
  Khoa?: string
  StartDate?: string
  TuitionFee?: number
  StatusClass?: string
  Note?: string | null
  ClassId?: number
  [key: string]: any
}

// Ảnh demo cho các khóa học
const courseImages: { [key: string]: string } = {
  'guitar': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400',
  'piano': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400',
  'violin': 'https://images.unsplash.com/photo-1612225330812-0<|aicompleteblocked|>bf5350f8ed2?w=400',
  'web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400',
  'ui/ux': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  'thiết kế': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
  'cntt': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
  'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  'default': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'
}

function getCourseImage(course: Course): string {
  const title = (course.ChuongTrinh || '').toLowerCase()
  for (const [key, url] of Object.entries(courseImages)) {
    if (title.includes(key)) return url
  }
  return courseImages.default
}

export default function HnauCourses() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('')
  const [academies, setAcademies] = useState<Academy[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 10

  // Fetch academies for filter
  useEffect(() => {
    fetch('https://crmportalreport.hocvienaau.edu.vn/api/Common/GetHocVien')
      .then(res => res.json())
      .then(data => {
        const academyList = data || []
        setAcademies(academyList)
        // Tự động set filter = Id học viện đầu tiên
        if (academyList.length > 0) {
          setFilter(String(academyList[0].Id))
        }
      })
      .catch(err => console.error('Failed to fetch academies:', err))
  }, [])

  // Fetch courses
  useEffect(() => {
    if (!filter) return // Chờ filter được set từ GetHocVien
    
    setLoading(true)
    setPage(1) // Reset về trang 1 khi đổi filter
    
    const now = new Date()
    const nextYear = new Date(now.getFullYear() + 1, 11, 31)
    
    const requestBody = {
      DateFrom: now.toISOString().split('T')[0],
      DateTo: nextYear.toISOString().split('T')[0],
      SearchAcademy: filter
    }
    
    console.log('Fetching courses with params:', requestBody)
    
    fetch('https://crmportalreport.hocvienaau.edu.vn/api/report/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })
      .then(res => {
        console.log('Response status:', res.status)
        return res.json()
      })
      .then(response => {
        console.log('API Response:', response)
        if (response.success && response.data) {
          console.log('Number of courses:', response.data.length)
          setCourses(response.data)
        } else {
          console.log('No data in response')
          setCourses([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch courses:', err)
        setCourses([])
        setLoading(false)
      })
  }, [filter])

  // Filter by search query & pagination
  useEffect(() => {
    let filtered = courses
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = courses.filter(c => 
        (c.ChuongTrinh || '').toLowerCase().includes(query) ||
        (c.HocVien || '').toLowerCase().includes(query) ||
        (c.Khoa || '').toLowerCase().includes(query) ||
        (c.CapDo || '').toLowerCase().includes(query)
      )
    }
    
    // Apply pagination
    const startIndex = 0
    const endIndex = page * ITEMS_PER_PAGE
    setDisplayedCourses(filtered.slice(startIndex, endIndex))
  }, [courses, searchQuery, page])

  // Load more function
  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  // Check if has more items
  const hasMore = displayedCourses.length < (searchQuery.trim() 
    ? courses.filter(c => 
        (c.ChuongTrinh || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.HocVien || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.Khoa || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.CapDo || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).length
    : courses.length
  )

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-[#005EB8] px-4 pt-4 pb-3 -mx-4 -mt-4 mb-3">
          <h2 className="text-base font-semibold text-white text-center">Khóa học</h2>
        </div>

        <section className="px-3 pb-20">
          {/* ===== SEARCH BAR ===== */}
          <div className="mb-3 -mx-3 px-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setPage(1) // Reset về trang 1 khi search
                }}
                placeholder="Tìm kiếm khóa học, học viện, khoa..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#005EB8] focus:outline-none text-sm transition"
              />
              <Icon 
                icon="zi-search" 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setPage(1)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Icon icon="zi-close-circle" size={20} />
                </button>
              )}
            </div>
          </div>

          {/* ===== FILTER TABS ===== */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 -mx-3 px-3">
            {academies.map((academy) => (
              <button
                key={academy.Id}
                onClick={() => {
                  setFilter(String(academy.Id))
                  setSearchQuery('') // Clear search khi đổi filter
                  setPage(1)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === String(academy.Id)
                    ? 'bg-[#005EB8] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {academy.Name}
              </button>
            ))}
          </div>

          {/* ===== COURSE LIST ===== */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-clock-1" size={48} />
              </div>
              <p className="text-gray-500">Đang tải...</p>
            </div>
          ) : displayedCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-search" size={48} />
              </div>
              <p className="text-gray-500">
                {searchQuery ? 'Không tìm thấy khóa học phù hợp' : 'Không tìm thấy khóa học nào'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-[#005EB8] text-sm font-semibold"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="space-y-2.5">
                {displayedCourses.map(c => (
                  <button 
                    key={c.ClassId || c.Id} 
                    onClick={() => navigate(`/hnau/course/${c.ClassId || c.Id}`)}
                    className="block bg-white rounded-xl shadow-sm overflow-hidden active:opacity-80 transition w-full text-left border-0 p-0"
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <img 
                          src={getCourseImage(c)} 
                          alt={c.ChuongTrinh || 'Khóa học'} 
                          className="w-full h-full object-cover rounded-lg" 
                        />
                        {c.TuitionFee && c.TuitionFee > 5000000 && (
                          <div className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            HOT
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-gray-900 leading-tight">
                            {c.ChuongTrinh || 'Khóa học'}
                          </h3>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500 mb-1">
                            {c.HocVien && (
                              <span className="bg-blue-50 text-[#005EB8] px-2 py-0.5 rounded-full font-medium">
                                {c.HocVien}
                              </span>
                            )}
                            {c.HinhThucDaoTao && (
                              <span className="flex items-center gap-0.5">
                                <Icon icon="zi-note" size={11} />
                                {c.HinhThucDaoTao}
                              </span>
                            )}
                          </div>
                          {c.StartDate && (
                            <div className="text-[10px] text-gray-600 flex items-center gap-0.5">
                              <Icon icon="zi-calendar" size={11} />
                              Khai giảng: {new Date(c.StartDate).toLocaleDateString('vi-VN')}
                            </div>
                          )}
                          {c.CapDo && (
                            <div className="text-[10px] text-gray-600 mt-0.5">
                              {c.CapDo}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-1">
                          <div>
                            {c.TuitionFee && (
                              <div className="text-[#005EB8] font-bold text-sm">
                                {c.TuitionFee.toLocaleString()}đ
                              </div>
                            )}
                          </div>
                          <div className="bg-[#005EB8] text-white text-xs px-3 py-1.5 rounded-lg font-semibold">
                            Chi tiết
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* ===== LOAD MORE BUTTON ===== */}
              {hasMore && (
                <div className="mt-4 text-center">
                  <button
                    onClick={loadMore}
                    className="bg-white text-[#005EB8] border-2 border-[#005EB8] px-6 py-3 rounded-xl font-semibold text-sm active:opacity-80 transition inline-flex items-center gap-2"
                  >
                    <Icon icon="zi-plus-circle" size={20} />
                    Xem thêm {Math.min(ITEMS_PER_PAGE, (searchQuery.trim() 
                      ? courses.filter(c => 
                          (c.ChuongTrinh || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.HocVien || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.Khoa || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.CapDo || '').toLowerCase().includes(searchQuery.toLowerCase())
                        ).length
                      : courses.length
                    ) - displayedCourses.length)} khóa học
                  </button>
                </div>
              )}

              {/* ===== RESULT COUNT ===== */}
              <div className="mt-3 text-center text-xs text-gray-500">
                Hiển thị {displayedCourses.length} / {searchQuery.trim() 
                  ? courses.filter(c => 
                      (c.ChuongTrinh || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (c.HocVien || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (c.Khoa || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                      (c.CapDo || '').toLowerCase().includes(searchQuery.toLowerCase())
                    ).length
                  : courses.length
                } khóa học
              </div>
            </>
          )}
        </section>
      </PageContainer>
      <HnauTabs activeTab="courses" />
    </Page>
  )
}
