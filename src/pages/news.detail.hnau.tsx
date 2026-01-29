import React from 'react'
import { Page, Icon } from 'zmp-ui'
import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components'
import newsData from '@/mock/hnau/news.json'
import { openChat } from 'zmp-sdk/apis'

export default function HnauNewsDetail() {
  const { id } = useParams()
  const item = newsData.news.find((n: any) => n.id === id)

  const handleContact = () => {
    openChat({
      type: 'oa',
      id: '3202842660808701267',
      message: `Tôi muốn biết thêm thông tin về: ${item?.title}`,
      success: () => {},
      fail: (error) => {
        console.error('Failed to open chat:', error)
      }
    })
  }

  if (!item) {
    return (
      <Page className="bg-[#FFF5F0]">
        <PageContainer>
          <div className="p-4 text-center">
            <Icon icon="zi-notif" size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500">Tin tức không tồn tại</p>
            <a href="/hnau" className="inline-block mt-4 text-primary font-semibold">
              ← Quay về trang chủ
            </a>
          </div>
        </PageContainer>
      </Page>
    )
  }

  return (
    <Page restoreScroll className="bg-[#FFF5F0]">
      <PageContainer>
        <div className="bg-gradient-to-r from-[#F37021] to-[#FF8C42] px-4 pt-6 pb-8 -mx-4 -mt-4 mb-4">
          <div className="flex items-center gap-3">
            <a href="/hnau" className="text-white">
              <Icon icon="zi-arrow-left" size={24} />
            </a>
            <div className="text-sm text-white/90">Chi tiết tin tức</div>
          </div>
        </div>

        <section className="px-4 pb-20">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-100">
            {/* Hero Image */}
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="p-5">
              {/* Badge & Date */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.type}
                </span>
                <span className="text-xs text-gray-500">
                  <Icon icon="zi-clock-1" size={12} className="inline mr-1" />
                  {item.publishedAt}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold mb-4 text-gray-900">
                {item.title}
              </h1>

              {/* Summary */}
              <div className="bg-orange-50 border-l-4 border-primary p-4 rounded mb-4">
                <p className="text-sm text-gray-700">
                  {item.summary}
                </p>
              </div>

              {/* Content */}
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-6">
                <p>{item.content}</p>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag: string) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleContact}
                  className="bg-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <Icon icon="zi-chat" size={20} />
                  Liên hệ tư vấn
                </button>
                <a
                  href="/hnau/courses"
                  className="bg-white border-2 border-primary text-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition"
                >
                  <Icon icon="zi-star" size={20} />
                  Xem khóa học
                </a>
              </div>
            </div>
          </div>

          {/* Related News */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Tin tức liên quan</h3>
            <div className="space-y-3">
              {newsData.news
                .filter((n: any) => n.id !== id)
                .slice(0, 3)
                .map((n: any) => (
                  <a
                    key={n.id}
                    href={`/hnau/news/${n.id}`}
                    className="flex gap-3 bg-white p-3 rounded-xl shadow-sm border border-orange-100 active:scale-[0.98] transition"
                  >
                    <img
                      src={n.imageUrl}
                      alt={n.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-primary font-semibold mb-1">
                        {n.type}
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {n.title}
                      </h4>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </section>
      </PageContainer>
    </Page>
  )
}
