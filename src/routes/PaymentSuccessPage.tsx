import React from 'react'
import Success from '../components/paymentsuccesspageuitils/Success'
import PaymentReceipt from '../components/paymentsuccesspageuitils/PaymentReceipt'

const PaymentSuccessPage:React.FC = () => {
  return (
    <div className='payment-success-page-wrapper'>
     <div className="payment-success-page">
          <Success />
          <PaymentReceipt />
     </div>
     </div>
  )
}

export default PaymentSuccessPage