import React, { useEffect, useState } from 'react'
import { Page } from 'zmp-ui'
import { useLocation } from 'react-router-dom'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function HnauRegister() {
  const q = useQuery()
  const courseId = q.get('course') || ''
  // mock auto-fill from Zalo (static sample)
  const [form, setForm] = useState({ name: 'Nguyễn Khắc Danh', phone: '0981494148', email: 'khacdanh@huongnghiepaau.com' })

  useEffect(() => {
    // in real app, read from Zalo SDK to prefill
  }, [])

  const submit = () => {
    // mock submit: show success toast via alert
    alert(`Đăng ký thành công cho khóa ${courseId} - ${form.name}`)
    // redirect to dashboard
    window.location.href = '/hnau/dashboard'
  }

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <div className="p-4 bg-white rounded-md">
          <h2 className="text-lg font-medium">Đăng ký khóa học</h2>
          <div className="mt-3">
            <label className="block text-sm">Họ tên</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-3">
            <label className="block text-sm">Số điện thoại</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-3">
            <label className="block text-sm">Email</label>
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-4">
            <button onClick={submit} className="w-full bg-primary text-white py-2 rounded-md">Thanh toán & Đăng ký (mock)</button>
          </div>
        </div>
      </PageContainer>
  <HnauTabs activeTab="courses" />
    </Page>
  )
}
