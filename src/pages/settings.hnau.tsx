import React from 'react'
import { Page } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import ordersData from '@/mock/orders.json'

export default function HnauSettings() {
  const orders = ordersData.data as any[]

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <section className="p-4">
          <h2 className="text-xl font-semibold mb-3">Cài đặt & Khóa đã mua</h2>
          <div className="p-3 bg-white rounded-lg shadow">
            <div className="font-medium">Tài khoản</div>
            <div className="text-sm text-muted">Quản lý thông tin cá nhân và trạng thái đăng ký.</div>
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Đăng ký khóa học</h3>
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="p-3 bg-white rounded-lg shadow">
                <div className="text-sm">Mã đăng ký: {o.id}</div>
                <div className="text-sm">Trạng thái: {o.status}</div>
                <div className="text-sm">Học viên: {o.student?.name} • {o.student?.phone}</div>
                <div className="mt-2">
                  {(o.items || []).map((it: any) => (
                    <div key={it.courseId} className="text-sm">{it.title} — {it.price?.toLocaleString()} VND</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
  <HnauTabs activeTab="account" />
    </Page>
  )
}
