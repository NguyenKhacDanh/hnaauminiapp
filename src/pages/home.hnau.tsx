import React from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import { openChat } from 'zmp-sdk/apis'

import academies from '@/mock/hnau/academies.json'
import newsData from '@/mock/hnau/news.json'
import coursesData from '@/mock/hnau/courses.json'
import sessionsData from '@/mock/hnau/sessions.json'

export default function HnauHome() {
  const navigate = useNavigate()
  const academy = academies.academies[0]
  const hotNews = newsData.news.slice(0, 3)
  const courses = (coursesData.courses as any[]).slice(0, 4)

  const handleOpenChat = () => {
    // Open chat with Zalo OA
    openChat({
      type: 'oa',
      id: '3202842660808701267',
      message: 'Xin chào! Tôi cần hỗ trợ thông tin về khóa học',
      success: () => {
        console.log('Opened OA chat')
      },
      fail: (error) => {
        console.error('Failed to open chat:', error)
      }
    })
  }

  const handleSearch = () => {
    navigate('/hnau/search')
  }

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer noInsetTop>

        {/* ===== TOP BAR ===== */}
        <div className="sticky top-0 z-20 bg-[#005EB8] shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Icon icon="zi-user" size={24} className="text-white" />
              </div>
              <div className="text-white">
                <div className="text-xs opacity-80">Xin chào,</div>
                <div className="text-sm font-semibold">Guest</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleSearch}
                className="w-9 h-9 flex items-center justify-center text-white active:opacity-70 transition bg-transparent border-0"
              >
                <Icon icon="zi-more-grid" size={22} />
              </button>
              <button 
                onClick={() => navigate('/hnau')}
                className="w-9 h-9 flex items-center justify-center text-white active:opacity-70 transition bg-transparent border-0"
              >
                <Icon icon="zi-close" size={22} />
              </button>
            </div>
          </div>
        </div>

        <section className="px-3 pb-20 pt-3">

          {/* ===== QUICK ACTIONS CARD ===== */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <div className="grid grid-cols-4 gap-3 text-center">
              <button
                onClick={() => navigate('/hnau/news')}
                className="flex flex-col items-center gap-1.5 active:opacity-70 transition bg-transparent border-0"
              >
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
                  <Icon icon="zi-notif" size={26} className="text-[#005EB8]" />
                </div>
                <div className="text-[11px] font-medium text-gray-700 leading-tight">
                  Tin tức
                </div>
              </button>
              
              <button
                onClick={() => navigate('/hnau/admissions')}
                className="flex flex-col items-center gap-1.5 active:opacity-70 transition bg-transparent border-0"
              >
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
                  <Icon icon="zi-edit" size={26} className="text-[#005EB8]" />
                </div>
                <div className="text-[11px] font-medium text-gray-700 leading-tight">
                  Tuyển sinh
                </div>
              </button>
              
              <button
                onClick={() => navigate('/hnau/schedule')}
                className="flex flex-col items-center gap-1.5 active:opacity-70 transition bg-transparent border-0"
              >
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
                  <Icon icon="zi-calendar" size={26} className="text-[#005EB8]" />
                </div>
                <div className="text-[11px] font-medium text-gray-700 leading-tight">
                  Đặt lịch
                </div>
              </button>
              
              <button
                onClick={handleOpenChat}
                className="flex flex-col items-center gap-1.5 active:opacity-70 transition bg-transparent border-0"
              >
                <div className="w-14 h-14 bg-[#E3F2FD] rounded-2xl flex items-center justify-center">
                  <Icon icon="zi-call" size={26} className="text-[#005EB8]" />
                </div>
                <div className="text-[11px] font-medium text-gray-700 leading-tight">
                  Liên hệ
                </div>
              </button>
            </div>
          </div>

          {/* ===== BANNER ===== */}
          <button 
            onClick={() => navigate('/hnau/admissions')} 
            className="block mb-3 w-full active:opacity-70 transition bg-transparent border-0 p-0"
          >
            <img
              src={academy.coverUrl}
              alt="Banner"
              className="w-full h-44 object-cover rounded-xl shadow-sm"
            />
          </button>

          {/* ===== QUAN TÂM OA ===== */}
          <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-100 rounded-xl p-3.5 mb-3 shadow-sm">
            <div className="text-xs text-gray-600 mb-2.5 leading-relaxed">
              Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
            </div>
            <div className="flex items-center gap-3">
              <img
                src="https://portal.huongnghiepaau.com/Images/logo-small.png"
                alt="Logo"
                className="w-11 h-11 rounded-full border-2 border-white shadow-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900">
                  HNAU - Hướng Nghiệp Á Âu
                </div>
                <div className="text-xs text-gray-500">Official Account</div>
              </div>
              <a
                href="https://zalo.me/3202842660808701267"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#f47421] text-white px-4 py-2 rounded-lg font-semibold text-sm active:opacity-80 transition flex-shrink-0"
              >
                Quan tâm
              </a>
            </div>
          </div>

          {/* ===== TIN TUYỂN SINH ===== */}
          <div className="flex justify-between items-center mb-2.5 px-0.5">
            <h2 className="text-[15px] font-bold text-gray-900">
              Tin tuyển sinh
            </h2>
            <button 
              onClick={() => navigate('/hnau/admissions')} 
              className="text-[#005EB8] text-xs font-semibold flex items-center gap-0.5 bg-transparent border-0 active:opacity-70 transition"
            >
              Xem thêm
            </button>
          </div>

          <div className="space-y-2.5 mb-4">
            {hotNews.slice(0, 1).map((n: any) => (
              <button
                key={n.id}
                onClick={() => navigate(`/hnau/news/${n.id}`)}
                className="block bg-white rounded-xl overflow-hidden shadow-sm active:opacity-90 transition w-full text-left border-0 p-0"
              >
                <img
                  src={n.imageUrl || academy.coverUrl}
                  alt={n.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                    <Icon icon="zi-clock-1" size={10} />
                    {n.publishedAt}
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-snug">
                    {n.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* ===== TIN TỨC MỚI NHẤT ===== */}
          <div className="flex justify-between items-center mb-2.5 px-0.5">
            <h2 className="text-[15px] font-bold text-gray-900">
              Tin tức mới nhất
            </h2>
            <button 
              onClick={() => navigate('/hnau/news')} 
              className="text-[#005EB8] text-xs font-semibold bg-transparent border-0 active:opacity-70 transition"
            >
              Tất cả
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {hotNews.slice(1, 5).map((n: any) => (
              <button
                key={n.id}
                onClick={() => navigate(`/hnau/news/${n.id}`)}
                className="block bg-white rounded-xl overflow-hidden shadow-sm active:opacity-90 transition w-full text-left border-0 p-0"
              >
                <img
                  src={n.imageUrl || academy.coverUrl}
                  alt={n.title}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2.5">
                  <h3 className="font-semibold text-xs line-clamp-2 min-h-[32px] text-gray-900 leading-tight">
                    {n.title}
                  </h3>
                  <div className="text-[10px] text-gray-500 mt-1.5 flex items-center gap-1">
                    <Icon icon="zi-clock-1" size={9} />
                    {n.publishedAt?.slice(5) || ''}
                  </div>
                </div>
              </button>
            ))}
          </div>

        </section>
      </PageContainer>
      <HnauTabs activeTab="home" />
    </Page>
  )
}
