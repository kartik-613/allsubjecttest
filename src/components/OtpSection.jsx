import React from "react";
import { Button } from "./button";

const OtpSection = ({ otp, onChange, onVerify, otpVerified, disabled }) => (
  <>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        name="otp"
        value={otp}
        onChange={onChange}
        placeholder="Enter OTP"
        className="flex-1 border border-gray-300 p-2 rounded outline-none text-sm"
      />
      <Button
        type="button"
        onClick={onVerify}
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
        } text-white px-4 py-2 rounded text-sm`}
      >
        Verify
      </Button>
    </div>
    {otpVerified && (
      <p className="text-green-600 text-sm">✅ OTP Verified! Redirecting...</p>
    )}
  </>
);

export default OtpSection;
