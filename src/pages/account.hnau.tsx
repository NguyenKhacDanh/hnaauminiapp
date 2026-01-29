import React, { useEffect, useState } from 'react'
import { Page, Icon, useNavigate } from 'zmp-ui'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import { openChat, followOA } from 'zmp-sdk/apis'
import ordersData from '@/mock/orders.json'
import coursesData from '@/mock/hnau/courses.json'
import { storage } from '@/utils/storage'

interface Profile {
  name: string
  phone: string
  email: string
  avatar?: string
}

export default function HnauAccount() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile>({ name: '', phone: '', email: '' })
  const [saved, setSaved] = useState(false)
  const orders = ordersData.data as any[]

  useEffect(() => {
    let mounted = true
    storage.getItem<Profile>('hnau.profile').then((p) => {
      if (mounted && p) setProfile(p)
    })
    return () => { mounted = false }
  }, [])

  const handleSave = async () => {
    await storage.setItem('hnau.profile', profile)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleFollowOA = () => {
    followOA({
      id: '3202842660808701267',
      success: () => {
        console.log('Followed OA successfully')
        alert('Đã quan tâm OA Hướng Nghiệp Á Âu!')
      },
      fail: (error) => {
        console.error('Failed to follow OA:', error)
        window.open('https://zalo.me/3202842660808701267', '_blank')
      }
    })
  }

  const handleOpenChat = () => {
    openChat({
      type: 'oa',
      id: '3202842660808701267',
      message: 'Xin chào, tôi cần hỗ trợ!',
      success: () => {},
      fail: (error) => {
        console.error('Failed to open chat:', error)
      }
    })
  }

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        <div className="bg-[#005EB8] px-4 pt-4 pb-12 -mx-4 -mt-4">
          <div className="flex items-center justify-center relative">
            <h2 className="text-base font-semibold text-white">Cá nhân</h2>
            {saved && <span className="absolute right-0 text-xs text-white bg-green-500 px-2 py-1 rounded">✓ Đã lưu</span>}
          </div>
        </div>

        <section className="px-3 pb-20 -mt-8">{/* Giảm overlap từ -mt-12 xuống -mt-8 */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-[#005EB8] to-[#0066CC] rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-base text-gray-900">{profile.name || 'Người dùng'}</div>
                <div className="text-sm text-gray-500">{profile.phone || 'Chưa cập nhật'}</div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="block">
                <span className="text-xs font-medium text-gray-700 mb-1 block">Họ và tên</span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Nhập họ tên"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8] bg-white"
                  autoComplete="name"
                />
              </label>
              
              <label className="block">
                <span className="text-xs font-medium text-gray-700 mb-1 block">Số điện thoại</span>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8] bg-white"
                  autoComplete="tel"
                  inputMode="numeric"
                />
              </label>
              
              <label className="block">
                <span className="text-xs font-medium text-gray-700 mb-1 block">Email</span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="Nhập email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#005EB8] focus:border-[#005EB8] bg-white"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>
            </div>
            
            <button 
              onClick={handleSave} 
              className="w-full bg-[#005EB8] text-white px-4 py-2.5 rounded-lg font-semibold text-sm active:opacity-80 transition mt-3"
            >
              Lưu thông tin
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <a
              href="/hnau/vouchers"
              className="bg-white rounded-xl shadow-sm p-3.5 active:opacity-70 transition flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-heart" size={22} className="text-red-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">Ưu đãi</div>
                <div className="text-xs text-gray-500">0 voucher</div>
              </div>
            </a>

            <a
              href="/hnau/my-courses"
              className="bg-white rounded-xl shadow-sm p-3.5 active:opacity-70 transition flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-star" size={22} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">Khóa học</div>
                <div className="text-xs text-gray-500">Đã mua</div>
              </div>
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-3">
            <button 
              onClick={() => navigate('/hnau/account')} 
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition border-b border-gray-100 text-left bg-transparent border-0"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-user" size={18} className="text-[#005EB8]" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">Chỉnh sửa thông tin</span>
              <Icon icon="zi-chevron-right" size={18} className="text-gray-400" />
            </button>

            <button 
              onClick={() => navigate('/hnau/orders')} 
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition border-b border-gray-100 text-left bg-transparent border-0"
            >
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-list-1" size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">Đơn hàng</div>
                <div className="text-xs text-gray-500">Xem tất cả</div>
              </div>
              <Icon icon="zi-chevron-right" size={18} className="text-gray-400" />
            </button>

            <button 
              onClick={() => navigate('/hnau/sessions')} 
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition border-b border-gray-100 text-left bg-transparent border-0"
            >
              <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-calendar" size={18} className="text-purple-600" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">Lịch chiêu sinh</span>
              <Icon icon="zi-chevron-right" size={18} className="text-gray-400" />
            </button>

            <button onClick={handleOpenChat} className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition border-b border-gray-100 text-left bg-transparent border-0">
              <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-chat" size={18} className="text-green-600" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">Hỗ trợ trực tuyến</span>
              <Icon icon="zi-chevron-right" size={18} className="text-gray-400" />
            </button>

            <button 
              onClick={() => navigate('/hnau/branches')} 
              className="w-full flex items-center gap-3 px-4 py-3 active:bg-gray-50 transition text-left bg-transparent border-0"
            >
              <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon icon="zi-location" size={18} className="text-orange-600" />
              </div>
              <span className="flex-1 text-sm font-medium text-gray-800">Sổ địa chỉ</span>
              <Icon icon="zi-chevron-right" size={18} className="text-gray-400" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <div className="text-xs text-gray-600 mb-3 text-center">
              Quan tâm OA để nhận các chương trình đặc quyền ưu đãi
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://portal.huongnghiepaau.com/Images/logo-small.png"
                alt="Logo"
                className="w-12 h-12 rounded-full border border-gray-200"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm">HNAU - Hướng Nghiệp Á Âu</div>
                <div className="text-xs text-gray-500">Official Account</div>
              </div>
            </div>
            <button
              onClick={handleFollowOA}
              className="w-full bg-[#f47421] text-white text-center py-2.5 rounded-lg font-semibold text-sm active:opacity-80 transition"
            >
              Quan tâm
            </button>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-2.5 px-0.5">
              <h3 className="text-[15px] font-bold text-gray-900 flex items-center gap-1.5">
                <Icon icon="zi-clock-1" size={16} className="text-[#005EB8]" />
                Đơn hàng gần đây
              </h3>
              <button 
                onClick={() => navigate('/hnau/orders')} 
                className="text-[#005EB8] text-xs font-semibold bg-transparent border-0 active:opacity-70 transition"
              >
                Xem tất cả
              </button>
            </div>
            
            <div className="space-y-2.5">
              {orders.slice(0, 2).map(o => (
                <div key={o.id} className="bg-white rounded-xl p-3.5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold text-gray-800">Mã: #{o.id}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      o.status === 'completed' ? 'bg-green-100 text-green-700' :
                      o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {o.status === 'completed' ? 'Hoàn thành' : o.status === 'pending' ? 'Đang xử lý' : 'Khác'}
                    </div>
                  </div>
                  
                  {o.student && (
                    <div className="text-xs text-gray-600 mb-2">
                      Học viên: {o.student.name}  {o.student.phone}
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {(o.items || []).map((it: any) => {
                      const course = coursesData.courses.find((c: any) => c.id === it.courseId)
                      return (
                        <div key={it.courseId} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700 text-xs line-clamp-1">{course?.title || it.title}</span>
                          <span className="text-[#005EB8] font-semibold text-xs whitespace-nowrap ml-2">{it.price?.toLocaleString()} đ</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </PageContainer>
      <HnauTabs activeTab="account" />
    </Page>
  )
}
