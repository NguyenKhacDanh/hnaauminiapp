import React from 'react'
import { Modal, Box, Button, Icon } from 'zmp-ui'
import { useNavigate } from 'react-router-dom'

interface PaymentModalProps {
  visible: boolean
  onClose: () => void
  courseName: string
  tuitionFee: number
  qrCodeUrl: string
  paymentStatus: 'pending' | 'success' | 'failed'
  checkingPayment: boolean
  onCheckPayment: () => void
  onRetry: () => void
  onContact: () => void
}

export default function PaymentModal({
  visible,
  onClose,
  courseName,
  tuitionFee,
  qrCodeUrl,
  paymentStatus,
  checkingPayment,
  onCheckPayment,
  onRetry,
  onContact
}: PaymentModalProps) {
  const navigate = useNavigate()

  return (
    <Modal
      visible={visible}
      title="Thanh toán khóa học"
      onClose={onClose}
      verticalActions
    >
      <Box className="p-4">
        {/* PENDING STATE */}
        {paymentStatus === 'pending' && (
          <div className="text-center">
            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
              {courseName}
            </h3>
            <div className="text-xl font-bold text-[#005EB8] mb-3">
              {tuitionFee.toLocaleString('vi-VN')} VNĐ
            </div>
            
            {/* QR Code */}
            <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-gray-200">
              <img 
                src={qrCodeUrl} 
                alt="QR thanh toán" 
                className="w-full max-w-[240px] mx-auto"
              />
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-3 mb-3 text-left">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                📱 Hướng dẫn thanh toán:
              </p>
              <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Mở app Ngân hàng</li>
                <li>Quét mã QR</li>
                <li>Kiểm tra và xác nhận</li>
                <li>Nhấn "Kiểm tra" bên dưới</li>
              </ol>
            </div>

            <Button
              fullWidth
              variant="primary"
              onClick={onCheckPayment}
              loading={checkingPayment}
              disabled={checkingPayment}
            >
              {checkingPayment ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán'}
            </Button>
          </div>
        )}

        {/* SUCCESS STATE */}
        {paymentStatus === 'success' && (
          <div className="text-center py-3">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="zi-check-circle" size={40} className="text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Thanh toán thành công!
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ sớm nhất.
            </p>
            <Button
              fullWidth
              variant="primary"
              onClick={() => {
                onClose()
                navigate('/hnau/courses')
              }}
            >
              Về trang khóa học
            </Button>
          </div>
        )}

        {/* FAILED STATE */}
        {paymentStatus === 'failed' && (
          <div className="text-center py-3">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon icon="zi-close-circle" size={40} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Chưa nhận được thanh toán
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Vui lòng kiểm tra lại hoặc liên hệ hỗ trợ.
            </p>
            <div className="flex gap-2">
              <Button
                fullWidth
                variant="secondary"
                onClick={onRetry}
              >
                Thử lại
              </Button>
              <Button
                fullWidth
                variant="primary"
                onClick={() => {
                  onClose()
                  onContact()
                }}
              >
                Liên hệ
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}
