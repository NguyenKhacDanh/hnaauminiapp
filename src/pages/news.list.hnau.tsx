import React from 'react'
import { Page } from 'zmp-ui'
import { Link } from 'react-router-dom'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'

import newsData from '@/mock/hnau/news.json'

export default function HnauNews() {
  const news = newsData.news

  return (
    <Page restoreScroll className="bg-background">
      <PageContainer>
        <section className="p-4">
          <h2 className="text-xl font-semibold mb-3">Tin tức & Ưu đãi</h2>
          <div className="space-y-3">
            {news.map((n: any) => (
              <Link to={`/hnau/news/${n.id}`} key={n.id} className="block p-3 bg-white rounded-md">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-muted">{n.summary}</div>
              </Link>
            ))}
          </div>
        </section>
      </PageContainer>
  <HnauTabs activeTab="courses" />
    </Page>
  )
}
