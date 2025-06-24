import React from "react";

const ExitWarningModal = ({ visible, message, onContinue, onExit }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Exit Warning</h2>
        <p className="mb-6">
          {message ||
            "You're trying to exit the test. Do you want to continue or exit and submit?"}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Continue Test
          </button>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Exit & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitWarningModal;
