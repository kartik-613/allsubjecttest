import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import InputField from "../components/InputField";
import OtpSection from "../components/OtpSection";
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

  const startTimer = () => setTimer(60);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  useEffect(() => {
    if (otpSent && !otpVerified) {
      document.querySelector("input[name='otp']")?.focus();
    }
  }, [otpSent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEntryData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    let error = "";
    if (name === "name" && !value.trim()) error = "Name is required.";
    if (name === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      error = "Please enter a valid email address.";
    if (name === "mobile" && value && !/^[6-9]\d{0,9}$/.test(value))
      error = "Enter a valid Indian mobile number.";

    setErrors((prev) => ({ ...prev, [name]: error }));
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
            <InputField
              type="text"
              name="name"
              value={entryData.name}
              onChange={handleChange}
              placeholder="Full Name"
              error={errors.name}
            />

            <InputField
              type="email"
              name="email"
              value={entryData.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
            />

            <InputField
              type="tel"
              name="mobile"
              value={entryData.mobile}
              onChange={(e) => {
                if (/^\d{0,10}$/.test(e.target.value)) handleChange(e);
              }}
              placeholder="Mobile Number"
              error={errors.mobile}
            />

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
              <OtpSection
                otp={entryData.otp}
                onChange={handleChange}
                onVerify={verifyOtp}
                otpVerified={otpVerified}
                disabled={!entryData.otp}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
