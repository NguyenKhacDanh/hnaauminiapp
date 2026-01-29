import React from 'react'
import { Page } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import branchesData from '@/mock/hnau/branches.json'

export default function HnauBranches() {
  const branches = branchesData.branches as any[]

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <section className="p-4">
          <h2 className="text-xl font-semibold mb-3">Hệ thống chi nhánh</h2>
          <div className="space-y-3">
            {branches.map(b => (
              <div key={b.id} className="p-3 bg-white rounded-lg shadow transition hover:shadow-md">
                <div className="font-medium text-base">{b.name}</div>
                <div className="text-sm mt-1">Địa chỉ: {b.address}</div>
                {b.phone && <div className="text-sm">Điện thoại: {b.phone}</div>}
                {b.openHours && <div className="text-sm">Giờ mở cửa: {b.openHours}</div>}
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
      <HnauTabs activeTab="branches" />
    </Page>
  )
}
