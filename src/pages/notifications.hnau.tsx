import React, { useState } from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import newsData from '@/mock/hnau/news.json'

export default function HnauNotifications() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<string>('all')
  const notifications = newsData.news as any[]

  const filteredNotifs = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter)

  const types = [
    { key: 'all', label: 'Tất cả', color: 'bg-gray-500' },
    { key: 'Khai giảng', label: 'Khai giảng', color: 'bg-blue-500' },
    { key: 'Workshop', label: 'Workshop', color: 'bg-purple-500' },
    { key: 'Ưu đãi', label: 'Ưu đãi', color: 'bg-red-500' },
  ]

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-[#005EB8] px-4 pt-6 pb-6 -mx-4 -mt-4 mb-3">
          <h2 className="text-lg font-semibold text-white text-center">Thông báo</h2>
          <p className="text-white/80 text-xs mt-1 text-center">Cập nhật tin tức và chiêu sinh mới nhất</p>
        </div>

        <section className="px-3 pb-20">
          {/* ===== FILTER TABS ===== */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-3 -mx-3 px-3">
            {types.map((type) => (
              <button
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  filter === type.key
                    ? 'bg-[#005EB8] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* ===== NOTIFICATIONS LIST ===== */}
          <div className="space-y-2.5">
            {filteredNotifs.map((n, index) => {
              const typeInfo = types.find(t => t.key === n.type) || types[0]
              return (
                <button
                  key={n.id}
                  onClick={() => navigate(`/hnau/news/${n.id}`)}
                  className="block bg-white rounded-xl shadow-sm p-3.5 active:opacity-80 transition w-full text-left border-0"
                >
                  <div className="flex gap-3">
                    {/* Icon/Badge */}
                    <div className="flex-shrink-0">
                      <div className={`w-11 h-11 ${typeInfo.color} rounded-lg flex items-center justify-center`}>
                        <Icon 
                          icon={
                            n.type === 'Khai giảng' ? 'zi-calendar' :
                            n.type === 'Workshop' ? 'zi-star' :
                            n.type === 'Ưu đãi' ? 'zi-heart' :
                            'zi-notif'
                          } 
                          size={20} 
                          className="text-white" 
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm line-clamp-2 flex-1 text-gray-900 leading-tight">{n.title}</h3>
                        {index === 0 && (
                          <span className="flex-shrink-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            MỚI
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 line-clamp-2 mb-1.5 leading-snug">
                        {n.summary || n.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <span className={`px-2 py-0.5 rounded-full text-white ${typeInfo.color}`}>
                            {n.type}
                          </span>
                          <span>{n.publishedAt}</span>
                        </div>
                        <Icon icon="zi-chevron-right" size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {filteredNotifs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Icon icon="zi-notif" size={48} />
              </div>
              <p className="text-gray-500 text-sm">Chưa có thông báo nào</p>
            </div>
          )}
        </section>
      </PageContainer>
      <HnauTabs activeTab="notifications" />
    </Page>
  )
}
