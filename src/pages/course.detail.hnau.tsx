import React from 'react'
import { Page } from 'zmp-ui'
import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

import coursesData from '@/mock/hnau/courses.json'
import sessionsData from '@/mock/hnau/sessions.json'

export default function HnauCourseDetail() {
  const { id } = useParams()
  const course = coursesData.courses.find((c: any) => c.id === id)
  const sessions = sessionsData.sessions.filter((s: any) => s.courseId === id)

  if (!course) return <Page><PageContainer><div className="p-4">Khóa học không tồn tại</div></PageContainer></Page>

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <div className="p-4 bg-white rounded-md">
          <h1 className="text-lg font-semibold">{course.title}</h1>
          <img src={course.imageUrl} alt={course.title} style={{ width: '100%', marginTop: 8, borderRadius: 8 }} />
          <p className="mt-3">{course.description}</p>
          <div className="mt-3 text-sm text-muted">Giá: {course.price.toLocaleString()} VND · {course.duration}</div>

          <h3 className="mt-4 font-medium">Lịch khai giảng</h3>
          <div className="mt-2 space-y-2">
            {sessions.map((s: any) => (
              <div key={s.id} className="p-2 border rounded-md">
                <div>{s.startDate} · {s.location} · {s.format}</div>
              </div>
            ))}
          </div>

          <a href={`/hnau/register?course=${course.id}`} className="mt-4 inline-block bg-primary text-white py-2 px-4 rounded-md">Đăng ký</a>
        </div>
      </PageContainer>
  <HnauTabs activeTab="courses" />
    </Page>
  )
}
