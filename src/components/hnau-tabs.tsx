import React, { useState } from 'react'
import { BottomNavigation, useNavigate, Icon } from 'zmp-ui'

type TabKey = 'home' | 'courses' | 'notifications' | 'account'

export function HnauTabs({ activeTab }: { activeTab: TabKey }) {
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabKey>(activeTab)

  function handleTabChange(next: string) {
    const key = next as TabKey
    setTab(key)
    switch (key) {
      case 'home':
        navigate('/hnau', { animate: false, replace: true })
        break
      case 'courses':
        navigate('/hnau/courses', { animate: false, replace: true })
        break
      case 'notifications':
        navigate('/hnau/notifications', { animate: false, replace: true })
        break
      case 'account':
        navigate('/hnau/account', { animate: false, replace: true })
        break
      default:
        break
    }
  }

  return (
    <BottomNavigation fixed activeKey={tab} onChange={handleTabChange} className="border-t border-gray-200">
      <BottomNavigation.Item key="home" label="Trang chủ" icon={<Icon icon="zi-home" />} />
      <BottomNavigation.Item key="courses" label="Khóa học" icon={<Icon icon="zi-star" />} />
      <BottomNavigation.Item key="notifications" label="Thông báo" icon={<Icon icon="zi-notif" />} />
      <BottomNavigation.Item key="account" label="Tài khoản" icon={<Icon icon="zi-user" />} />
    </BottomNavigation>
  )
}
