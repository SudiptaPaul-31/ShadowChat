import React from "react";

const SendGradient = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="send-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF2BB1" />
        <stop offset="100%" stopColor="#6C45E4" />
      </linearGradient>
    </defs>
    <path
      d="M22 2L11 13"
      stroke="url(#send-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2L15 22L11 13L2 9L22 2Z"
      stroke="url(#send-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SendGradient;
