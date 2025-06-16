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

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(60);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntryData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required.";
    }

    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = "Please enter a valid email address.";
    }

    if (name === "mobile" && value && !/^[6-9]\d{0,9}$/.test(value)) {
      error = "Enter a valid Indian mobile number.";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const { name, email, mobile } = entryData;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email address.";
    if (!mobile.match(/^[6-9]\d{9}$/))
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = () => {
    if (!validateInputs()) return;

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
      setTimeout(() => navigate("/form"), 500);
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
            alt="Miracle Logo"
            className="w-28 sm:w-32 h-auto mx-auto mb-5"
          />

          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="name"
                value={entryData.name}
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="name"
                className="border border-gray-300 p-2 rounded outline-none text-sm w-full"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={entryData.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="email"
                className="border border-gray-300 p-2 rounded outline-none text-sm w-full"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="tel"
                name="mobile"
                value={entryData.mobile}
                onChange={(e) => {
                  if (e.target.value.length <= 10) handleChange(e);
                }}
                placeholder="Mobile Number"
                autoComplete="tel"
                className="border border-gray-300 p-2 rounded outline-none text-sm w-full"
              />
              {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
            </div>

            <Button
              type="button"
              onClick={sendOtp}
              disabled={timer > 0}
              className={`${
                timer > 0
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
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
