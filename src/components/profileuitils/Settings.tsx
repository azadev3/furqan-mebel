import React from 'react'
import SettingsTopCard from './SettingsTopCard'
import SettingsDeliveryadress from './SettingsDeliveryadress'
import SettingsChangePassword from './SettingsChangePassword'

const Settings:React.FC = () => {
  return (
    <div className='settings'>
     <SettingsTopCard />
     <SettingsDeliveryadress />
     <SettingsChangePassword />
    </div>
  )
}

export default Settings