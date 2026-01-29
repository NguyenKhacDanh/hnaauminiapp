import React, { useEffect, useMemo, useState } from 'react'
import { Page, useNavigate, Icon } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

interface Academy {
  Id: number
  Name: string
  FullName: string | null
  Code: string | null
  Type: string | null
  STT: number | null
  IsActive: boolean | null
  Value: string | null
  ParentId: number | null
  Amount: number | null
}

interface Admission {
  Id: number
  HocVien?: string
  ChuongTrinh?: string
  HinhThucDaoTao?: string
  CapDo?: string
  ChiNhanh?: string
  Khoa?: string
  DivisionStudy?: string
  ThoiKhoaBieu?: string
  StartDate?: string
  FinishDate?: string
  FinishDateTemp?: string
  NgayDuKien?: string | null
  NgayDaBook?: string | null
  StatusClass?: string
  StudentCount?: number
  TuitionFee?: number
  DateAddStudentFirst?: number | null
  IsDisplay?: boolean | null
  TrangThai?: string
  Note?: string | null
  Link?: string | null
  NoteTV?: string | null
  MaxStudent?: number
  ClassId?: number
  RowNumber?: number
  TotalRow?: number
  [key: string]: any
}

export default function HnauSessions() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [academies, setAcademies] = useState<Academy[]>([])
  const [selectedAcademy, setSelectedAcademy] = useState<string>('')
  const [dateFrom, setDateFrom] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
  })
  const [dateTo, setDateTo] = useState(() => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0)
    return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-${String(nextMonth.getDate()).padStart(2, '0')}`
  })
  const [sessions, setSessions] = useState<Admission[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch academies on mount
  useEffect(() => {
    fetch('http://localhost:55777/api/Common/GetHocVien')
      .then(res => res.json())
      .then(data => {
        setAcademies(data || [])
        if (data && data.length > 0) {
          setSelectedAcademy(String(data[0].Id))
        }
      })
      .catch(err => {
        console.error('Failed to fetch academies:', err)
      })
  }, [])

  // Fetch admissions when filters change
  useEffect(() => {
    if (!selectedAcademy) return
    
    setLoading(true)
    
    fetch('http://localhost:55777/api/report/admissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DateFrom: dateFrom,
        DateTo: dateTo,
        SearchAcademy: selectedAcademy
      })
    })
      .then(res => res.json())
      .then(response => {
        console.log('API Response:', response)
        if (response.success && response.data) {
          setSessions(response.data)
        } else {
          setSessions([])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch admissions:', err)
        setSessions([])
        setLoading(false)
      })
  }, [selectedAcademy, dateFrom, dateTo])

  const filteredSessions = useMemo(() => {
    if (!q) return sessions
    return sessions.filter(s => 
      s.ChuongTrinh?.toLowerCase().includes(q.toLowerCase()) ||
      s.ChiNhanh?.toLowerCase().includes(q.toLowerCase()) ||
      s.HinhThucDaoTao?.toLowerCase().includes(q.toLowerCase()) ||
      s.HocVien?.toLowerCase().includes(q.toLowerCase())
    )
  }, [sessions, q])

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-[#005EB8] px-4 pt-6 pb-6 -mx-4 -mt-4 mb-3">
          <h2 className="text-lg font-semibold text-white text-center">Lịch chiêu sinh</h2>
          <p className="text-white/80 text-xs mt-1 text-center">Tìm kiếm lịch khai giảng các khóa học</p>
        </div>

        <section className="px-3 pb-20">
          {/* ===== FILTERS ===== */}
          <div className="bg-white rounded-xl shadow-sm p-3 mb-3">
            <div className="space-y-2.5">
              {/* Search */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Tìm kiếm</label>
                <div className="relative">
                  <Icon icon="zi-search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    value={q} 
                    onChange={e => setQ(e.target.value)} 
                    placeholder="Tên khóa học, địa điểm, hình thức..." 
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Academy Select */}
              <div>
                <label className="text-xs text-gray-600 mb-1 block">Học viện</label>
                <select 
                  value={selectedAcademy} 
                  onChange={e => setSelectedAcademy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  {academies.map(a => (
                    <option key={a.Id} value={a.Id}>{a.Name}</option>
                  ))}
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Từ ngày</label>
                  <input 
                    type="date"
                    value={dateFrom} 
                    onChange={e => setDateFrom(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Đến ngày</label>
                  <input 
                    type="date"
                    value={dateTo} 
                    onChange={e => setDateTo(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===== SESSIONS LIST ===== */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-clock-1" size={48} />
              </div>
              <p className="text-gray-500">Đang tải...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-search" size={48} />
              </div>
              <p className="text-gray-500">Không tìm thấy lịch chiêu sinh nào</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredSessions.map(s => (
                <div key={s.ClassId || s.Id} className="bg-white rounded-xl shadow-sm p-3.5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-sm text-gray-900 flex-1">
                      {s.ChuongTrinh || s.HocVien || 'Khóa học'}
                    </h3>
                    {s.CapDo && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 flex-shrink-0">
                        {s.CapDo}
                      </span>
                    )}
                  </div>
                  
                  {s.HocVien && (
                    <div className="text-xs text-gray-500 mb-2">
                      {s.HocVien}
                    </div>
                  )}
                  
                  <div className="space-y-1.5 mb-3">
                    {s.HinhThucDaoTao && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon icon="zi-note" size={14} className="text-[#005EB8]" />
                        <span>{s.HinhThucDaoTao}</span>
                      </div>
                    )}
                    
                    {s.ThoiKhoaBieu && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon icon="zi-clock-1" size={14} className="text-[#005EB8]" />
                        <span>{s.ThoiKhoaBieu}</span>
                      </div>
                    )}
                    
                    {s.StartDate && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon icon="zi-calendar" size={14} className="text-[#005EB8]" />
                        <span>Khai giảng: {new Date(s.StartDate).toLocaleDateString('vi-VN')}</span>
                      </div>
                    )}
                    
                    {s.ChiNhanh && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icon icon="zi-location" size={14} className="text-[#005EB8]" />
                        <span>{s.ChiNhanh}</span>
                      </div>
                    )}

                    {s.StatusClass && (
                      <div className="inline-block">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          s.StatusClass === 'Đang thực hiện' || s.StatusClass === 'Sẵn sàng' ? 'bg-green-100 text-green-700' :
                          s.StatusClass === 'Kế hoạch' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {s.StatusClass}
                        </span>
                      </div>
                    )}

                    {s.Note && (
                      <div className="text-xs text-gray-600 italic mt-2">
                        <Icon icon="zi-notif" size={12} className="inline-block mr-1" />
                        {s.Note}
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/hnau/register?sessionId=${s.ClassId || s.Id}`)}
                    className="w-full bg-[#005EB8] text-white text-center py-2 rounded-lg font-semibold text-sm active:opacity-80 transition border-0"
                  >
                    Đăng ký tư vấn
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </PageContainer>
      <HnauTabs activeTab="account" />
    </Page>
  )
}
