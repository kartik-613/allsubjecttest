import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import miracleFullLogo from "../assets/miracleFullLogo.png";

const EntryPage = () => {
  const navigate = useNavigate();
  const [entryData, setEntryData] = useState({
    name: "",
    email: "",
    mobile: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const startTimer = () => {
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const sendOtp = () => {
    if (!entryData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      alert("Please enter a valid email address.");
      return;
    }

    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    startTimer();
    alert(`OTP sent to ${entryData.email}: ${fakeOtp}`);
  };

  const verifyOtp = () => {
    if (entryData.otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified!");
      setTimeout(() => {
        navigate("/form");
      }, 500); // short delay to show success message
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 bg-blue-400 w-full" />

      <div className="flex justify-center p-4 sm:p-10">
        <div className="w-full max-w-md border border-gray-300 rounded-xl p-5 bg-white shadow">
          <img
            src={miracleFullLogo}
            alt="img"
            className="w-28 sm:w-32 h-auto mx-auto mb-5"
          />

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              value={entryData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-gray-300 p-2 rounded outline-none text-sm"
              required
            />

            <input
              type="email"
              name="email"
              value={entryData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 p-2 rounded outline-none text-sm"
              required
            />

            <input
              type="tel"
              name="mobile"
              value={entryData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="border border-gray-300 p-2 rounded outline-none text-sm"
              required
            />

            <Button
              type="button"
              onClick={sendOtp}
              disabled={timer > 0}
              className={`${
                timer > 0 ? "bg-blue-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"
              } text-white px-4 py-2 rounded text-sm`}
            >
              {otpSent ? (timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP") : "Send OTP"}
            </Button>

            {otpSent && (
              <>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="otp"
                    value={entryData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="flex-1 border border-gray-300 p-2 rounded outline-none text-sm"
                    required
                  />
                  <Button
                    type="button"
                    onClick={verifyOtp}
                    className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm"
                  >
                    Verify
                  </Button>
                </div>
                {otpVerified && (
                  <p className="text-green-600 text-sm">✅ OTP Verified! Redirecting...</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
