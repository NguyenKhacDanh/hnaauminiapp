import React, { useState, useEffect } from 'react'
import { Page, useNavigate, Icon, Modal, Box, Button } from 'zmp-ui'
import { useParams } from 'react-router-dom'
import { PageContainer } from '@/components'
import { HnauTabs } from '@/components/hnau-tabs'
import { openChat } from 'zmp-sdk/apis'

interface CourseDetail {
  Id: number
  HocVien?: string
  ChuongTrinh?: string
  HinhThucDaoTao?: string
  CapDo?: string
  ChiNhanh?: string
  Khoa?: string
  StartDate?: string
  TuitionFee?: number
  StatusClass?: string
  Note?: string | null
  ThoiKhoaBieu?: string
  TenPhongBan?: string
  GhiChu?: string
  ClassId?: number
  [key: string]: any
}

// Ảnh demo cho các khóa học
const courseImages: { [key: string]: string } = {
  'guitar': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800',
  'piano': 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800',
  'violin': 'https://images.unsplash.com/photo-1612225330812-01a9c6b0a8bf?w=800',
  'web': 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
  'ui/ux': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  'thiết kế': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
  'cntt': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
  'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'default': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800'
}

function getCourseImage(course: CourseDetail): string {
  const title = (course.ChuongTrinh || '').toLowerCase()
  for (const [key, url] of Object.entries(courseImages)) {
    if (title.includes(key)) return url
  }
  return courseImages.default
}

export default function HnauCourseDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [course, setCourse] = useState<CourseDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [checkingPayment, setCheckingPayment] = useState(false)

  const handleContact = () => {
    openChat({
      type: 'oa',
      id: '3202842660808701267',
      message: `Tôi muốn tư vấn về khóa học: ${course?.ChuongTrinh || 'Khóa học'}`,
      success: () => {
        console.log('Opened chat successfully')
      },
      fail: (error) => {
        console.error('Failed to open chat:', error)
      }
    })
  }

  const handlePayment = () => {
    setShowPaymentModal(true)
    setPaymentStatus('pending')
  }

  const checkPaymentStatus = async () => {
    setCheckingPayment(true)
    
    // Demo: Giả lập kiểm tra thanh toán sau 2 giây
    setTimeout(() => {
      // Giả lập API check thanh toán thành công
      const isSuccess = Math.random() > 0.3 // 70% thành công
      
      if (isSuccess) {
        setPaymentStatus('success')
        // Có thể gọi API backend để lưu thông tin đăng ký
        console.log('Payment successful for course:', course?.ChuongTrinh)
      } else {
        setPaymentStatus('failed')
      }
      
      setCheckingPayment(false)
    }, 2000)
  }

  const generateQRCode = () => {
    if (!course) return ''
    
    const amount = course.TuitionFee || 1000000
    const courseCode = course.ClassId || course.Id
    const courseName = (course.ChuongTrinh || 'KHOA_HOC')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu
      .replace(/đ/g, 'd').replace(/Đ/g, 'D')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 20)
    
    const addInfo = `${courseName}_${courseCode}`
    
    return `https://img.vietqr.io/image/VPB-166436761-compact.png?amount=${amount}&addInfo=${addInfo}`
  }

  useEffect(() => {
    if (!id) return
    
    // Fetch course detail from API
    const now = new Date()
    const nextYear = new Date(now.getFullYear() + 1, 11, 31)
    
    fetch('https://crmportalreport.hocvienaau.edu.vn/api/report/admissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        DateFrom: now.toISOString().split('T')[0],
        DateTo: nextYear.toISOString().split('T')[0],
        SearchAcademy: ''
      })
    })
      .then(res => res.json())
      .then(response => {
        if (response.success && response.data) {
          // Find the course by ClassId
          const foundCourse = response.data.find((c: CourseDetail) => 
            String(c.ClassId) === String(id) || String(c.Id) === String(id)
          )
          setCourse(foundCourse || null)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch course:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <Page className="bg-[#F0F2F5]">
        <PageContainer>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2">
              <Icon icon="zi-clock-1" size={48} />
            </div>
            <p className="text-gray-500">Đang tải...</p>
          </div>
        </PageContainer>
        <HnauTabs activeTab="courses" />
      </Page>
    )
  }

  if (!course) {
    return (
      <Page className="bg-[#F0F2F5]">
        <PageContainer>
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2">
              <Icon icon="zi-close-circle" size={48} />
            </div>
            <p className="text-gray-500 mb-4">Không tìm thấy khóa học</p>
            <button 
              onClick={() => navigate('/hnau/courses')}
              className="bg-[#005EB8] text-white px-6 py-2 rounded-lg font-semibold"
            >
              Quay lại
            </button>
          </div>
        </PageContainer>
        <HnauTabs activeTab="courses" />
      </Page>
    )
  }

  return (
    <Page restoreScroll className="bg-[#F0F2F5] overflow-x-hidden">
      <PageContainer>
        {/* ===== HEADER ===== */}
        <div className="bg-[#005EB8] px-4 pt-4 pb-3 -mx-4 -mt-4 mb-3 relative">
          <button 
            onClick={() => navigate('/hnau/courses')}
            className="absolute left-4 top-4 bg-white/20 hover:bg-white/30 text-white active:opacity-70 transition flex items-center justify-center w-8 h-8 rounded-lg"
          >
            <Icon icon="zi-arrow-left" size={24} />
          </button>
          <h2 className="text-base font-semibold text-white text-center">Chi tiết khóa học</h2>
        </div>

        <div className="px-3 pb-20">{/* Giảm padding từ pb-24 xuống pb-20 */}
          {/* ===== COURSE IMAGE ===== */}
          <div className="relative w-full h-52 mb-4 rounded-xl overflow-hidden shadow-lg">
            <img 
              src={getCourseImage(course)} 
              alt={course.ChuongTrinh || 'Khóa học'} 
              className="w-full h-full object-cover" 
            />
            {course.TuitionFee && course.TuitionFee > 5000000 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                HOT
              </div>
            )}
          </div>

          {/* ===== COURSE TITLE ===== */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
              {course.ChuongTrinh || 'Khóa học'}
            </h1>
            
            <div className="flex items-center gap-2 flex-wrap">
              {course.HocVien && (
                <span className="bg-blue-50 text-[#005EB8] px-3 py-1 rounded-full text-xs font-semibold">
                  <Icon icon="zi-home" size={12} className="inline mr-1" />
                  {course.HocVien}
                </span>
              )}
              {course.StatusClass && (
                <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                  <Icon icon="zi-check-circle" size={12} className="inline mr-1" />
                  {course.StatusClass}
                </span>
              )}
            </div>
          </div>

          {/* ===== COURSE DETAILS ===== */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-3">
            <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <Icon icon="zi-info-circle" size={20} className="mr-2 text-[#005EB8]" />
              Thông tin chi tiết
            </h3>
            
            <div className="space-y-3">
              {course.CapDo && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-star" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Cấp độ</div>
                    <div className="text-sm font-semibold text-gray-900">{course.CapDo}</div>
                  </div>
                </div>
              )}
              
              {course.Khoa && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-list-1" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Khoa / Chuyên ngành</div>
                    <div className="text-sm font-semibold text-gray-900">{course.Khoa}</div>
                  </div>
                </div>
              )}
              
              {course.HinhThucDaoTao && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-note" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Hình thức đào tạo</div>
                    <div className="text-sm font-semibold text-gray-900">{course.HinhThucDaoTao}</div>
                  </div>
                </div>
              )}
              
              {course.ChiNhanh && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-location" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Chi nhánh</div>
                    <div className="text-sm font-semibold text-gray-900">{course.ChiNhanh}</div>
                  </div>
                </div>
              )}
              
              {course.StartDate && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-calendar" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Ngày khai giảng</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {new Date(course.StartDate).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {course.ThoiKhoaBieu && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-clock-2" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Thời khóa biểu</div>
                    <div className="text-sm font-semibold text-gray-900">{course.ThoiKhoaBieu}</div>
                  </div>
                </div>
              )}
              
              {course.TenPhongBan && (
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-user-circle" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Phòng ban phụ trách</div>
                    <div className="text-sm font-semibold text-gray-900">{course.TenPhongBan}</div>
                  </div>
                </div>
              )}
              
              {course.TuitionFee && (
                <div className="flex items-start gap-3">
                  <div className="text-gray-400 mt-0.5">
                    <Icon icon="zi-check-circle" size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-0.5">Học phí</div>
                    <div className="text-lg font-bold text-[#005EB8]">
                      {course.TuitionFee.toLocaleString('vi-VN')} VNĐ
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ===== NOTES ===== */}
          {(course.Note || course.GhiChu) && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3">
              <h3 className="text-sm font-bold text-amber-900 mb-2 flex items-center">
                <Icon icon="zi-warning" size={16} className="mr-2" />
                Ghi chú
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                {course.Note || course.GhiChu}
              </p>
            </div>
          )}

          {/* ===== ACTION BUTTONS ===== */}
          <div className="mb-3">
            <div className="flex gap-3">
              {/* Liên hệ tư vấn - Filled */}
              <button 
                onClick={handleContact} 
                className="flex-1 bg-[#005EB8] text-white py-3.5 rounded-lg font-semibold text-sm shadow-md active:opacity-80 transition flex items-center justify-center gap-2"
              >
                <Icon icon="zi-chat" size={18} />
                Liên hệ tư vấn
              </button>
              
              {/* Thanh toán Online - Outline */}
              <button 
                onClick={handlePayment} 
                className="flex-1 bg-white border-2 border-[#005EB8] text-[#005EB8] py-3.5 rounded-lg font-semibold text-sm active:opacity-80 transition flex items-center justify-center gap-2"
              >
                <Icon icon="zi-check-circle" size={18} />
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
      <HnauTabs activeTab="courses" />

      {/* ===== PAYMENT MODAL ===== */}
      <Modal
        visible={showPaymentModal}
        title="Thanh toán khóa học"
        onClose={() => {
          setShowPaymentModal(false)
          setPaymentStatus('pending')
        }}
        verticalActions
      >
        <Box className="text-center p-4">
          {paymentStatus === 'pending' && (
            <>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {course?.ChuongTrinh}
              </h3>
              <div className="text-2xl font-bold text-[#005EB8] mb-4">
                {course?.TuitionFee?.toLocaleString('vi-VN')} VNĐ
              </div>
              
              {/* QR Code */}
              <div className="bg-white rounded-xl p-4 mb-4 shadow-sm border-2 border-gray-100">
                <img 
                  src={generateQRCode()} 
                  alt="QR Code thanh toán" 
                  className="w-full max-w-[280px] mx-auto"
                />
              </div>

              <div className="bg-blue-50 rounded-lg p-3 mb-4 text-left">
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Hướng dẫn:</strong>
                </p>
                <ol className="text-xs text-gray-700 space-y-1 ml-4 list-decimal">
                  <li>Mở app Ngân hàng của bạn</li>
                  <li>Quét mã QR phía trên</li>
                  <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                  <li>Nhấn "Kiểm tra thanh toán" bên dưới</li>
                </ol>
              </div>

              <Button
                fullWidth
                variant="primary"
                onClick={checkPaymentStatus}
                loading={checkingPayment}
                disabled={checkingPayment}
              >
                {checkingPayment ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán'}
              </Button>
            </>
          )}

          {paymentStatus === 'success' && (
            <div className="py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="zi-check-circle" size={48} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Thanh toán thành công!
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Bạn đã đăng ký khóa học thành công. Chúng tôi sẽ liên hệ với bạn sớm nhất.
              </p>
              <Button
                fullWidth
                variant="primary"
                onClick={() => {
                  setShowPaymentModal(false)
                  navigate('/hnau/courses')
                }}
              >
                Về trang khóa học
              </Button>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="py-4">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="zi-close-circle" size={48} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Chưa nhận được thanh toán
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Vui lòng kiểm tra lại hoặc thử quét mã QR một lần nữa.
              </p>
              <div className="flex gap-2">
                <Button
                  fullWidth
                  variant="secondary"
                  onClick={() => setPaymentStatus('pending')}
                >
                  Thử lại
                </Button>
                <Button
                  fullWidth
                  variant="primary"
                  onClick={handleContact}
                >
                  Liên hệ hỗ trợ
                </Button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </Page>
  )
}
