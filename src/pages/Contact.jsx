import React from 'react'
import Hader from '../Component/Hader'
import WhatsAppIcon from '../Component/Whatsapp'
import Comms from '../Component/Comms'

function Contact() {
  return (
    <div>
        <Hader/>
        <div className='pt-10'>
        <Comms/>
        </div>
        <WhatsAppIcon/>
    </div>
  )
}

export default Contact