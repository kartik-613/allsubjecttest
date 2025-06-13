import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendOtp = () => {
    if (!entryData.mobile.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    alert(`OTP sent to ${entryData.mobile}: ${fakeOtp}`);
  };

  const verifyOtp = () => {
    if (entryData.otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleNext = () => {
    if (!otpVerified) {
      alert("Please verify OTP before proceeding.");
      return;
    }
    navigate("/form");
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

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                name="mobile"
                value={entryData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="flex-1 border border-gray-300 p-2 rounded outline-none text-sm"
                required
              />
              <Button
                type="button"
                onClick={sendOtp}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm"
              >
                Send OTP
              </Button>
            </div>

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
                  <p className="text-green-600 text-sm">✅ OTP Verified!</p>
                )}
              </>
            )}

            <Button
              onClick={handleNext}
              className="bg-blue-400 hover:bg-blue-500 text-white w-full py-2 mt-1 rounded text-sm"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
