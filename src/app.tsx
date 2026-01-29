import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { AnimationRoutes, App, SnackbarProvider, ZMPRouter } from 'zmp-ui'

import { RootProvider } from './components'
import MerchantInfoPage from './pages/info'
import MerchantRootPage from './pages/menu'
import MerchantOrdersPage from './pages/orders'
import MerchantOrdersViewPage from './pages/orders.view'

// HNAAu pages (exported via barrel to avoid import-extension issues)
import { HnauHome, HnauCourses, HnauNotifications, HnauBranches, HnauAccount, HnauCourseDetail, HnauRegister, HnauSessions, HnauNewsDetail, HnauSearch } from './pages/hnau-pages'
import HnauAdmissions from './pages/admissions.hnau'
import HnauSchedule from './pages/schedule.hnau'
import HnauVouchers from './pages/vouchers.hnau'
import HnauMyCourses from './pages/my-courses.hnau'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
})

const MyApp = () => {
  return (
    <App>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <RootProvider>
              <ZMPRouter>
                <AnimationRoutes>
                  {/* HNAAu app routes only */}
                  <Route path="/" element={<HnauHome />} />
                  {/* HNAAu routes (mock-driven UI) */}
                  <Route path="/hnau" element={<HnauHome />} />
                  <Route path="/hnau/courses" element={<HnauCourses />} />
                  <Route path="/hnau/notifications" element={<HnauNotifications />} />
                  <Route path="/hnau/branches" element={<HnauBranches />} />
                  <Route path="/hnau/sessions" element={<HnauSessions />} />
                  <Route path="/hnau/course/:id" element={<HnauCourseDetail />} />
                  <Route path="/hnau/news/:id" element={<HnauNewsDetail />} />
                  <Route path="/hnau/news" element={<HnauNotifications />} />
                  <Route path="/hnau/admissions" element={<HnauAdmissions />} />
                  <Route path="/hnau/schedule" element={<HnauSchedule />} />
                  <Route path="/hnau/vouchers" element={<HnauVouchers />} />
                  <Route path="/hnau/my-courses" element={<HnauMyCourses />} />
                  <Route path="/hnau/search" element={<HnauSearch />} />
                  <Route path="/hnau/register" element={<HnauRegister />} />
                  <Route path="/hnau/account" element={<HnauAccount />} />
                </AnimationRoutes>
              </ZMPRouter>
            </RootProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </Suspense>
    </App>
  )
}
export default MyApp
