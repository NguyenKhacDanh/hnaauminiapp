import React, { useMemo, useState } from 'react'
import { Page, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import sessionsData from '@/mock/hnau/sessions.json'
import coursesData from '@/mock/hnau/courses.json'
import { HnauTabs } from '@/components/hnau-tabs'

export default function HnauSessions() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [format, setFormat] = useState('')
  const [location, setLocation] = useState('')

  const sessions = useMemo(() => {
    let list = sessionsData.sessions as any[]
    if (q) list = list.filter(s => (coursesData.courses.find(c => c.id === s.courseId)?.title || '').toLowerCase().includes(q.toLowerCase()))
    if (format) list = list.filter(s => String(s.format).toLowerCase().includes(format.toLowerCase()))
    if (location) list = list.filter(s => String(s.location).toLowerCase().includes(location.toLowerCase()))
    return list
  }, [q, format, location])

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3">Lịch chiêu sinh / Khai giảng</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Khóa học" className="p-2 border rounded-md" />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Địa điểm" className="p-2 border rounded-md" />
            <input value={format} onChange={e => setFormat(e.target.value)} placeholder="Hình thức" className="p-2 border rounded-md" />
          </div>
          <div className="space-y-2">
            {sessions.map(s => {
              const c = coursesData.courses.find(c => c.id === s.courseId)
              return (
                <div key={s.id} className="p-3 bg-white rounded-md">
                  <div className="font-medium">{c?.title}</div>
                  <div className="text-sm text-muted">{s.startDate} · {s.location} · {s.format}</div>
                  <button 
                    onClick={() => navigate(`/hnau/course/${c?.id}`)} 
                    className="mt-2 inline-block text-primary bg-transparent border-0 active:opacity-70 transition"
                  >
                    Xem chi tiết & đăng ký
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </PageContainer>
      <HnauTabs activeTab="account" />
    </Page>
  )
}
