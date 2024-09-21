import React from 'react';
import { FaRocketchat } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const WhatsAppIcon = () => {
  return (
    <div className="fixed flex items-center bottom-4 right-4">
      <Link
        to="https://wa.me/message/QY3F7BI5YPQON1" // Replace with your WhatsApp number
        className="flex items-center gap-2 p-3 text-white transition duration-300 bg-green-500 rounded-full shadow-lg hover:bg-green-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaRocketchat className="text-3xl" />
        <span className="text-lg font-medium">Chat with a Doctor</span>
      </Link>
    </div>
  );
};

export default WhatsAppIcon;
