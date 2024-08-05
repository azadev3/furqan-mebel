import React from 'react'
import CardRepition from '../components/deliverypageuitils/CardRepition'
import Success from '../components/paymentsuccesspageuitils/Success'
import PaymentReceipt from '../components/paymentsuccesspageuitils/PaymentReceipt'

const PaymentSuccessPage:React.FC = () => {
  return (
    <div className='payment-success-page-wrapper'>
     <div className="payment-success-page">
          <CardRepition />
          <Success />
          <PaymentReceipt />
     </div>
     </div>
  )
}

export default PaymentSuccessPage