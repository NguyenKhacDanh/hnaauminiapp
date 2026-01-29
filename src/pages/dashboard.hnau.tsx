import React, { useState } from 'react'
import { Page } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

export default function HnauDashboard() {
  const [phone, setPhone] = useState('')

  const search = () => {
    alert('Demo: hiển thị dashboard cho SĐT ' + phone)
  }

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <div className="p-4 bg-white rounded-md">
          <h2 className="text-lg font-medium">Dashboard học viên (demo)</h2>
          <div className="mt-3">
            <label className="block text-sm">Nhập SĐT để tìm hồ sơ</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>
          <div className="mt-3">
            <button onClick={search} className="w-full bg-primary text-white py-2 rounded-md">Tìm hồ sơ</button>
          </div>
          <div className="mt-4 text-sm text-muted">Kết quả demo: hiển thị thông tin học viên, khoá đã đăng ký, trạng thái thanh toán.</div>
        </div>
      </PageContainer>
  <HnauTabs activeTab="account" />
    </Page>
  )
}
